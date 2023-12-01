import { EmailListSchema } from '@/widgets/EmailList/model/types/EmailListSchema';

export const getEmailListState = (state: EmailListSchema) => state?.emails;
