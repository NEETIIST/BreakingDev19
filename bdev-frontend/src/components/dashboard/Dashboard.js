import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import { NavLink } from "react-router-dom";
import ReactGA from 'react-ga';

import { logoutUser } from "../../actions/authActions";

import './Dashboard.css';

import Profile from './profile/profile';
import Feed from "./feed/feed";
import Team from "./team/team";
import Chats from "./chats/chats";
import Tickets from "./tickets/tickets";
import QRCode from "./qrcode/qrcode";
import Companies from './companies/companies';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        if ( props.content === "default" ?
            this.state = { content: "feed", subcontent:"" } :
            this.state = { content: props.content, subcontent:"" }
        );
        this.props.history.push('/dashboard/'+this.state.content);
        this.navigation = this.navigation.bind(this)
    }

    componentWillMount() {
        switch(this.props.auth.user.role) {
            case "dev":
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
                this.props.history.push('/guestdash/');
                break;
        }

        ReactGA.event({
            category: 'Dashboard',
            action: 'Visited Dashboard'
        });
    }

    navigation = (content, subcontent) => {
        if ( subcontent === undefined ){
            this.setState(state => ({ content: content, subcontent:"" }));
            this.props.history.push('/dashboard/'+content)
        }
        else {
            this.setState(state => ({ content: content, subcontent:subcontent }));
            this.props.history.push('/dashboard/'+content)
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
                            <NavLink activeClassName="dash-opt-active" exact to="/dashboard/feed">
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
                            <NavLink activeClassName="dash-opt-active" to="/dashboard/profile">
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
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("team")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/dashboard/team">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-users fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="dash.opt3"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("chats")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/dashboard/chats">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-comments fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="dash.opt4"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("companies")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/dashboard/companies">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-user-tie fa-lg py-lg-2" />
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="dash.opt5"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("tickets")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/dashboard/tickets">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-ticket-alt fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="dash.opt6"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("qrcode")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/dashboard/qrcode">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-qrcode fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="dash.opt7"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="spacer-8 d-none d-lg-inline" />
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1 " onClick={this.onLogoutClick}>
                            <div
                                className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                    <i className="fas fa-fw fa-sign-out-alt fa-lg py-lg-2" />
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
                            {this.state.content == "team" ? <Team {...this.props} content={this.state.subcontent} navigation={this.navigation}/> : ""}
                            {this.state.content == "chats" ? <Chats {...this.props}/> : ""}
                            {this.state.content == "companies" ? <Companies {...this.props}/> : ""}
                            {this.state.content == "tickets" ? <Tickets {...this.props}/> : ""}
                            {this.state.content == "qrcode" ? <QRCode {...this.props}/> : ""}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default injectIntl(
    connect(mapStateToProps, { logoutUser }, null, { forwardRef: true }
)(Dashboard));
