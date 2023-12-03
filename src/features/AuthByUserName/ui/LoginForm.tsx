import {
    ChangeEvent, memo, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import {
    Row, Form, Button, InputGroup,
} from 'react-bootstrap';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { loginActions } from '../model/slice/loginSlice';
import { loginByUsername } from '../model/services/loginByUsername';
import { getLoginUsername } from '../model/selectors/getLoginUsername';
import { getLoginPassword } from '../model/selectors/getLoginPassword';
import { getLoginError } from '../model/selectors/getLoginError';
import { getLoginLoading } from '../model/selectors/getLoginLoading';

interface LoginFormProps {
    onSuccess?: () => void
}

const LoginForm = memo((props: LoginFormProps) => {
    const {
        onSuccess,
    } = props;

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginLoading);

    const dispatch = useAppDispatch();

    const onUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        dispatch(loginActions.setUsername(value));
    }, [ dispatch ]);

    const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        dispatch(loginActions.setPassword(value));
    }, [ dispatch ]);

    const onLoginClick = useCallback(async () => {
        const res = await dispatch(loginByUsername({ username, password }));
        if (res.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [ onSuccess, dispatch, password, username ]);

    return (
        <Row className="justify-content-center">
            <Form.Text className="fs-4 mb-2"> Authorization form </Form.Text>

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

            <Button
                variant="primary"
                onClick={ onLoginClick }
                disabled={ isLoading }
                type="submit"
            >
                Log in
            </Button>
        </Row>
    );
});

export default LoginForm;
