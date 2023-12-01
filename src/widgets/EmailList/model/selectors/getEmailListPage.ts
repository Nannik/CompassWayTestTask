import { createSelector } from '@reduxjs/toolkit';
import { getEmailListState } from '@/widgets/EmailList/model/selectors/getEmailListState';

export const getEmailListPage = createSelector(
    getEmailListState,
    (emailList) => emailList?.currentPage || 0,
);
