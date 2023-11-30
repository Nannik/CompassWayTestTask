import { RegistrationSchema } from '@/features/Registration';

const validateEmail = (email: string) => String(email)
    .toLowerCase()
    .match(
        // eslint-disable-next-line max-len
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

export const validateRegistrationData = (data: RegistrationSchema) => {
    if (!validateEmail(data.email)) return 'Email is not valid';

    return null;
};
