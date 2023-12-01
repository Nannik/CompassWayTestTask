import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SendEmailFormSchema } from '@/features/SendEmail/model/types/SendEmailFormSchema';
import { sendEmail } from '@/features/SendEmail/model/services/sendEmail';

const initialState: SendEmailFormSchema = {
    recipientEmail: '',
    subject: '',
    message: '',
    error: '',
    isLoading: false,
};

const sendEmailFormSlice = createSlice({
    name: 'sendEmailForm',
    initialState,
    reducers: {
        setRecipient: (state, action: PayloadAction<string>) => {
            state.recipientEmail = action.payload;
        },
        setSubject: (state, action: PayloadAction<string>) => {
            state.subject = action.payload;
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendEmail.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(sendEmail.fulfilled, (state) => {
                state.isLoading = false;
                state.recipientEmail = '';
                state.subject = '';
                state.message = '';
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: sendEmailActions } = sendEmailFormSlice;
export const { reducer: sendEmailReducer } = sendEmailFormSlice;
