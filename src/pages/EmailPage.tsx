import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { Container, Navbar } from 'react-bootstrap';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData, userActions } from '@/entity/User';
import { EmailList } from '@/widgets/EmailList';
import { SendEmailForm } from '@/features/SendEmail';
import { getEmailListPage } from '@/widgets/EmailList/model/selectors/getEmailListPage';
import { fetchEmails } from '@/widgets/EmailList/model/services/fetchEmails';
import { EMAIL_LIST_LIMIT } from '@/widgets/EmailList/model/const/constVariables';

const EmailPage = () => {
    const dispatch = useAppDispatch();

    const [ showSendEmailForm, setShowSendEmailForm ] = useState(false);

    const userData = useSelector(getUserAuthData);
    const page = useSelector(getEmailListPage);

    const onClick = useCallback(() => {
        dispatch(userActions.logout());
    }, [ dispatch ]);

    const handleSendEmailHide = () => setShowSendEmailForm(false);
    const handleSendEmailShow = () => setShowSendEmailForm(true);

    const onEmailSent = useCallback(() => {
        dispatch(fetchEmails({
            limit: EMAIL_LIST_LIMIT,
            offset: page * EMAIL_LIST_LIMIT,
        }));
    }, [ dispatch, page ]);

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Email page</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-start">
                        <Button
                            onClick={ handleSendEmailShow }
                            variant="primary"
                        >
                            Send email
                        </Button>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="me-2">
                            Signed in as: {userData.username} | {userData.email}
                        </Navbar.Text>
                        <Button
                            onClick={ onClick }
                            variant="primary"
                        >
                            Logout
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <EmailList />
            </Container>

            <SendEmailForm
                show={ showSendEmailForm }
                onHide={ handleSendEmailHide }
                onSuccess={ onEmailSent }
            />
        </>
    );
};

export default EmailPage;
