import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData, userActions } from '@/entity/User';
import { EmailList } from '@/widgets/EmailList';

const EmailPage = () => {
    const dispatch = useAppDispatch();

    const userData = useSelector(getUserAuthData);

    const onClick = useCallback(() => {
        dispatch(userActions.logout());
    }, [ dispatch ]);

    return (
        <div>
            <Button
                onClick={ onClick }
            >
                Logout
            </Button>
            <Form.Text>
                Username:
                {userData.username}
            </Form.Text>
            <Form.Text>
                Email: {userData.email}
            </Form.Text>

            <br />

            <EmailList />
        </div>
    );
};

export default EmailPage;
