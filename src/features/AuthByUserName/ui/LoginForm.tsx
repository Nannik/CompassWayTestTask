import {
    ChangeEvent, memo, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { loginActions } from '../model/slice/loginSlice';
import { loginByUsername } from '../model/services/loginByUsername';
import { getLoginUsername } from '../model/selectors/getLoginUsername';
import { getLoginPassword } from '../model/selectors/getLoginPassword';
import { getLoginError } from '../model/selectors/getLoginError';
import { getLoginLoading } from '../model/selectors/getLoginLoading';

interface LoginFormProps {
    className?: string
    onSuccess?: () => void
}

const LoginForm = memo((props: LoginFormProps) => {
    const {
        className,
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
        <div
            data-testid="login-form"
            className={ classNames(className) }
        >
            <Form.Text> Authorization form </Form.Text>

            {error && (
                <Form.Text className={ classNames('text-danger') }>
                    {error}
                </Form.Text>
            )}

            <Form.Control
                type="text"
                onChange={ onUsernameChange }
                placeholder="Username"
            />

            <Form.Control
                type="password"
                onChange={ onPasswordChange }
                placeholder="Password"
            />

            <Button
                variant="primary"
                onClick={ onLoginClick }
                disabled={ isLoading }
                type="submit"
            >
                Log in
            </Button>
        </div>
    );
});

export default LoginForm;
