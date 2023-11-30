import {
    ChangeEvent, memo, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { registrationActions } from '../model/slice/registrationSlice';
import { registration } from '../model/services/registration';
import { getRegistrationUsername } from '../model/selectors/getRegistrationUsername';
import { getRegistrationPassword } from '../model/selectors/getRegistrationPassword';
import { getRegistrationError } from '../model/selectors/getRegistrationError';
import { getRegistrationLoading } from '../model/selectors/getRegistrationLoading';
import { getRegistrationEmail } from '@/features/Registration/model/selectors/getRegistrationEmail';

interface LoginFormProps {
    className?: string
    onSuccess?: () => void
}

const RegistrationForm = memo((props: LoginFormProps) => {
    const {
        className,
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
        <div
            data-testid="login-form"
            className={ classNames(className) }
        >
            <Form.Text> Registration form </Form.Text>

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

            <Form.Control
                type="email"
                onChange={ onEmailChange }
                placeholder="Email"
            />

            <Button
                variant="primary"
                onClick={ onRegistrationClick }
                disabled={ isLoading }
                type="submit"
            >
                Registration
            </Button>
        </div>
    );
});

export default RegistrationForm;
