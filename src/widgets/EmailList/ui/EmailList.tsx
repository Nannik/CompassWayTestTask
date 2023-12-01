import React, { memo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { SendEmailForm } from '@/features/SendEmail';

export const EmailList = memo(() => {
    const dispatch = useAppDispatch();

    return (
        <SendEmailForm />
    );
});
