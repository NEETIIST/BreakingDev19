import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {loginUser, registerUser} from "../../actions/authActions";
import { withRouter } from 'react-router'
import {FormattedMessage, injectIntl} from "react-intl";
import FormValidator from "../../utils/FormValidator";
import Fade from "react-reveal/Fade";

class Register extends Component {
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
            {
                field: 'password_confirmation',
                method: this.passwordMatch,
                validWhen: true,
                message: 'forms.password_confirmation.doesntmatch'
            },
            {
                field: "email",
                method: "isEmpty",
                validWhen: false,
                message: "forms.email.empty"
            },
            {
                field: "role",
                method: "isEmpty",
                validWhen: false,
                message: "forms.role.empty"
            },
            /* Becomes invalid if the field is empty, which may happen
            {
                field: "access_code",
                method: "isAlphanumeric",
                args: ['pt-PT'],
                validWhen: true,
                message: "forms.access_code.invalid"
            },
            */
        ]);

        this.state = {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: "dev",
            access_code: "",
            validation: this.validator.valid(),
            status: "waiting",
            errors: "",
            replies:{}
        };

        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

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
    }

    passwordMatch = (confirmation, state) => (state.password === confirmation)

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const validation = this.validator.validate(this.state);

        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid){
            const newUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
                role: this.state.role,
                access_code: this.state.access_code,
            };
            this.props.registerUser(newUser);
            this.setState({
                status: "pending",
            });
        }
    };

    fieldHasValue = field => {
        return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");
    };

    assignRole = role => { this.setState({ role: role }); };

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
                            {replies.username_inuse}
                            {replies.email_inuse}
                            {replies.code_wrong}
                            {replies.something_wrong}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <div className={validation.role.isInvalid && 'has-error'}>
                            <div className="row justify-content-center align-items-center m-0">
                                <div className="col-1 px-0">
                                    <i className="fas fa-question-circle fa-lg f-primary" title={intl.formatMessage({id: 'role.help'})} />
                                </div>
                                <div className="col-10 p-1 cp" onClick={(role) => this.assignRole("dev")}>
                                    <div className={"btn btn-block btn-dev-alt"+(this.state.role==="dev"?"-active":"")}>
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="role.dev"/></span>
                                    </div>
                                </div>
                                <div className="col-5 offset-lg-1 p-1 cp" onClick={(role) => this.assignRole("volunteer")}>
                                    <div className={"btn btn-block btn-dev-alt"+(this.state.role==="volunteer"?"-active":"")}>
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="role.volunteer"/></span>
                                    </div>
                                </div>
                                <div className="col-5 p-1 cp" onClick={(role) => this.assignRole("guest")}>
                                    <div className={"btn btn-block btn-dev-alt"+(this.state.role==="guest"?"-active":"")}>
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="role.guest"/></span>
                                    </div>
                                </div>
                                <div className="col-5 offset-1 p-1 cp" onClick={(role) => this.assignRole("staff")}>
                                    <div className={"btn btn-block btn-dev-alt"+(this.state.role==="staff"?"-active":"")}>
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="role.staff"/></span>
                                    </div>
                                </div>
                                <div className="col-5 p-1 cp" onClick={(role) => this.assignRole("sponsor")}>
                                    <div className={"btn btn-block btn-dev-alt"+(this.state.role==="sponsor"?"-active":"")}>
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="role.sponsor"/></span>
                                    </div>
                                </div>
                            </div>
                            <span className="help-block fs-xs">
                                <FormattedMessage id={validation.role.message}/>
                            </span>
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
                        <div className={validation.email.isInvalid && 'has-error'}>
                            <input
                                onChange={this.onChange}
                                className={"form-control form-alt-input " + this.fieldHasValue("email")}
                                value={this.state.email}
                                name="email"
                                type="text"
                                placeholder={intl.formatMessage({id: 'forms.email.placeholder'})}
                            />
                            <span className="help-block fs-xs">
                                <FormattedMessage id={validation.email.message}/>
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
                    <div className={"form-group"}>
                        <div className={validation.password_confirmation.isInvalid && 'has-error'}>
                            <input
                                onChange={this.onChange}
                                className={"form-control form-alt-input " + this.fieldHasValue("password_confirmation")}
                                value={this.state.password_confirmation}
                                name="password_confirmation"
                                type="password"
                                placeholder={intl.formatMessage({id: 'forms.password_confirmation.placeholder'})}
                            />
                            <span className="help-block fs-xs">
                                <FormattedMessage id={validation.password_confirmation.message}/>
                            </span>
                        </div>
                    </div>
                    <div className={"form-group "+(this.state.role==="staff"||this.state.role==="sponsor"?"":"d-none")}>
                        {/*<div className={validation.access_code.isInvalid && 'has-error'}>*/}
                        <div>
                            <input
                                onChange={this.onChange}
                                className={"form-control form-alt-input " + this.fieldHasValue("access_code")}
                                value={this.state.access_code}
                                name="access_code"
                                type="password"
                                placeholder={intl.formatMessage({id: 'forms.access_code.placeholder'})}
                            />
                            <span className="help-block fs-xs">
                                {/*
                                <FormattedMessage id={validation.access_code.message}/>
                                */}
                            </span>
                        </div>
                    </div>
                    <input type="submit" value={intl.formatMessage({id: 'forms.signin'})} className="btn btn-dev-alt btn-block fw-7" />
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
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
    { registerUser }
)(withRouter(Register));
 */
export default injectIntl(
    connect(mapStateToProps, { registerUser }, null, { forwardRef: true }
)(Register));
