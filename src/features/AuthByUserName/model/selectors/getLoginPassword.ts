import { createSelector } from '@reduxjs/toolkit';
import { getLoginState } from './getLoginState';

export const getLoginPassword = createSelector(
    getLoginState,
    (loginForm) => loginForm?.password || '',
);
