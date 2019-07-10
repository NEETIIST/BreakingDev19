import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import {FormattedMessage, injectIntl} from "react-intl";
import FormValidator from "../../utils/FormValidator";
import Fade from "react-reveal/Fade";
//import classnames from "classnames";

class Login extends Component {
    constructor() {
        super();

        this.validator = new FormValidator([
            {
                field: "username",
                method: "isEmpty",
                validWhen: false,
                message: "forms.username.empty"
            },
            {
                field: "username",
                method: "isLength",
                args: [{min:5, max: 30}],
                validWhen: true,
                message: "forms.username.wrongsize"
            },
            {
                field: "password",
                method: "isEmpty",
                validWhen: false,
                message: "forms.password.empty"
            },
            {
                field: "password",
                method: "isLength",
                args: [{min:6, max: 128}],
                validWhen: true,
                message: "forms.password.wrongsize"
            },
        ]);

        this.state = {
            username: "",
            password: "",
            validation: this.validator.valid(),
            status: "waiting",
            errors: "",
            replies:{}
        };

        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                replies: nextProps.errors,
                status: "hasReply",
            });
        }
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const validation = this.validator.validate(this.state);

        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid){
            const userData = {
                username: this.state.username,
                password: this.state.password
            };
            this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
            this.setState({
                status: "pending",
            });
        }
    };

    fieldHasValue = field => {
        return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");
    };

    render() {
        const { replies } = this.state;
        const { intl } = this.props;

        let validation =    this.submitted ?        // if the form has been submitted at least once
            this.validator.validate(this.state) :   // then check validity every time we render
            this.state.validation                   // otherwise just use what's in state

        const status = this.state.status;

        return (
            <div>
                <form noValidate onSubmit={this.onSubmit} className={(((status=="waiting")||(status=="hasReply"))?"d-block":"d-none")}>
                    <div className={"form-group "+ (status == "hasReply" ? "d-block" : "d-none") }>
                        <div className="alert alert-danger" role="alert">
                            {replies.username}
                            {replies.usernamenotfound}
                            {replies.passwordincorrect}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <div className={validation.username.isInvalid && 'has-error'}>
                            <input
                                onChange={this.onChange}
                                className={"form-control form-alt-input " + this.fieldHasValue("username")}
                                value={this.state.username}
                                name="username"
                                type="text"
                                placeholder={intl.formatMessage({id: 'forms.username.placeholder'})}
                            />
                            <span className="help-block fs-xs">
                                <FormattedMessage id={validation.username.message}/>
                            </span>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <div className={validation.password.isInvalid && 'has-error'}>
                            <input
                                onChange={this.onChange}
                                className={"form-control form-alt-input " + this.fieldHasValue("password")}
                                value={this.state.password}
                                name="password"
                                type="password"
                                placeholder={intl.formatMessage({id: 'forms.password.placeholder'})}
                            />
                            <span className="help-block fs-xs">
                                <FormattedMessage id={validation.password.message}/>
                            </span>
                        </div>
                    </div>
                    <input type="submit" value={intl.formatMessage({id: 'forms.login'})} className="btn btn-dev-alt btn-block fw-7" />
                </form>
                <div className={(status=="pending"?"d-block":"d-none")}>
                    <Fade>
                        <i className="fas fa-circle-notch fa-spin fa-3x my-3 f-primary"></i>
                        <p className="fs-md fw-4 flh-2 mb-0"><FormattedMessage id="forms.sending"/></p>
                    </Fade>
                </div>
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
/*
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);

*/
export default injectIntl(
    connect(mapStateToProps, { loginUser }, null, { forwardRef: true }
)(Login));
