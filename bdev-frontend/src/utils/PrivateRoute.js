import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../actions/authActions';

const PrivateRoute = ({component: Component, ...rest}) => {

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogged() ?
                <Component {...props} {...rest} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;

/*
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
*/
