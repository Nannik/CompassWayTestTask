import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { getUserAuthData } from '@/entity/User/model/selectors/getUserAuthData';
import { RoutePaths } from '@/app/router/config/routerConfig';

type HandleAuthProps = {
    children: ReactNode
    requireAuth: boolean
}

export const HandleAuth = (props: HandleAuthProps) => {
    const {
        children,
        requireAuth,
    } = props;

    const auth = useSelector(getUserAuthData);
    const location = useLocation();

    if (requireAuth && !auth) {
        return <Navigate to={ RoutePaths.main } state={ { from: location } } replace />;
    }

    if (!requireAuth && auth) {
        return <Navigate to={ RoutePaths.email } state={ { from: location } } replace />;
    }

    return children;
};
