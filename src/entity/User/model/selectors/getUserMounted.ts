import { createSelector } from '@reduxjs/toolkit';
import { getUser } from './getUser';
import { UserSchema } from '@/entity/User';

export const getUserMounted = createSelector(
    getUser,
    (user: UserSchema) => user._mounted,
);
