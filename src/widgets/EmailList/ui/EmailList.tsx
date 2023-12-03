import React, { memo, useCallback } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { SendEmailForm } from '@/features/SendEmail';
import { getEmailListEmails } from '../model/selectors/getEmailListEmails';
import { getEmailListIsLoading } from '../model/selectors/getEmailListIsLoading';
import { getEmailListError } from '../model/selectors/getEmailListError';
import { EmailListPager } from '@/widgets/EmailList/ui/EmailListPager';
import { fetchEmails } from '@/widgets/EmailList/model/services/fetchEmails';
import { EMAIL_LIST_LIMIT } from '@/widgets/EmailList/model/const/constVariables';
import { getEmailListPage } from '@/widgets/EmailList/model/selectors/getEmailListPage';

export const EmailList = memo(() => {
    const dispatch = useAppDispatch();

    const emails = useSelector(getEmailListEmails);
    const isLoading = useSelector(getEmailListIsLoading);
    const error = useSelector(getEmailListError);
    const page = useSelector(getEmailListPage);

    const onEmailSent = useCallback(() => {
        dispatch(fetchEmails({
            limit: EMAIL_LIST_LIMIT,
            offset: page * EMAIL_LIST_LIMIT,
        }));
    }, [ dispatch, page ]);

    const bodyBlock = isLoading ? (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    ) : emails.map((email) => (
        <div key={ email.id }>
            <Form.Text>
                Recipient: {email.recipient}
            </Form.Text>

            <br />

            <Form.Text>
                Subject: {email.subject}
            </Form.Text>

            <br />

            <Form.Text>
                Message:<br />
                {parse(email.message)}
            </Form.Text>

            <hr />
        </div>
    ));

    return (
        <div>
            <SendEmailForm
                onSuccess={ onEmailSent }
            />

            <hr />

            <EmailListPager />

            { error && (
                <Form.Text>
                    {error}
                </Form.Text>
            ) }

            { bodyBlock }
        </div>
    );
});
