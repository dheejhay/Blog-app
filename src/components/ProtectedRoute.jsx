import React from 'react';
import useAuth from '../hooks/useAuth';
import { Outlet, Navigate } from 'react-router';

function ProtectedRoute(props) {
    const {auth} = useAuth()
   
   
    return (
        auth.user ? <Outlet/> : <Navigate to={"/blog/users/login"}/>
    );
}

export default ProtectedRoute;