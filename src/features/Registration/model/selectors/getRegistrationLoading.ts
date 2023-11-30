import { createSelector } from '@reduxjs/toolkit';
import { getRegistrationState } from './getRegistrationState';

export const getRegistrationLoading = createSelector(
    getRegistrationState,
    (registrationForm) => registrationForm?.isLoading || false,
);
