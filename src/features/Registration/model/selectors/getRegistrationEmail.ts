import { createSelector } from '@reduxjs/toolkit';
import { getRegistrationState } from './getRegistrationState';

export const getRegistrationEmail = createSelector(
    getRegistrationState,
    (registrationForm) => registrationForm?.email || '',
);
