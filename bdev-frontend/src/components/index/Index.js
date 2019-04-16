import React, { Component } from "react";
//import {Link, NavLink} from "react-router-dom";
import { Link } from 'react-scroll'
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
//import PropTypes from "prop-types";
//import { connect } from "react-redux";
//import { loginUser } from "../../actions/authActions";

import './index.css';

class Index extends Component {
    constructor() {
        super();
        this.myRef = React.createRef()
        this.state = {

        };
    }

    componentWillReceiveProps(nextProps) {

    }

    scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop)

    // <Link activeClass="active" className="test6" to="anchor" spy={true} smooth={true} duration={500}>Test 6 (anchor)</Link>

    render() {
        return (
            <div>

                <div className="row vh-100 justify-content-center align-items-center m-0 primary">
                    <div className="col-12 col-lg-10 p-0 m-0 text-center">
                        <img src="img/splashAlt.png" class="img-fluid" />
                    </div>
                </div>
                <div className="row vh-100 justify-content-center align-items-center m-0 primary f-white">
                    <div className="col-12 p-0 m-0">
                        <div className="row justify-content-center align-items-center m-0">
                            <div className="col-10 col-lg-6 text-center">
                                <p className="fs-2xl fw-7 flh-1 mb-2 title-highlight py-3 f-primary"><FormattedMessage id="index.sec1.title"/></p>
                            </div>
                        </div>
                        <div className="spacer-4"></div>
                        <div className="row justify-content-center align-items-center m-0">
                            <div className="col-10 col-lg-8 text-justify text-lg-center">
                                <p className="fs-md fw-4 mb-1 flh-3 mb-1"><FormattedMessage id="index.sec1.desc1"/></p>
                                <p className="fs-md fw-4 mb-1 flh-3 mb-2"><FormattedMessage id="index.sec1.desc2"/></p>
                            </div>
                        </div>
                        <div className="spacer-8"></div>
                        <Fade bottom>
                            <div className="row justify-content-center align-items-center m-0">
                                <div className="col-10 col-lg-4 text-center my-2">
                                    <Link to="knowmore" spy={true} smooth={true} duration={1000}>
                                        <button type="button" className="btn btn-block btn-dev py-2 px-3">
                                            <span className="fs-lg fw-7"><FormattedMessage id="index.knowmore"/></span>
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-10 col-lg-4 text-center my-2">
                                    <Link to="/register">
                                        <button type="button" className="btn btn-block btn-dev py-2 px-3">
                                            <span className="fs-lg fw-7"><FormattedMessage id="index.signup"/></span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
                <div className="row vh-100 justify-content-center align-items-center m-0 primary f-white" id="knowmore">
                    <div className="col-10 col-lg-6 p-0 pr-3 m-0">
                        <Fade left>
                            <p className="fs-xl fw-4 mb-1 flh-2 mb-2"><FormattedMessage id="index.sec1.q1"/></p>
                            <p className="fs-md fw-4 mb-1 flh-2"><FormattedMessage id="index.sec1.a1"/></p>
                            <div className="spacer-6"></div>
                            <p className="fs-xl fw-4 mb-1 flh-2 mb-2"><FormattedMessage id="index.sec1.q2"/></p>
                            <p className="fs-md fw-4 mb-1 flh-2"><FormattedMessage id="index.sec1.a2"/></p>
                            <div className="spacer-6"></div>
                            <Link to="allinfo" spy={true} smooth={true} duration={1000}>
                                <p className="fs-xl fw-4 mb-1 flh-2 mb-2 cp">
                                    <FormattedMessage id="index.sec1.q3"/>
                                    <i className="fas fa-angle-double-down ml-3"></i>
                                </p>
                            </Link>
                        </Fade>
                    </div>
                    <div className="col-10 col-lg-4 px-0 py-3 m-0 text-left">
                        <Fade right>
                            <img src="img/img1.png" className="img-fluid"/>
                        </Fade>
                    </div>
                </div>
                <div className="row vh-100 justify-content-center align-items-center m-0 white f-black" id="allinfo">
                    <div className="col-12">
                        <p>Lorem</p>
                    </div>
                </div>
            </div>
        );
    }
}


export default Index;
