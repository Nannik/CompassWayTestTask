import {
    ChangeEvent, memo, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { InputGroup, Row } from 'react-bootstrap';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { registrationActions } from '../model/slice/registrationSlice';
import { registration } from '../model/services/registration';
import { getRegistrationUsername } from '../model/selectors/getRegistrationUsername';
import { getRegistrationPassword } from '../model/selectors/getRegistrationPassword';
import { getRegistrationError } from '../model/selectors/getRegistrationError';
import { getRegistrationLoading } from '../model/selectors/getRegistrationLoading';
import { getRegistrationEmail } from '@/features/Registration/model/selectors/getRegistrationEmail';

interface LoginFormProps {
    onSuccess?: () => void
}

const RegistrationForm = memo((props: LoginFormProps) => {
    const {
        onSuccess,
    } = props;

    const email = useSelector(getRegistrationEmail);
    const username = useSelector(getRegistrationUsername);
    const password = useSelector(getRegistrationPassword);
    const error = useSelector(getRegistrationError);
    const isLoading = useSelector(getRegistrationLoading);

    const dispatch = useAppDispatch();

    const onUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        dispatch(registrationActions.setUsername(value));
    }, [ dispatch ]);

    const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        dispatch(registrationActions.setPassword(value));
    }, [ dispatch ]);

    const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        dispatch(registrationActions.setEmail(value));
    }, [ dispatch ]);

    const onRegistrationClick = useCallback(async () => {
        const res = await dispatch(registration({ username, password, email }));
        if (res.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [ onSuccess, dispatch, password, username, email ]);

    return (
        <Row className="justify-content-center">
            <Form.Text className="fs-4 mb-2"> Registration form </Form.Text>

            {error && (
                <Form.Text className="fs-6 mb-2 text-danger">
                    {error}
                </Form.Text>
            )}

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    type="text"
                    onChange={ onUsernameChange }
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Password</InputGroup.Text>
                <Form.Control
                    type="password"
                    onChange={ onPasswordChange }
                    placeholder="Password"
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Email</InputGroup.Text>
                <Form.Control
                    type="email"
                    onChange={ onEmailChange }
                    placeholder="Email"
                />
            </InputGroup>

            <Button
                variant="primary"
                onClick={ onRegistrationClick }
                disabled={ isLoading }
                type="submit"
            >
                Log in
            </Button>
        </Row>
    );
});

export default RegistrationForm;
