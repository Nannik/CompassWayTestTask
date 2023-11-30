import {
    CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { To } from '@remix-run/router';
import { NavigateOptions } from 'react-router/dist/lib/context';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { userReducer } from '@/entity/User';
import { createReducerManager } from '@/app/providers/StoreProvider/config/reducerManager';
import { $api } from '@/shared/api/api';
import { loginReducer } from '@/features/AuthByUserName/model/slice/loginSlice';
import { registrationReducer } from '@/features/Registration/model/slice/registrationSlice';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        loginForm: loginReducer,
        registrationForm: registrationReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArgument: ThunkExtraArg = {
        api: $api,
        navigate,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument,
            },
        }),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
