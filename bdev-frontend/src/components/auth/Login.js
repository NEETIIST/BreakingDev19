import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
//import classnames from "classnames";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };
    render() {
        const { errors } = this.state;
        return (
            <div>
                <p>
                    <Link to="/register">Create an account</Link>
                </p>
                <p>
                    Login
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        onChange={this.onChange}
                        value={this.state.username}
                        error={errors.username}
                        id="username"
                        type="text"
                    />
                    <span>
                        {errors.username}
                        {errors.usernamenotfound}
                    </span>
                    <br/>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                    />
                    <br/>
                    <button
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
