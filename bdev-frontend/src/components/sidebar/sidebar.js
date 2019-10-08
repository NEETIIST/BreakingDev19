import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage, injectIntl} from 'react-intl';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import './sidebar.css';
import Index from "../index/Index";
import Authentication from "../auth/Authentication";
import PrivateRoute from "../../utils/PrivateRoute";
import RestrictedRoute from "../../utils/RestrictedRoute";
import Dashboard from "../dashboard/Dashboard";
import staffDash from "../staffDash/staffDash";
import volunteerDash from "../volunteerDash/volunteerDash";
import BeSponsor from "../besponsor/besponsor";
import Faqs from "../faqs/faqs";
import Ideas from "../ideas/ideas";
import Staff from "../staffTeam/staffTeam";
import sponsorDash from '../sponsorDash/sponsorDash';
import guestDash from "../guestDash/guestDash";


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    render() {
        const show = this.state.isOpen ? "visible" : "hidden";
        const { user } = this.props.auth;
        let isAuth = (user.username!== undefined) ;

        return(
            <Router>
                <div>
                    <div className="row justify-content-start align-items-center vh-10 fixed-top p-0 m-0">
                        <div className="col-6 col-lg-2 text-left pl-3">
                            <div className="sidebar-button hvr-underline-from-left p-2 cp" onClick={this.toggleSidebar}>
                                {/*
                                <span className="fa-stack fa-lg">
                                    <i className="far fa-square fa-stack-2x f-primary"></i>
                                    <i className="fas fa-bars fa-stack-1x fa-inverse f-white"></i>
                                </span>
                                */}

                                <i className="fas fa-bars fa-lg f-white px-2"></i>
                                <span className="f-white mt-3 fs-lg px-2"><FormattedMessage id="sidebar.open"/></span>
                            </div>
                        </div>
                    </div>
                    <Fade when={this.state.isOpen} duration={400}>
                        <div id={"sidebar"} className={show}>
                            <div className="row justify-content-start align-items-center vh-100 p-0 m-0 f-white">
                                <div className="col-12 col-lg-3 p-0 black" id={"sidebarContent"}>
                                    <div className="row justify-content-start align-items-center vh-10 p-0 m-0">
                                        <div className="col-12 text-left p-2">
                                            <div className="sidebar-button hvr-underline-from-left ml-2 p-2 cp"
                                                 onClick={this.toggleSidebar}>
                                                <i className="fas fa-times fa-lg f-white px-2"></i>
                                                <span className="f-white mt-3 fs-lg px-2"><FormattedMessage id="sidebar.close"/></span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="m-0"/>
                                    <div className="row justify-content-center align-items-center vh-75 p-0 m-0">
                                        <div className="col-12 text-left p-0">
                                            <NavLink activeClassName="sidebar-active" exact to="/">
                                                <div
                                                    className="row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt" onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-home fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.homepage"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink exact activeClassName="sidebar-active" to="/ideias">
                                                <div
                                                    className="row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt" onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="far fa-lightbulb fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.ideas"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink exact activeClassName="sidebar-active" to="/faqs">
                                                <div
                                                    className="row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt" onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="far fa-question-circle fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.faqs"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink exact activeClassName="sidebar-active" to="/staff">
                                                <div
                                                    className="row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt" onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="far fa-id-badge fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.staff"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <hr className="f-white white"/>
                                            <NavLink activeClassName="sidebar-active" to="/login">
                                                <div
                                                    className={"row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt "+(isAuth?"d-none":"d-flex")}
                                                    onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-sign-in-alt fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.login"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink activeClassName="sidebar-active" to="/register">
                                                <div
                                                    className={"row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt "+(isAuth?"d-none":"d-flex")}
                                                    onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-user-plus fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.register"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink activeClassName="sidebar-active" to="/dashboard">
                                                <div
                                                    className={"row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt "+(user.role==="dev"?"d-flex":"d-none")}
                                                    onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-user-cog fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.dashboard"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink activeClassName="sidebar-active" to="/volunteerdash">
                                                <div
                                                    className={"row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt "+(user.role==="volunteer"?"d-flex":"d-none")}
                                                    onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-user-cog fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.dashboard"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink activeClassName="sidebar-active" to="/staffdash">
                                                <div
                                                    className={"row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt "+(user.role==="staff"?"d-flex":"d-none")}
                                                    onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-columns fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.staffdash"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink activeClassName="sidebar-active" to="/sponsordash">
                                                <div
                                                    className={"row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt "+(user.role==="sponsor"?"d-flex":"d-none")}
                                                    onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-user-cog fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.sponsordash"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            {/*
                                            <NavLink exact activeClassName="sidebar-active" to="/ideas">
                                                <div
                                                    className="row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt" onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="far fa-lightbulb fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.opt8"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            */}



                                            {/*
                                            <hr className="f-white white"/>
                                            <NavLink exact activeClassName="sidebar-active" to="/besponsor">
                                                <div
                                                    className="row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt" onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-star fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.opt7"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            */}
                                        </div>
                                    </div>
                                    <hr className="m-0"/>
                                    <div className="row justify-content-center align-items-center vh-15 p-0 m-0">
                                        <div className="col-11 text-center">
                                            <a href="https://www.facebook.com/BreakingDev/" target="_blank">
                                                <i className="fab fa-facebook-square fa-2x px-2 hvr-secondary"></i>
                                            </a>
                                            <a href="https://www.instagram.com/breaking.dev/" target="_blank">
                                                <i className="fab fa-instagram fa-2x px-2 hvr-secondary"></i>
                                            </a>
                                            <a href="https://www.linkedin.com/company/neerci/about" target="_blank">
                                                <i className="fab fa-linkedin fa-2x px-2 hvr-secondary"></i>
                                            </a>
                                            <a href="https://github.com/NEETIIST" target="_blank">
                                                <i className="fab fa-github-square fa-2x px-2 hvr-secondary"></i>
                                            </a>
                                            <a href="https://www.youtube.com/channel/UCdpC_uftQikmRw3-N8fV2lg" target="_blank">
                                                <i className="fab fa-youtube-square fa-2x px-2 hvr-secondary"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-lg-9 p-0" id={"sidebarMask"} onClick={this.toggleSidebar}>
                                    <div className="row justify-content-start align-items-center vh-100 p-0 m-0">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
                <Switch>
                    <Route exact path="/" component={Index} />

                    <Route exact path="/besponsor" component={BeSponsor} />
                    <Route exact path="/faqs" component={Faqs} />
                    <Route exact path="/ideias" component={Ideas} />
                    <Route exact path="/staff" component={Staff} />

                    <RestrictedRoute path="/login" component={Authentication} isLogin={true}/>
                    <RestrictedRoute path="/register" component={Authentication} isLogin={false}/>

                    <PrivateRoute exact path="/dashboard" component={Dashboard} content={"default"}/>
                    <PrivateRoute exact path="/dashboard/feed" component={Dashboard} content={"feed"}/>
                    <PrivateRoute exact path="/dashboard/profile" component={Dashboard} content={"profile"}/>
                    <PrivateRoute path="/dashboard/team" component={Dashboard} content={"team"}/>
                    <PrivateRoute path="/dashboard/chats" component={Dashboard} content={"chats"}/>

                    <PrivateRoute exact path="/volunteerdash" component={volunteerDash} content={"default"}/>
                    <PrivateRoute exact path="/volunteerdash/feed" component={volunteerDash} content={"feed"}/>
                    <PrivateRoute exact path="/volunteerdash/profile" component={volunteerDash} content={"profile"}/>

                    <PrivateRoute exact path="/staffdash" component={staffDash} content={"default"}/>
                    <PrivateRoute exact path="/staffdash/feed" component={staffDash} content={"feed"}/>
                    <PrivateRoute exact path="/staffdash/profile" component={staffDash} content={"profile"}/>
                    <PrivateRoute exact path="/staffdash/devs" component={staffDash} content={"devs"}/>
                    <PrivateRoute exact path="/staffdash/teams" component={staffDash} content={"teams"}/>
                    <PrivateRoute exact path="/staffdash/ideas" component={staffDash} content={"ideas"}/>
                    <PrivateRoute exact path="/staffdash/promocodes" component={staffDash} content={"promocodes"}/>
                    <PrivateRoute exact path="/staffdash/volunteers" component={staffDash} content={"volunteers"}/>
                    <PrivateRoute exact path="/staffdash/companies" component={staffDash} content={"companies"}/>
                    <PrivateRoute exact path="/staffdash/guests" component={staffDash} content={"guests"}/>

                    <PrivateRoute exact path="/sponsordash" component={sponsorDash} content={"default"}/>
                    <PrivateRoute exact path="/sponsordash/feed" component={sponsorDash} content={"feed"}/>
                    <PrivateRoute exact path="/sponsordash/company" component={sponsorDash} content={"company"}/>
                    <PrivateRoute exact path="/sponsordash/devs" component={sponsorDash} content={"devs"}/>
                    <PrivateRoute exact path="/sponsordash/teams" component={sponsorDash} content={"teams"}/>

                    <PrivateRoute exact path="/guestdash" component={guestDash} content={"default"}/>
                    <PrivateRoute exact path="/guestdash/feed" component={guestDash} content={"feed"}/>
                    <PrivateRoute exact path="/guestdash/profile" component={guestDash} content={"profile"}/>

                </Switch>
            </Router>
        );
        /*
        return (
            <div>
                <div className="row justify-content-center align-items-center vh-10 fixed-top">
                    <div className="col-11 text-left">
                        <i className="fas fa-bars fa-2x" onClick={this.toggleSidebar}></i>
                    </div>
                </div>
                <Fade left when={this.state.isOpen} duration={1000}>
                    <div id={"navbar"} className={"row justify-content-start align-items-center vh-100 fixed-top "+show}>
                        <div className="col-6 text-left alternative">
                            <i className="fas fa-times fa-2x" onClick={this.toggleSidebar}></i>
                        </div>
                    </div>
                </Fade>
            </div>
        );
        */
    }
}

staffDash.propTypes = {
    //logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default injectIntl(
    connect(mapStateToProps, {  }, null, { forwardRef: true }
    )(Sidebar));
