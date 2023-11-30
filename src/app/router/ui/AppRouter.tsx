import React, { memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from '@/app/router';
import { AppRouteProps } from '@/app/router/config/routerConfig';
import { HandleAuth } from '@/app/router/ui/HandleAuth';

const AppRouter = () => {
    const renderWithWrapper = useCallback(
        (route: AppRouteProps) => {
            const element = (
                <div className="page-wrapper">
                    { route.element }
                </div>
            );

            return (
                <Route
                    key={ route.path }
                    path={ route.path }
                    element={
                        route.onlyFor
                            ? <HandleAuth requireAuth={ route.onlyFor === 'auth' }>{element}</HandleAuth>
                            : element
                    }
                />
            );
        },
        [],
    );

    return (
        <Routes>
            {Object.values(routerConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
