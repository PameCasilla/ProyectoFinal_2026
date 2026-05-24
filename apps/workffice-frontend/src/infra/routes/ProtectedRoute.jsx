import React from 'react';
import { Route, Redirect } from 'react-router';
import { isSessionValid } from '../../utils';

export const ProtectedRoute = ({
    isAuthenticated = isSessionValid(),
    authenticationPath,
    ...routeProps
}) => {
    
    if (isAuthenticated) {
        return <Route {...routeProps} />;
    } else {
        return <Redirect to={{ pathname: authenticationPath }} />;
    }
};
