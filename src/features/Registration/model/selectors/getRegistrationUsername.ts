import { createSelector } from '@reduxjs/toolkit';
import { getRegistrationState } from './getRegistrationState';

export const getRegistrationUsername = createSelector(
    getRegistrationState,
    (registrationForm) => registrationForm?.username || '',
);
