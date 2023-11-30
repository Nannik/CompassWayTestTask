import { createSelector } from '@reduxjs/toolkit';
import { getRegistrationState } from './getRegistrationState';

export const getRegistrationError = createSelector(
    getRegistrationState,
    (registrationForm) => registrationForm?.error,
);
