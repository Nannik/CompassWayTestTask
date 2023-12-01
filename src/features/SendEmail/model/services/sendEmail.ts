import { createAsyncThunk } from '@reduxjs/toolkit';
import { Email } from 'src/features/SendEmail';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LocalStorageKeys } from '@/shared/const/localStorageKeys';

interface SendEmailProps {
    senderId: number
    recipientEmail: string
    subject: string
    message: string
}

export const sendEmail = createAsyncThunk<Email, SendEmailProps, ThunkConfig<string>>(
    'emailList/send',
    async (data, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const requestData = {
                sender: data.senderId,
                recipient: data.recipientEmail,
                subject: data.subject,
                message: data.message,
            };

            const authHeader = localStorage.getItem(LocalStorageKeys.AUTH_HEADER_VALUE);
            const response = await extra.api.post<Email>('/emails/', requestData, {
                headers: {
                    authorization: authHeader,
                },
            });

            if (!response) {
                throw Error();
            }

            return response.data;
        } catch (e) {
            console.error(e);

            const errorMessages = [];

            if (e?.response?.data?.recipient) errorMessages.push(`Recipient: ${e.response.data.recipient}`);
            if (e?.response?.data?.message) errorMessages.push(`Message: ${e.response.data.message}`);
            if (e?.response?.data?.subject) errorMessages.push(`Subject: ${e.response.data.subject}`);

            return rejectWithValue(
                errorMessages.length
                    ? errorMessages.join(' | ')
                    : e.message,
            );
        }
    },
);
