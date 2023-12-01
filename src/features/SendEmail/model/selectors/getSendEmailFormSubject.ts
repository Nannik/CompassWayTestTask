import { createSelector } from '@reduxjs/toolkit';
import { getSendEmailFormState } from '@/features/SendEmail/model/selectors/getSendEmailFormState';

export const getSendEmailFormSubject = createSelector(
    getSendEmailFormState,
    (sendEmailForm) => sendEmailForm?.subject || null,
);
