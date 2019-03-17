import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { withRouter } from 'react-router'
import classnames from "classnames";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    componentWillReceiveProps(nextProps) {
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
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const { errors } = this.state;
        return (
            <div>
                <p>
                    <Link to="/login">Log in</Link>
                </p>
                <p>
                    Create an Account:
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
                    <span>{errors.username}</span>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                    />
                    <span>{errors.email}</span>
                    <br/>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                    />
                    <span>{errors.password}</span>
                    <br/>
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        id="password2"
                        type="password"
                    />
                    <span>{errors.password2}</span>
                    <br/>
                    <button
                        type="submit"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
