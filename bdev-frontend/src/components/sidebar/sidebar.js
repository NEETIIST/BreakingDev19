import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from 'react-intl';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";

import './sidebar.css';
import Index from "../index/Index";
import Register from "../auth/Register";
import Login from "../auth/Login";
import PrivateRoute from "../private-route/PrivateRoute";
import Dashboard from "../dashboard/Dashboard";
import BeSponsor from "../besponsor/besponsor";
import Faqs from "../faqs/faqs";
import Ideas from "../ideas/ideas";
import Staff from "../staffTeam/staffTeam";

class Sidebar extends Component {
    constructor() {
        super();
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
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.opt1"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            {/*
                                            <NavLink activeClassName="sidebar-active" to="/dashboard">
                                                <div
                                                    className="row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt" onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-clipboard-list fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.opt2"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink exact activeClassName="sidebar-active" to="/register">
                                                <div
                                                    className="row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt" onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-user fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.opt3"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink exact activeClassName="sidebar-active" to="/register">
                                                <div
                                                    className="row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt" onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-users fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.opt4"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            */}
                                            <hr className="f-white white"/>
                                            <NavLink exact activeClassName="sidebar-active" to="/faqs">
                                                <div
                                                    className="row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt" onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="far fa-question-circle fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.opt5"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
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
                                            {/*
                                            <NavLink exact activeClassName="sidebar-active" to="/staff">
                                                <div
                                                    className="row justify-content-center align-items-center vh-7 p-0 m-0 cp sidebar-opt" onClick={this.toggleSidebar}>
                                                    <div className="col-3 text-center">
                                                        <i className="fas fa-beer fa-lg py-2"></i>
                                                    </div>
                                                    <div className="col-9 text-left">
                                                        <span className="fs-md fw-4 flh-2"><FormattedMessage id="sidebar.opt6"/></span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            */}
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
                                        </div>
                                    </div>
                                    <hr className="m-0"/>
                                    <div className="row justify-content-center align-items-center vh-15 p-0 m-0">
                                        <div className="col-11 text-center">
                                            <a href="https://www.facebook.com/BreakingDev/" target="_blank">
                                                <i className="fab fa-facebook-square fa-2x px-2 hvr-secondary"></i>
                                            </a>
                                            <a href="#" target="_blank">
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
                    {/*
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    */}
                    <Route exact path="/besponsor" component={BeSponsor} />
                    <Route exact path="/faqs" component={Faqs} />
                    <Route exact path="/ideas" component={Ideas} />
                    {/*
                    <Route exact path="/staff" component={Staff} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    */}
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

export default Sidebar;
