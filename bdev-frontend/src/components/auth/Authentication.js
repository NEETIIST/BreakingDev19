import React, { Component } from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {Link} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

import './authentication.css';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: props.isLogin,
        };
    }

    showLogin = () => {
        this.setState(state => ({ isLogin: true }));
        this.props.history.push('/login')
    };

    showRegister = () => {
        this.setState(state => ({ isLogin: false }));
        this.props.history.push('/register')
    };


    render() {
        //const { errors } = this.state;
        const isLogin = this.state.isLogin ? "active-form" : "inactive-form";
        const isRegister = this.state.isLogin ? "inactive-form" : "active-form";

        return (
            <div>
                <div className="row justify-content-center align-items-center p-0 m-0 vh-100 primary">
                    <div className="col-10 col-lg-4 p-0 text-center">
                        <div className="row m-0 vh-70 white" id={"auth-form"}>
                            <div className="col-12 p-0">
                                <div className="row align-items-center m-0">
                                    <div className={"col-6 p-0 cp "+isLogin} onClick={this.showLogin}>
                                        <p className="fs-md fw-4 flh-1 my-3"><FormattedMessage id="auth.login"/></p>
                                    </div>
                                    <div className={"col-6 p-0 cp "+isRegister} onClick={this.showRegister}>
                                        <p className="fs-md fw-4 flh-1 my-3"><FormattedMessage id="auth.register"/></p>
                                    </div>
                                </div>
                                <div className="row vh-50 m-0 justify-content-center align-items-start" id={"auth-area"}>
                                    <div className="col-10 p-0">
                                        <div className="spacer-4"></div>
                                        {this.state.isLogin ?
                                            <Login {...this.props}/> :
                                            <Register {...this.props}/>
                                        }
                                        <div className="spacer-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(Authentication);

