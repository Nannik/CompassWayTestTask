import React, {
    ChangeEvent, memo, useCallback, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getSendEmailFormIsLoading } from '../model/selectors/getSendEmailFormIsLoading';
import { getSendEmailFormError } from '../model/selectors/getSendEmailFormError';
import { getUserAuthData } from '@/entity/User';
import { sendEmailActions } from '@/features/SendEmail/model/slice/sendEmailFormSlice';
import { getSendEmailFormRecipient } from '@/features/SendEmail/model/selectors/getSendEmailFormRecipient';
import { getSendEmailFormSubject } from '@/features/SendEmail/model/selectors/getSendEmailFormSubject';
import { getSendEmailFormMessage } from '@/features/SendEmail/model/selectors/getSendEmailFormMessage';
import { sendEmail } from '@/features/SendEmail/model/services/sendEmail';
import { Modal } from '@/shared/ui/Modal/Modal';

interface SendEmailFormProps {
    show: boolean
    onSuccess?: () => void
    onHide: () => void
}

export const SendEmailForm = memo((props: SendEmailFormProps) => {
    const {
        show,
        onHide,
        onSuccess,
    } = props;

    const [ editorState, setEditorState ] = React.useState<EditorState>(
        () => EditorState.createEmpty(),
    );

    const recipientRef = useRef<HTMLInputElement>();
    const subjectRef = useRef<HTMLInputElement>();

    const sender = useSelector(getUserAuthData);
    const recipientEmail = useSelector(getSendEmailFormRecipient);
    const subject = useSelector(getSendEmailFormSubject);
    const message = useSelector(getSendEmailFormMessage);
    const error = useSelector(getSendEmailFormError);
    const isLoading = useSelector(getSendEmailFormIsLoading);

    const dispatch = useAppDispatch();

    const onRecipientChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        dispatch(sendEmailActions.setRecipient(value));
    }, [ dispatch ]);

    const onSubjectChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        dispatch(sendEmailActions.setSubject(value));
    }, [ dispatch ]);

    const onMessageChange = useCallback((newEditorState: EditorState) => {
        setEditorState(newEditorState);

        const content = newEditorState.getCurrentContent();
        const raw = convertToRaw(content);
        const html = draftToHtml(raw);

        dispatch(sendEmailActions.setMessage(html));
    }, [ dispatch, setEditorState ]);

    const onSubmit = useCallback(async () => {
        const res = await dispatch(sendEmail({
            senderId: Number(sender.id),
            recipientEmail,
            subject,
            message,
        }));
        if (res.meta.requestStatus === 'fulfilled') {
            onSuccess?.();

            recipientRef.current.value = '';
            subjectRef.current.value = '';
            setEditorState(EditorState.createEmpty());
        }
    }, [ onSuccess, dispatch, sender, recipientEmail, subject, message ]);

    const modalFooterButton = (
        <Button
            variant="primary"
            onClick={ onSubmit }
            disabled={ isLoading }
            type="submit"
        >
            Send Email
        </Button>
    );

    return (
        <Modal
            onHide={ onHide }
            show={ show }
            footer={ modalFooterButton }
            title="Send email"
        >
            {error && (
                <Form.Text className="text-danger fs-6">
                    {error}
                </Form.Text>
            )}

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Sender</InputGroup.Text>
                <Form.Control
                    type="text"
                    value={ sender.email }
                    disabled
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Recipient</InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Recipient"
                    onChange={ onRecipientChange }
                    ref={ recipientRef }
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Subject</InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Subject"
                    onChange={ onSubjectChange }
                    ref={ subjectRef }
                />
            </InputGroup>

            <Editor
                editorState={ editorState }
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={ onMessageChange }
            />
        </Modal>
    );
});
