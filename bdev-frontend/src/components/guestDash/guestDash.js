import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import { NavLink } from "react-router-dom";
//import ReactGA from 'react-ga';

import { logoutUser } from "../../actions/authActions";

//import './Dashboard.css';

import Feed from "./feed/feed";
import Profile from './profile/profile';
import Companies from './companies/companies';
import Tickets from './tickets/tickets';
import QRCode from "./qrcode/qrcode";

class GuestDash extends Component {

    constructor(props) {
        super(props);
        if ( props.content === "default" ?
            this.state = { content: "feed", subcontent:"" } :
            this.state = { content: props.content, subcontent:"" }
        );
        this.props.history.push('/guestdash/'+this.state.content);
        this.navigation = this.navigation.bind(this)
    }

    componentWillMount() {
        switch(this.props.auth.user.role) {
            case "dev":
                this.props.history.push('/dashboard/');
                break;
            case "staff":
                this.props.history.push('/staffdash/');
                break;
            case "sponsor":
                this.props.history.push('/sponsordash/');
                break;
            case "volunteer":
                this.props.history.push('/volunteerdash/');
                break;
            case "guest":
                break;
        }

    }

    navigation = (content, subcontent) => {
        if ( subcontent === undefined ){
            this.setState(state => ({ content: content, subcontent:"" }));
            this.props.history.push('/guestdash/'+content)
        }
        else {
            this.setState(state => ({ content: content, subcontent:subcontent }));
            this.props.history.push('/guestdash/'+content)
        }

    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push('/login');
    };


    render() {
        const { user } = this.props.auth;
        const content =  this.state.content;

        return (
            <div className="row justify-content-center align-items-start m-0 very-light-grey dash-holder">
                <div className="col-12 col-lg-2 p-0 align-self-center order-2 order-lg-1 dash-nav">
                    <div className="row justify-content-center align-items-start m-0 pt-2 pt-lg-0 very-light-grey">
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("feed")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/guestdash/feed">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-columns fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="dash.opt1"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("profile")}>
                            <NavLink activeClassName="dash-opt-active" to="/guestdash/profile">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="far fa-fw fa-user fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="dash.opt2"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("companies")}>
                            <NavLink activeClassName="dash-opt-active" to="/guestdash/companies">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-user-tie fa-lg py-lg-2"/>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="guestdash.companies"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("tickets")}>
                            <NavLink activeClassName="dash-opt-active" to="/guestdash/tickets">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-ticket-alt fa-lg py-lg-2"/>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="guestdash.tickets"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("qrcode")}>
                            <NavLink activeClassName="dash-opt-active" to="/guestdash/qrcode">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-qrcode fa-lg py-lg-2"/>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="guestdash.qrcode"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="spacer-8 d-none d-lg-inline"></div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1 offset-1 offset-lg-0" onClick={this.onLogoutClick}>
                            <div
                                className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                    <i className="fas fa-fw fa-sign-out-alt fa-lg py-lg-2"></i>
                                </div>
                                <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                    <span className="fs-sm fw-4 flh-2"><FormattedMessage id="dash.logout"/></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-11 col-lg-10 p-0 order-1 order-lg-2">
                    <div className="row justify-content-center align-items-start m-0 pt-2 pt-lg-0 very-light-grey dash-content-holder">
                        <div className="col-12 col-lg-11 p-0">
                            {this.state.content == "feed" ? <Feed {...this.props} navigation={this.navigation}/> : ""}
                            {this.state.content == "profile" ? <Profile {...this.props} content={this.state.subcontent}/> : ""}
                            {this.state.content == "companies" ? <Companies {...this.props} /> : ""}
                            {this.state.content == "tickets" ? <Tickets {...this.props} navigation={this.navigation}/> : ""}
                            {this.state.content == "qrcode" ? <QRCode {...this.props} /> : ""}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

GuestDash.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default injectIntl(
    connect(mapStateToProps, { logoutUser }, null, { forwardRef: true }
    )(GuestDash));
