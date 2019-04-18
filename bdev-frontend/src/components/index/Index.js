import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Link as Scroll} from 'react-scroll'
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
//import PropTypes from "prop-types";
//import { connect } from "react-redux";
//import { loginUser } from "../../actions/authActions";


import './index.css';


class Index extends Component {
    constructor() {
        super();
        this.state = {
            "extraInfo":0,
        };
        this.changeExtraInfo = this.changeExtraInfo.bind(this);
    }

    changeExtraInfo = (number) => {
        this.setState({extraInfo: number})
    }

    componentWillReceiveProps(nextProps) {

    }





    render() {
        console.log(this.state.extraInfo==0);
        return (
            <div>

                <div className="row vh-100 justify-content-center align-items-center m-0" id="splash">
                    <div className="col-12 col-lg-10 p-0 m-0 text-center">
                        <img src="img/splashAlt.png" className="img-fluid" />
                        <Scroll to="knowmore" spy={true} smooth={true} duration={1000}>
                            <i className="fas fa-angle-double-down fa-lg f-white mb-3"></i>
                        </Scroll>
                    </div>
                </div>
                <div className="row vh-100 justify-content-center align-items-center m-0 primary f-white" id="knowmore">
                    <div className="col-12 p-0 m-0">
                        <div className="spacer-6"></div>
                        <div className="row justify-content-center align-items-center m-0">
                            <div className="col-10 col-lg-6 text-center p-0">
                                <p className="fs-2xl fw-7 flh-1 mb-2 title-highlight py-3 f-primary"><FormattedMessage id="index.sec1.title"/></p>
                            </div>
                        </div>
                        <div className="spacer-6"></div>
                        <div className="row justify-content-center align-items-center m-0">
                            <div className="col-11 col-lg-8 text-justify text-lg-center p-0">
                                <p className="fs-md fw-4 mb-1 flh-3 mb-1"><FormattedMessage id="index.sec1.desc1"/></p>
                                <p className="fs-md fw-4 mb-1 flh-3 mb-2"><FormattedMessage id="index.sec1.desc2"/></p>
                            </div>
                        </div>
                        <div className="spacer-6"></div>
                        <Fade bottom>
                            <div className="row justify-content-center align-items-center m-0">
                                <div className="col-11 col-lg-4 text-center my-2 p-0 px-lg-3">
                                    <Scroll to="allinfo" spy={true} smooth={true} duration={1000}>
                                        <button type="button" className="btn btn-block btn-dev py-2 px-3">
                                            <span className="fs-lg fw-7"><FormattedMessage id="index.knowmore"/></span>
                                        </button>
                                    </Scroll>
                                </div>
                                <div className="col-11 col-lg-4 text-center my-2 p-0 px-lg-3">
                                    <Link to="/register">
                                        <button type="button" className="btn btn-block btn-dev py-2 px-3">
                                            <span className="fs-lg fw-7"><FormattedMessage id="index.signup"/></span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </Fade>
                        <div className="spacer-8"></div>
                    </div>
                </div>
                {/* Mobile Display needs to be adjusted */}
                <div className="row vh-100 justify-content-center align-items-center m-0 white f-black" id="allinfo">
                    <div className="col-11 col-lg-10 p-0 m-0 text-left">
                        <p className="fs-xl fw-7 mb-1 flh-2 mb-3 py-2 title-border"><FormattedMessage id="index.sec2.title1"/></p>
                        <p className="fs-md fw-4 mb-1 flh-2 mb-1 "><FormattedMessage id="index.sec2.desc1"/></p>
                        <div className="spacer-4"></div>
                        <div className="row justify-content-center align-items-start m-0">
                            <Fade cascade bottom>
                            <div className="col-12 col-lg-8 m-0 p-0 text-left step-container">
                                <div className="row justify-content-center align-items-center mx-0 my-2 py-2 step">
                                    <div className="col-2 p-0 pr-2 pr-lg-0 text-center">
                                        <i className="fas fa-calendar-check fa-2x fa-fw"></i>
                                    </div>
                                    <div className="col-10 p-0 pr-2 pr-lg-0 text-justify f-black">
                                        <p className="fs-md fw-4 flh-1 mb-1"><FormattedMessage id="index.sec2.step1.q"/></p>
                                        <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="index.sec2.step1.a"/></p>
                                    </div>
                                </div>
                                <div className="row justify-content-center align-items-center mx-0 my-2 py-2 step">
                                    <div className="col-2 p-0 pr-2 pr-lg-0 text-center">
                                        <i className="fas fa-users fa-2x fa-fw"></i>
                                    </div>
                                    <div className="col-10 p-0 pr-2 pr-lg-0 text-justify f-black">
                                        <p className="fs-md fw-4 flh-1 mb-1"><FormattedMessage id="index.sec2.step2.q"/></p>
                                        <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="index.sec2.step2.a"/></p>
                                    </div>
                                </div>
                                <div className="row justify-content-center align-items-center mx-0 my-2 py-2 step">
                                    <div className="col-2 p-0 pr-2 pr-lg-0 text-center">
                                        <i className="fas fa-lightbulb fa-2x fa-fw"></i>
                                    </div>
                                    <div className="col-10 p-0 pr-2 pr-lg-0 text-justify f-black">
                                        <p className="fs-md fw-4 flh-1 mb-1"><FormattedMessage id="index.sec2.step3.q"/></p>
                                        <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="index.sec2.step3.a"/></p>
                                    </div>
                                </div>
                                <div className="row justify-content-center align-items-center mx-0 my-2 py-2 step">
                                    <div className="col-2 p-0 pr-2 pr-lg-0 text-center">
                                        <i className="fas fa-code-branch fa-2x fa-fw"></i>
                                    </div>
                                    <div className="col-10 p-0 pr-2 pr-lg-0 text-justify f-black">
                                        <p className="fs-md fw-4 flh-1 mb-1"><FormattedMessage id="index.sec2.step4.q"/></p>
                                        <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="index.sec2.step4.a"/></p>
                                    </div>
                                </div>
                                {/*
                                <div className="row justify-content-center align-items-center mx-0 my-2 py-2 step">
                                    <div className="col-2 p-0 pr-2 pr-lg-0 text-center">
                                        <i className="fas fa-check fa-2x fa-fw"></i>
                                    </div>
                                    <div className="col-10 p-0 pr-2 pr-lg-0 text-justify f-black">
                                        <p className="fs-md fw-4 flh-1 mb-1"><FormattedMessage id="index.sec2.step5.q"/></p>
                                        <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="index.sec2.step5.a"/></p>
                                    </div>
                                </div>
                                */}
                                <div className="row justify-content-center align-items-center mx-0 my-2 py-2 step">
                                    <div className="col-2 p-0 pr-2 pr-lg-0 text-center">
                                        <i className="fas fa-question fa-2x fa-fw"></i>
                                    </div>
                                    <div className="col-10 p-0 pr-2 pr-lg-0 text-justify f-black">
                                        <Link to="/faqs">
                                        <p className="fs-md fw-4 flh-1 mb-1"><FormattedMessage id="index.sec2.step6.q"/></p>
                                        <p className="fs-sm fw-4 flh-1 mb-0 hvr-primary cp"><FormattedMessage id="index.sec2.step6.a"/></p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            </Fade>
                            <div className="col-12 col-lg-4 px-3 py-3 m-0 text-left d-none d-lg-block">
                                <img src="img/img1.png" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center m-0 primary f-white" id="categories">
                    <div className="col-11 col-lg-10 m-0 p-0 text-center">
                        <div className="spacer-4"></div>
                        <p className="fs-xl fw-7 mb-1 flh-2 mb-3"><FormattedMessage id="index.sec3.title1"/></p>
                        <p className="fs-sm fw-4 mb-1 flh-2 mb-1 text-justify text-lg-center "><FormattedMessage id="index.sec3.desc1"/></p>
                        <div className="spacer-4"></div>
                        <div className="row justify-content-center align-items-start m-0">
                            <div className="col-12 col-lg-6 m-0 p-0">
                                <div className="row justify-content-center align-items-center m-0 my-3 category-left">
                                    <div className="col-8 p-0 p-2 text-right">
                                        <p className="fs-lg fw-7 mb-1 flh-2 mb-1"><FormattedMessage id="index.sec3.web1"/></p>
                                        <p className="fs-sm fw-4 mb-1 flh-2 mb-1"><FormattedMessage id="index.sec3.web2"/></p>
                                    </div>
                                    <div className="col-4 p-0 text-right">
                                        <img src="icons/Web.png" className="img-fluid"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 m-0 p-0">
                                <div className="row justify-content-center align-items-center m-0 my-3 category-right">
                                    <div className="col-4 p-0 text-left">
                                        <img src="icons/Jogos.png" className="img-fluid"/>
                                    </div>
                                    <div className="col-8 p-0 p-2 text-left">
                                        <p className="fs-lg fw-7 mb-1 flh-2 mb-1"><FormattedMessage id="index.sec3.games1"/></p>
                                        <p className="fs-sm fw-4 mb-1 flh-2 mb-1"><FormattedMessage id="index.sec3.games2"/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="spacer-4"></div>
                        <Fade cascade bottom>
                        <div className="row justify-content-center align-items-start m-0">
                                <div className="col-12 text-center p-0">
                                    <p className="fs-sm fw-4 mb-1 flh-2 mb-1 text-justify text-lg-center "><FormattedMessage id="index.sec3.desc2"/></p>
                                </div>
                        </div>
                        <div className="spacer-4"></div>
                        <div className="row justify-content-center align-items-start m-0">
                            <div className="col-4 col-lg-4 m-0 p-0 text-center">
                                <div className="row justify-content-center align-items-center m-0 py-1 challenge">
                                    <div className="col-12 col-lg-4 p-0 text-center text-lg-left">
                                        <img src="icons/A+.png" className="img-fluid px-1 p-lg-0"/>
                                    </div>
                                    <div className="col-12 col-lg-8 p-2 text-center text-lg-left">
                                        <p className="fs-sm fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.aplus1"/></p>
                                        <p className="fs-xs fw-4 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.aplus2"/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 col-lg-4 m-0 p-0 text-center">
                                <div className="row justify-content-center align-items-center m-0 py-1 challenge">
                                    <div className="col-12 col-lg-4 p-0 text-center text-lg-left">
                                        <img src="icons/Innov.png" className="img-fluid px-1 p-lg-0"/>
                                    </div>
                                    <div className="col-12 col-lg-8 p-2 text-center text-lg-left">
                                        <p className="fs-sm fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.innov1"/></p>
                                        <p className="fs-xs fw-4 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.innov2"/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 col-lg-4 m-0 p-0 text-center">
                                <div className="row justify-content-center align-items-center m-0 py-1 challenge">
                                    <div className="col-12 col-lg-4 p-0 text-center text-lg-left">
                                        <img src="icons/Crowd.png" className="img-fluid px-1 p-lg-0"/>
                                    </div>
                                    <div className="col-12 col-lg-8 p-2 text-center text-lg-left">
                                        <p className="fs-sm fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.crowd1"/></p>
                                        <p className="fs-xs fw-4 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.crowd2"/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="spacer-4"></div>
                        <div className="row justify-content-center align-items-start m-0">
                            <Link to="/faqs">
                            <div className="col-12 text-center p-0">
                                <p className="fs-sm fw-4 mb-1 flh-2 mb-1 text-justify text-lg-center ">
                                    <FormattedMessage id="index.sec3.desc3"/>
                                </p>
                            </div>
                            </Link>
                        </div>
                        </Fade>
                        <div className="spacer-4"></div>
                    </div>
                </div>
                <div className="row vh-60 justify-content-center align-items-center m-0 black f-white" id="extrainfo">
                    <div className="col-11 col-lg-10 p-0 m-0 text-right">
                        <div className="spacer-4"></div>
                        <p className="fs-xl fw-7 mb-1 flh-2 mb-3 py-2 title-border-alt"><FormattedMessage id="index.sec4.title1"/></p>
                        <p className="fs-md fw-4 mb-1 flh-2 mb-1 "><FormattedMessage id="index.sec4.desc1"/></p>
                        <div className="spacer-4"></div>
                        <div className="row justify-content-end align-items-start m-0">
                            <div className="col-lg-4 px-3 text-left d-none d-lg-block">
                                <Fade left>
                                    <img src="img/img1.png" className="img-fluid p-3"/>
                                </Fade>
                            </div>
                            <div className="col-12 col-lg-8 p-0">
                                <div className="row justify-content-end align-items-start m-0">
                                    <div className={"col-2 col-lg-2 text-center info-icon mx-1 p-3 cp " +(this.state.extraInfo == 0 ? "active-icon":"")}
                                         onClick={() => this.changeExtraInfo(0)}>
                                        <i className="fas fa-pizza-slice fa-2x"></i>
                                    </div>
                                    <div className={"col-2 col-lg-2 text-center info-icon mx-1 p-3 cp " +(this.state.extraInfo == 1 ? "active-icon":"")}
                                         onClick={() => this.changeExtraInfo(1)}>
                                        <i className="fas fa-glass-cheers fa-2x"></i>
                                    </div>
                                    <div className={"col-2 col-lg-2 text-center info-icon mx-1 p-3 cp " +(this.state.extraInfo == 2 ? "active-icon":"")}
                                         onClick={() => this.changeExtraInfo(2)}>
                                        <i className="fas fa-trophy fa-2x"></i>
                                    </div>
                                    <div className={"col-2 col-lg-2 text-center info-icon ml-1 p-3 cp " +(this.state.extraInfo == 3 ? "active-icon":"")}
                                         onClick={() => this.changeExtraInfo(3)}>
                                        <i className="fas fa-book fa-2x"></i>
                                    </div>
                                </div>
                                <div className="row vh-40 justify-content-end align-items-start m-0 py-2 px-3 info-text">
                                    <div className="col-12 p-3 text-justify">
                                        <p className="fs-md fw-7 mb-2 flh-2"><FormattedMessage id={"index.sec5.title"+this.state.extraInfo}/></p>
                                        <p className="fs-sm fw-4 mb-2 flh-2"><FormattedMessage id={"index.sec5.desc"+this.state.extraInfo}/></p>
                                        <p className="fs-sm fw-4 mb-1 flh-2"><FormattedMessage id={"index.sec5.extra"+this.state.extraInfo}/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="spacer-6"></div>
                    </div>
                </div>
                <div className="row vh-70 justify-content-center align-items-center m-0 primary f-white" id="extrainfo">
                    <div class="col-11 col-lg-5 text-justify text-lg-left">
                        <div className="spacer-4"></div>
                        <p className="fs-xl fw-7 mb-1 flh-2 mb-3"><FormattedMessage id="index.sec6.title1"/></p>
                        <p className="fs-sm fw-4 mb-1 flh-2 mb-2"><FormattedMessage id="index.sec6.desc1"/></p>
                        <p className="fs-sm fw-4 mb-1 flh-2 mb-2"><FormattedMessage id="index.sec6.desc2"/></p>
                    </div>
                    <div className="col-11 col-lg-5">

                    </div>
                </div>
            </div>
        );
    }
}


export default Index;
