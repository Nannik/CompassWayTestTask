import { createSelector } from '@reduxjs/toolkit';
import { getSendEmailFormState } from '@/features/SendEmail/model/selectors/getSendEmailFormState';

export const getSendEmailFormError = createSelector(
    getSendEmailFormState,
    (sendEmailForm) => sendEmailForm?.error || null,
);
