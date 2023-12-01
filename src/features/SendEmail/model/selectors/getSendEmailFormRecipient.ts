import { createSelector } from '@reduxjs/toolkit';
import { getSendEmailFormState } from '@/features/SendEmail/model/selectors/getSendEmailFormState';

export const getSendEmailFormRecipient = createSelector(
    getSendEmailFormState,
    (sendEmailForm) => sendEmailForm?.recipientEmail || null,
);
