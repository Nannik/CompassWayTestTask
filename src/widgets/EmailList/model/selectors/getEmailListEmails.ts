import { createSelector } from '@reduxjs/toolkit';
import { getEmailListState } from '@/widgets/EmailList/model/selectors/getEmailListState';

export const getEmailListEmails = createSelector(
    getEmailListState,
    (emailList) => emailList?.emails || [],
);
