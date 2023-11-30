import { createSelector } from '@reduxjs/toolkit';
import { getRegistrationState } from './getRegistrationState';

export const getRegistrationPassword = createSelector(
    getRegistrationState,
    (registrationForm) => registrationForm?.password || '',
);
