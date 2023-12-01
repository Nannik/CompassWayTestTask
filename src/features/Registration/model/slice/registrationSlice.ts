import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationSchema } from '../types/RegistrationSchema';
import { registration } from '../services/registration';

const initialState: RegistrationSchema = {
    error: '',
    email: '',
    username: '',
    password: '',
    isLoading: false,
};

const registrationSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(registration.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: registrationActions } = registrationSlice;
export const { reducer: registrationReducer } = registrationSlice;
