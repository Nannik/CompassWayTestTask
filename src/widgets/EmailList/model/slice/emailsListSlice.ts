import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmailListSchema } from '../types/EmailListSchema';
import { fetchEmails } from '@/widgets/EmailList/model/services/fetchEmails';

const initialState: EmailListSchema = {
    emails: [],
    error: '',
    isLoading: false,
    count: 0,
    currentPage: 0,
};

const emailsListSlice = createSlice({
    name: 'fetchEmails',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setCount: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmails.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchEmails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.emails = action.payload.emails;
                state.count = action.payload.count;
            })
            .addCase(fetchEmails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: emailsListActions } = emailsListSlice;
export const { reducer: emailsListReducer } = emailsListSlice;
