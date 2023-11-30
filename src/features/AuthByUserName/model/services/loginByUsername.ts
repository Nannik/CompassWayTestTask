import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entity/User';
import { LocalStorageKeys } from '@/shared/const/localStorageKeys';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginByUserNameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUserNameProps, ThunkConfig<string>>(
    'login/loginByUserName',
    async (authData, thunkAPI) => {
        const { dispatch, extra, rejectWithValue } = thunkAPI;

        const authDataBase64 = btoa(`${authData.username}:${authData.password}`);
        const authHeaderValue = `Basic ${authDataBase64}`;
        try {
            const response = await extra.api.get<User>('/users/current/', {
                headers: {
                    Authorization: authHeaderValue,
                },
            });
            if (!response.data) {
                throw Error;
            }

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
