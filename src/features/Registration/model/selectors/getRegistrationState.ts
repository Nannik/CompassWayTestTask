import { StateSchema } from '@/app/providers/StoreProvider';

export const getRegistrationState = (state: StateSchema) => state?.registrationForm;
