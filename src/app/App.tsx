import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMounted, userActions } from '@/entity/User';
import { AppRouter } from '@/app/router';

const App = () => {
    const dispatch = useDispatch();
    const isUserMounted = useSelector(getUserMounted);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [ dispatch ]);

    return (
        <div>
            <Suspense fallback="">
                <div className="app-content">
                    <div className="page-content">
                        {isUserMounted && <AppRouter />}
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default App;
