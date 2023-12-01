import { createAsyncThunk } from '@reduxjs/toolkit';
import { Email } from '@/entity/Email';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LocalStorageKeys } from '@/shared/const/localStorageKeys';

interface FetchEmailsProps {
    offset: number
    limit: number
}

interface FetchEmailsReturn {
    emails: Email[]
    count: number
}

export const fetchEmails = createAsyncThunk<FetchEmailsReturn, FetchEmailsProps, ThunkConfig<string>>(
    'emailList/fetchEmails',
    async (data, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;

        try {
            const authHeader = localStorage.getItem(LocalStorageKeys.AUTH_HEADER_VALUE);
            const response = await extra.api.get('/emails/', {
                headers: {
                    authorization: authHeader,
                },
                params: data,
            });

            if (!response.data || !response.data.results) {
                throw Error();
            }

            return {
                emails: response.data.results,
                count: response.data.count,
            };
        } catch (e) {
            console.error(e);
            return rejectWithValue(e.message);
        }
    },
);
