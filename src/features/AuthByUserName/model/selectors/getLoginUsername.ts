import { createSelector } from '@reduxjs/toolkit';
import { getLoginState } from './getLoginState';

export const getLoginUsername = createSelector(
    getLoginState,
    (loginForm) => loginForm?.username || '',
);
