import { createSelector } from '@reduxjs/toolkit';
import { getSendEmailFormState } from '@/features/SendEmail/model/selectors/getSendEmailFormState';

export const getSendEmailFormIsLoading = createSelector(
    getSendEmailFormState,
    (sendEmailForm) => sendEmailForm?.isLoading || false,
);
