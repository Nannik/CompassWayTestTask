import { RouteProps } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import EmailPage from '@/pages/EmailPage';
import NotFoundPage from '@/pages/NotFoundPage';

export type AppRouteProps = RouteProps & {
    onlyFor?: 'auth' | 'non-auth'
}

export enum AppRoutes {
    MAIN = 'main',
    EMAIL = 'email',

    // last
    NOT_FOUND = 'not_found'
}

export const RoutePaths: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.EMAIL]: '/email',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: AppRouteProps[] = [
    {
        path: RoutePaths.main,
        element: <MainPage />,
        onlyFor: 'non-auth',
    },

    {
        path: RoutePaths.email,
        element: <EmailPage />,
        onlyFor: 'auth',
    },

    // last
    {
        path: RoutePaths.not_found,
        element: <NotFoundPage />,
    },
];
