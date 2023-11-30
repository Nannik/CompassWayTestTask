import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entity/User';
import { LocalStorageKeys } from '@/shared/const/localStorageKeys';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { validateRegistrationData } from '@/features/Registration/model/services/validateRegistrationData';
import { getRegistrationState } from '@/features/Registration/model/selectors/getRegistrationState';

interface RegistrationProps {
    username: string
    password: string
    email: string
}

export const registration = createAsyncThunk<User, RegistrationProps, ThunkConfig<string>>(
    'registration/registration',
    async (authData, thunkAPI) => {
        const {
            dispatch, extra, rejectWithValue, getState,
        } = thunkAPI;

        const registrationData = getRegistrationState(getState());
        const error = validateRegistrationData(registrationData);

        if (error) {
            return rejectWithValue(error);
        }

        try {
            const response = await extra.api.post<User>('/users/', JSON.stringify(authData), {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (!response.data) {
                throw Error;
            }

            const authDataBase64 = btoa(`${authData.username}:${authData.password}`);
            const authHeaderValue = `Basic ${authDataBase64}`;
            localStorage.setItem(LocalStorageKeys.AUTH_HEADER_VALUE, authHeaderValue);
            localStorage.setItem(LocalStorageKeys.AUTH_DATA, JSON.stringify(response.data));

            dispatch(userActions.setAuthData(response.data));

            extra.navigate('/email');

            return response.data;
        } catch (e) {
            console.error(e);
            return rejectWithValue(e?.response?.data?.detail || e.message);
        }
    },
);
