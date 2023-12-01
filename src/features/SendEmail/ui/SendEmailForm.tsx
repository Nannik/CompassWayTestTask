import React, {
    ChangeEvent, memo, useCallback, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getSendEmailFormIsLoading } from '../model/selectors/getSendEmailFormIsLoading';
import { getSendEmailFormError } from '../model/selectors/getSendEmailFormError';
import { getUserAuthData } from '@/entity/User';
import { sendEmailActions } from '@/features/SendEmail/model/slice/sendEmailFormSlice';
import { getSendEmailFormRecipient } from '@/features/SendEmail/model/selectors/getSendEmailFormRecipient';
import { getSendEmailFormSubject } from '@/features/SendEmail/model/selectors/getSendEmailFormSubject';
import { getSendEmailFormMessage } from '@/features/SendEmail/model/selectors/getSendEmailFormMessage';
import { sendEmail } from '@/features/SendEmail/model/services/sendEmail';

interface SendEmailFormProps {
    className?: string
    onSuccess?: () => void
}

export const SendEmailForm = memo((props: SendEmailFormProps) => {
    const {
        className,
        onSuccess,
    } = props;

    const recipientRef = useRef<HTMLInputElement>();
    const subjectRef = useRef<HTMLInputElement>();
    const messageRef = useRef<HTMLInputElement>();

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

    const onMessageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        dispatch(sendEmailActions.setMessage(value));
    }, [ dispatch ]);

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
            messageRef.current.value = '';
        }
    }, [ onSuccess, dispatch, sender, recipientEmail, subject, message ]);

    return (
        <div
            className={ classNames(className) }
        >

            {error && (
                <div>
                    <Form.Text className={ classNames('text-danger') }>
                        {error}
                    </Form.Text>
                </div>
            )}

            <Form.Text>Sender: {sender.email}</Form.Text>

            <Form.Control
                type="text"
                onChange={ onRecipientChange }
                ref={ recipientRef }
                placeholder="Recipient"
            />

            <Form.Control
                type="text"
                onChange={ onSubjectChange }
                ref={ subjectRef }
                placeholder="Subject"
            />

            <Form.Control
                type="text"
                onChange={ onMessageChange }
                ref={ messageRef }
                placeholder="Message"
            />

            <Button
                variant="primary"
                onClick={ onSubmit }
                disabled={ isLoading }
                type="submit"
            >
                Send Email
            </Button>
        </div>
    );
});
