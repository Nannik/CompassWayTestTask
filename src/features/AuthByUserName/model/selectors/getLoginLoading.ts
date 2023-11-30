import { createSelector } from '@reduxjs/toolkit';
import { getLoginState } from './getLoginState';

export const getLoginLoading = createSelector(
    getLoginState,
    (loginForm) => loginForm?.isLoading || false,
);
