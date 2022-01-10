import React from 'react';
import {useAuthenticatedUser} from '../hooks/useAuthenticatedUser';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    let user = useAuthenticatedUser();

    if (!user) return <Navigate to={"/login"} />
    return children;
}
