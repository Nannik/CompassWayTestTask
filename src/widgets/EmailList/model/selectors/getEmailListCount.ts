import { createSelector } from '@reduxjs/toolkit';
import { getEmailListState } from '@/widgets/EmailList/model/selectors/getEmailListState';

export const getEmailListCount = createSelector(
    getEmailListState,
    (emailList) => emailList?.count || 0,
);
