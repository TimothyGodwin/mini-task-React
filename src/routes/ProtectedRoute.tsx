import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
    const isLoggedIn = useSelector((state: any) => state?.id?.token);
    const redirectPath = '/login';

    if (isLoggedIn?.length === 0) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
}
export default ProtectedRoute;
