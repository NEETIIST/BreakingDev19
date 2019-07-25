import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../actions/authActions';

const RestrictedRoute = ({component: Component, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogged() ?
                <Redirect to="/dashboard" />
                : <Component {...props} {...rest} />
        )} />
    );
};

export default RestrictedRoute;
