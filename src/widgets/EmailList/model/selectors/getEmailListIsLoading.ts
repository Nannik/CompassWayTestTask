import { createSelector } from '@reduxjs/toolkit';
import { getEmailListState } from '@/widgets/EmailList/model/selectors/getEmailListState';
import { EmailListSchema } from '@/widgets/EmailList/model/types/EmailListSchema';

export const getEmailListIsLoading = createSelector(
    getEmailListState,
    (emailList: EmailListSchema) => emailList?.isLoading || false,
);
