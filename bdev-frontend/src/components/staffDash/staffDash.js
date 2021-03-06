import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import { NavLink } from "react-router-dom";

import { logoutUser } from "../../actions/authActions";

import Feed from "./feed/feed";
import Ideas from "./ideas/ideas";
import Profile from "./profile/profile";
import Devs from "./devs/devs";
import Teams from "./teams/teams";
import PromoCodes from "./promocodes/promocodes";
import Volunteers from "./volunteers/volunteers";
import Companies from "./companies/companies";
import Guests from "./guests/guests";
import Tickets from './tickets/tickets';

import './staffdash.css';

class staffDash extends Component {

    constructor(props) {
        super(props);
        if ( props.content === "default" ?
            this.state = { content: "feed" } :
            this.state = { content: props.content }
        );
        this.props.history.push('/staffdash/'+this.state.content);
        this.navigation = this.navigation.bind(this)
    }

    componentWillMount() {
        switch(this.props.auth.user.role) {
            case "dev":
                this.props.history.push('/dashboard/');
                break;
            case "staff":
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
    }

    navigation = (content) => {
        this.setState(state => ({ content: content }));
        this.props.history.push('/staffdash/'+content)
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push('/login');
    };

    componentDidMount() {
        setTimeout(function(){
            // This hides the address bar:
            window.scrollTo(0, 1);
        }, 0);
    }


    render() {
        const { user } = this.props.auth;
        const content =  this.state.content;

        return (
            <div className="row justify-content-center align-items-start m-0 very-light-grey dash-holder">
                <div className="col-12 col-lg-2 p-0 align-self-center order-2 order-lg-1 dash-nav">
                    <div className="row justify-content-center align-items-start m-0 pt-2 pt-lg-0 very-light-grey">
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("feed")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/staffDash/feed">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-columns fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="staffdash.opt1"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("profile")}>
                            <NavLink activeClassName="dash-opt-active" to="/staffDash/profile">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="far fa-fw fa-id-card fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="staffdash.opt2"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("devs")}>
                            <NavLink activeClassName="dash-opt-active" to="/staffDash/devs">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-user-friends fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="staffdash.opt3"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("teams")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/staffDash/teams">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-users fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="staffdash.opt4"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1 d-none d-lg-block" onClick={() => this.navigation("ideas")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/staffDash/ideas">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-lightbulb fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="staffdash.opt5"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1 d-none d-lg-block" onClick={() => this.navigation("promocodes")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/staffDash/promocodes">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-percentage fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="staffdash.opt6"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("volunteers")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/staffDash/volunteers">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-people-carry fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="staffdash.opt7"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1 d-none d-lg-block" onClick={() => this.navigation("companies")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/staffDash/companies">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-user-tie fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="staffdash.opt8"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("guests")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/staffDash/guests">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-shuttle-van fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="staffdash.opt9"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1" onClick={() => this.navigation("tickets")}>
                            <NavLink activeClassName="dash-opt-active" exact to="/staffDash/tickets">
                                <div
                                    className="row justify-content-center align-items-center vh-6 p-0 px-lg-1 m-0 cp dash-opt">
                                    <div className="col-12 col-lg-2 offset-lg-1 text-center px-0">
                                        <i className="fas fa-fw fa-ticket-alt fa-lg py-lg-2"></i>
                                    </div>
                                    <div className="col-lg-9 text-lg-left d-none d-lg-flex">
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="staffdash.opt10"/></span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="spacer-8 d-none d-lg-inline"></div>
                        <div className="col col-lg-12 p-0 mb-0 mb-lg-1 offset-lg-0" onClick={this.onLogoutClick}>
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
                        {this.state.content === "feed" ? <Feed {...this.props} navigation={this.navigation}/> : ""}
                        {this.state.content === "profile" ? <Profile {...this.props}/> : ""}
                        {this.state.content === "devs" ? <Devs {...this.props} /> : ""}
                        {this.state.content === "teams" ? <Teams {...this.props} />  : ""}
                        {this.state.content === "ideas" ? <Ideas {...this.props}/> : ""}
                        {this.state.content === "promocodes" ? <PromoCodes {...this.props}/> : ""}
                        {this.state.content === "volunteers" ? <Volunteers {...this.props}/> : ""}
                        {this.state.content === "companies" ? <Companies {...this.props}/> : ""}
                        {this.state.content === "guests" ? <Guests {...this.props}/> : ""}
                        {this.state.content === "tickets" ? <Tickets {...this.props}/> : ""}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

staffDash.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default injectIntl(
    connect(mapStateToProps, { logoutUser }, null, { forwardRef: true }
    )(staffDash));
