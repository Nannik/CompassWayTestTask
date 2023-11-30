import { createSelector } from '@reduxjs/toolkit';
import { getUser } from './getUser';
import { UserSchema } from '@/entity/User';

export const getUserAuthData = createSelector(
    getUser,
    (user: UserSchema) => user.authData,
);
