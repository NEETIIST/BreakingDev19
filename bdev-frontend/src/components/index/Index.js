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
        //console.log(this.state.extraInfo==0);
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
                                {/*
                                <div className="col-11 col-lg-4 text-center my-2 p-0 px-lg-3">
                                    <Scroll to="allinfo" spy={true} smooth={true} duration={1000}>
                                        <button type="button" className="btn btn-block btn-dev py-2 px-3">
                                            <span className="fs-lg fw-7"><FormattedMessage id="index.knowmore"/></span>
                                        </button>
                                    </Scroll>
                                </div>
                                */}
                                <div className="col-11 col-lg-4 text-center my-2 p-0 px-lg-3">
                                    <a href={"https://www.youtube.com/watch?v=uQhjh7OV6jU"} target={"_blank"}>
                                        <button type="button" className="btn btn-block btn-dev py-2 px-3">
                                            <span className="fs-lg fw-7"><FormattedMessage id="index.seevideo"/></span>
                                        </button>
                                    </a>
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
                                <img src="img/Pic2.png" className="img-fluid"/>
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
                                        <p className="fs-xl fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.web1"/></p>
                                        <p className="fs-lg fw-4 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.websponsor"/></p>
                                        <p className="fs-sm fw-4 mb-0 flh-1"><FormattedMessage id="index.sec3.web2"/></p>
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
                                        <p className="fs-xl fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.games1"/></p>
                                        {/*
                                        <p className="fs-lg fw-4 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.gamessponsor"/></p>
                                        */}
                                        <p className="fs-sm fw-4 mb-0 flh-1"><FormattedMessage id="index.sec3.games2"/></p>
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
                            <div className="col-3 col-lg-3 m-0 p-0 text-center">
                                <div className="row justify-content-center align-items-center m-0 py-1 challenge">
                                    <div className="col-12 col-lg-4 p-0 text-center text-lg-left">
                                        <img src="icons/A+.png" className="img-fluid px-1 p-lg-0"/>
                                    </div>
                                    <div className="col-12 col-lg-8 p-2 text-center text-lg-left">
                                        <p className="fs-sm fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.aplus1"/></p>
                                        <p className="fs-xs fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.aplussponsor"/></p>
                                        <p className="fs-xs fw-4 mb-0 flh-1 "><FormattedMessage id="index.sec3.aplus2"/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 col-lg-3 m-0 p-0 text-center">
                                <div className="row justify-content-center align-items-center m-0 py-1 challenge">
                                    <div className="col-12 col-lg-4 p-0 text-center text-lg-left">
                                        <img src="icons/Innov.png" className="img-fluid px-1 p-lg-0"/>
                                    </div>
                                    <div className="col-12 col-lg-8 p-2 text-center text-lg-left">
                                        <p className="fs-sm fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.innov1"/></p>
                                        <p className="fs-xs fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.innovsponsor"/></p>
                                        <p className="fs-xs fw-4 mb-0 flh-1"><FormattedMessage id="index.sec3.innov2"/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 col-lg-3 m-0 p-0 text-center">
                                <div className="row justify-content-center align-items-center m-0 py-1 challenge">
                                    <div className="col-12 col-lg-4 p-0 text-center text-lg-left">
                                        <img src="icons/Picasso.png" className="img-fluid px-1 p-lg-0"/>
                                    </div>
                                    <div className="col-12 col-lg-8 p-2 text-center text-lg-left">
                                        <p className="fs-sm fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.picasso1"/></p>
                                        <p className="fs-xs fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.picassosponsor"/></p>
                                        <p className="fs-xs fw-4 mb-0 flh-1 "><FormattedMessage id="index.sec3.picasso2"/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 col-lg-3 m-0 p-0 text-center">
                                <div className="row justify-content-center align-items-center m-0 py-1 challenge">
                                    <div className="col-12 col-lg-4 p-0 text-center text-lg-left">
                                        <img src="icons/Impact.png" className="img-fluid px-1 p-lg-0"/>
                                    </div>
                                    <div className="col-12 col-lg-8 p-2 text-center text-lg-left">
                                        <p className="fs-sm fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.impact1"/></p>
                                        <p className="fs-xs fw-7 mb-1 flh-1 mb-1"><FormattedMessage id="index.sec3.impactsponsor"/></p>
                                        <p className="fs-xs fw-4 mb-0 flh-1 "><FormattedMessage id="index.sec3.impact2"/></p>
                                    </div>
                                </div>
                            </div>
                            {/*
                            <div className="col-3 col-lg-3 m-0 p-0 text-center">
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
                            */}
                        </div>
                        <div className="spacer-4"></div>
                        <div className="row justify-content-center align-items-start m-0">
                            <Link to="/faqs">
                            <div className="col-12 text-center p-0">
                                <p className="fs-sm fw-4 mb-1 flh-2 mb-1 text-justify text-lg-center clickable">
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
                            <div className="col-lg-4 px-3 text-left d-none d-lg-block p-0">
                                <Fade left>
                                    <img src={"img/Pic"+(this.state.extraInfo+6)+".png"} className="img-fluid"/>
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
                {/*
                <div className="row justify-content-center align-items-center m-0 white f-black" id="awards">
                    <div className={"col-11 col-lg-10 text-center p-0"}>
                        <div className={"spacer-4"} />
                        <p className="fs-xl fw-7 flh-2 mb-2"><FormattedMessage id="index.sec9.title"/></p>
                        <p className="fs-md fw-4 flh-2 mb-2 "><FormattedMessage id="index.sec9.desc"/></p>
                        <div className="row justify-content-end align-items-start m-0">
                            <div className="col-12 col-lg-4 p-0 py-2 hvr-primary">
                                <img src="awards/Web.png" className="img-fluid py-1"/>
                                <p className="fs-sm fw-7 flh-2 mb-1 "><FormattedMessage id="index.sec9.web1"/></p>
                                <p className="fs-xxs fw-4 flh-2 mb-1 "><FormattedMessage id="index.sec9.web2"/></p>
                                <p className="fs-xxs fw-4 flh-2 mb-0 "><FormattedMessage id="index.sec9.web3"/></p>
                            </div>
                            <div className="col-12 col-lg-4 p-0 py-2 hvr-primary">
                                <img src="awards/Event.png" className="img-fluid py-1"/>
                                <p className="fs-sm fw-7 flh-2 mb-1 "><FormattedMessage id="index.sec9.event1"/></p>
                                <p className="fs-xxs fw-4 flh-2 mb-1 "><FormattedMessage id="index.sec9.event2"/></p>
                                <p className="fs-xxs fw-4 flh-2 mb-0 "><FormattedMessage id="index.sec9.event3"/></p>
                            </div>
                            <div className="col-12 col-lg-4 p-0 py-2 hvr-primary">
                                <img src="awards/Games.png" className="img-fluid py-1"/>
                                <p className="fs-sm fw-7 flh-2 mb-1 "><FormattedMessage id="index.sec9.games1"/></p>
                                <p className="fs-xxs fw-4 flh-2 mb-1 "><FormattedMessage id="index.sec9.games2"/></p>
                                <p className="fs-xxs fw-4 flh-2 mb-0 "><FormattedMessage id="index.sec9.games3"/></p>
                            </div>
                        </div>
                        <div className={"spacer-2"} />
                        <div className="row justify-content-end align-items-start m-0 ">
                            <div className="col-6 col-lg p-0 py-2 hvr-primary cp">
                                <Link to="/ideas">
                                    <img src="awards/IdeaBank.png" className="img-fluid py-1"/>
                                    <p className="fs-sm fw-7 flh-2 mb-1 "><FormattedMessage id="index.sec9.ideas1"/></p>
                                    <p className="fs-xxs fw-4 flh-2 mb-1 "><FormattedMessage id="index.sec9.ideas2"/></p>
                                </Link>
                            </div>
                            <div className="col-6 col-lg p-0 py-2 hvr-primary">
                                <img src="awards/A+.png" className="img-fluid py-1"/>
                                <p className="fs-sm fw-7 flh-2 mb-1 "><FormattedMessage id="index.sec9.aplus1"/></p>
                                <p className="fs-xxs fw-4 flh-2 mb-1 "><FormattedMessage id="index.sec9.aplus2"/></p>
                            </div>
                            <div className="col-6 col-lg p-0 py-2 hvr-primary">
                                <img src="awards/Innovation.png" className="img-fluid py-1"/>
                                <p className="fs-sm fw-7 flh-2 mb-1 "><FormattedMessage id="index.sec9.innovation1"/></p>
                                <p className="fs-xxs fw-4 flh-2 mb-1 "><FormattedMessage id="index.sec9.innovation2"/></p>
                            </div>
                            <div className="col-6 col-lg p-0 py-2 hvr-primary">
                                <img src="awards/Picasso.png" className="img-fluid py-1"/>
                                <p className="fs-sm fw-7 flh-2 mb-1 "><FormattedMessage id="index.sec9.picasso1"/></p>
                                <p className="fs-xxs fw-4 flh-2 mb-1 "><FormattedMessage id="index.sec9.picasso2"/></p>
                            </div>

                            <div className="col-6 col-lg p-0 py-2 hvr-primary">
                                <img src="awards/Web.png" className="img-fluid py-1"/>
                                <p className="fs-sm fw-7 flh-2 mb-1 "><FormattedMessage id="index.sec9.impact1"/></p>
                                <p className="fs-xxs fw-4 flh-2 mb-1 "><FormattedMessage id="index.sec9.impact2"/></p>
                            </div>

                        </div>
                        <div className={"spacer-4"} />
                    </div>
                </div>
                */}
                <div className="row vh-70 justify-content-center align-items-center m-0 primary f-white" id="location">
                    <div className="col-11 col-lg-6 text-justify text-lg-left p-0">
                        <div className="spacer-4"></div>
                        <p className="fs-xl fw-7 mb-1 flh-2 mb-3 text-left"><FormattedMessage id="index.sec6.title1"/></p>
                        <p className="fs-sm fw-4 mb-1 flh-2 mb-2"><FormattedMessage id="index.sec6.desc1"/></p>
                        <p className="fs-sm fw-4 mb-1 flh-2 mb-2 clickable">
                            <a href="https://goo.gl/maps/TgLPWxmZmnLAF5Jt8" target="_blank">
                                <FormattedMessage id="index.sec6.desc2"/>
                            </a>
                        </p>
                        <p className="fs-sm fw-4 mb-1 flh-2 mb-2"><FormattedMessage id="index.sec6.desc3"/></p>
                    </div>
                    <div className="col-10 col-lg-4 p-0">
                        <Fade right>
                            <img src="img/Pic4.png" className="img-fluid"/>
                        </Fade>
                    </div>
                </div>
                <div className="row vh-40 justify-content-center align-items-center m-0 black f-white" id="end">
                    <div className="col-11 col-lg-10 text-left p-0">
                        <div className="spacer-4"></div>
                        <div className="row justify-content-start align-items-center m-0">
                            <div className="col-12 col-lg-7 p-0 text-justify">
                                <p className="fs-md fw-7 flh-2 mb-3 text-left"><FormattedMessage id="index.sec7.title"/></p>
                                <p className="fs-sm fw-4 flh-2 mb-3"><FormattedMessage id="index.sec7.desc"/></p>
                                {/*
                                <p className="fs-md fw-7 flh-3 mb-3"><FormattedMessage id="index.sec7.desc"/></p>
                                */}
                            </div>
                            <div className="col-12 col-lg-4 offset-lg-1 p-0 text-center">
                                <Fade cascade right>
                                <div className="row justify-content-center align-items-center m-0">
                                    <div className="col-12 p-0">
                                        <Link to="/register">
                                            <button type="button" className="btn btn-block btn-dev-black py-2 px-3 my-3">
                                                <span className="fs-lg fw-7"><FormattedMessage id="index.signup"/></span>
                                            </button>
                                        </Link>
                                        <div className="spacer-2"></div>
                                        <a href="https://www.facebook.com/BreakingDev/" target="_blank">
                                            <i className="fab fa-facebook-square fa-3x px-2 hvr-secondary"></i>
                                        </a>
                                        <a href="https://www.instagram.com/breaking.dev/" target="_blank">
                                            <i className="fab fa-instagram fa-3x px-2 hvr-secondary"></i>
                                        </a>
                                        <a href="https://www.linkedin.com/company/neerci/about" target="_blank">
                                            <i className="fab fa-linkedin fa-3x px-2 hvr-secondary"></i>
                                        </a>
                                        <a href="https://github.com/NEETIIST" target="_blank">
                                            <i className="fab fa-github-square fa-3x px-2 hvr-secondary"></i>
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCdpC_uftQikmRw3-N8fV2lg" target="_blank">
                                            <i className="fab fa-youtube-square fa-3x px-2 hvr-secondary"></i>
                                        </a>
                                    </div>
                                </div>
                                </Fade>
                            </div>
                        </div>
                        <div className="spacer-4"></div>
                    </div>
                </div>
                <div className="row vh-40 justify-content-center align-items-center m-0 white f-black" id="sponsors">
                    <div className="col-11 col-lg-10 text-left p-0">
                        <div className="spacer-4" />
                        <div className="row justify-content-start align-items-start m-0">
                            <div className="col-12 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-sm fw-4 flh-1 mb-1"><FormattedMessage id="index.sec8.organization"/></p>
                                <a href="http://neeti.tecnico.ulisboa.pt/" target="_blank">
                                    <img src="sponsors/NEETI.png" className="img-fluid cp px-3 p-lg-0"
                                         title="Núcleo de Estudantes de Engenharia de Telecomunicações e Informática do Instituto Superior Técnico"/>
                                </a>
                            </div>
                            <div className="col-12 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-xs fw-4 flh-1 mb-1"><FormattedMessage id="index.sec8.sponsor"/></p>
                                <a href="https://www.farfetch.com/pt/" target="_blank">
                                    <img src="sponsors/Farfetch.png" className="img-fluid cp"
                                         title="Farfetch"/>
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-sm fw-4 flh-1 mb-1 f-white">.</p>
                                <a href="https://www.altran.com/pt/pt-pt/" target="_blank">
                                    <img src="sponsors/Altran.png" className="img-fluid cp"
                                         title="Altran"/>
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-sm fw-4 flh-1 mb-1 f-white">.</p>
                                <a href="https://www2.deloitte.com/pt/pt.html" target="_blank">
                                    <img src="sponsors/Deloitte.png" className="img-fluid cp"
                                         title="Deloitte"/>
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-sm fw-4 flh-1 mb-1 f-white">.</p>
                                <a href="https://www.everis.com/portugal/pt-pt/careers" target="_blank">
                                    <img src="sponsors/Everis.png" className="img-fluid cp"
                                         title="Everis"/>
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-sm fw-4 flh-1 mb-1 f-white">.</p>
                                <a href="https://dellentconsulting.com/" target="_blank">
                                    <img src="sponsors/Dellent.png" className="img-fluid cp"
                                         title="Dellent"/>
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-sm fw-4 flh-1 mb-1 f-white">.</p>
                                <a href="https://www.outsystems.com/" target="_blank">
                                    <img src="sponsors/OutSystems.png" className="img-fluid cp"
                                         title="OutSystems"/>
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-sm fw-4 flh-1 mb-1 f-white">.</p>
                                <a href="http://theros.digital" target="_blank">
                                    <img src="sponsors/Theros.png" className="img-fluid cp"
                                         title="Theros"/>
                                </a>
                            </div>
                        </div>
                        <div className={"spacer-2"} />
                        <div className="row justify-content-start align-items-start m-0">
                            <div className="col-6 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-xs fw-4 flh-1 mb-1"><FormattedMessage id="index.sec8.support"/></p>
                                <a href="https://tecnico.ulisboa.pt/pt/" target="_blank">
                                    <img src="sponsors/IST.png" className="img-fluid cp"
                                         title="Instituto Superior Técnico"/>
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-sm fw-4 flh-1 mb-1 f-white">.</p>
                                <a href="https://www.santandertotta.pt/pt_PT/Particulares/Universitarios.html" target="_blank">
                                    <img src="sponsors/Santander.png" className="img-fluid cp"
                                         title="Banco Santander Totta"/>
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-sm fw-4 flh-2 mb-3 f-white">.</p>
                                <a href="https://aeist.pt/" target="_blank">
                                    <img src="sponsors/AEIST.png" className="img-fluid cp"
                                         title="Associação dos Estudantes do Instituto Superior Técnico"/>
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 text-left p-0 px-lg-3">
                                <p className="fs-sm fw-4 flh-2 mb-3 f-white">.</p>
                                <a href="http://www.cm-oeiras.pt/pt/Paginas/default.aspx" target="_blank">
                                    <img src="sponsors/Oeiras.png" className="img-fluid cp"
                                         title="Camâra Municipal de Oeiras"/>
                                </a>
                            </div>
                            {/*
                            <div className="col-12 col-lg-4 offset-lg-4 text-center p-0 px-lg-3 my-2 my-lg-3 align-self-center">
                                <Link to="/besponsor">
                                    <button type="button" className="btn btn-block btn-dev py-2 px-3 mt-3">
                                        <span className="fs-lg fw-7"><FormattedMessage id="index.sec8.besponsor"/></span>
                                    </button>
                                </Link>
                            </div>
                            */}
                        </div>
                        <hr className="f-primary primary"/>
                        <div className="row justify-content-center align-items-center m-0">
                            <div className="col-6 col-lg-3 p-0 text-center">
                                <p className="fs-xs fw-4 flh-2 mb-3">
                                    <a href="/docs/Privacidade.pdf" target="_blank" className="hvr-primary">
                                        <FormattedMessage id="index.sec8.privacy"/>
                                    </a>
                                </p>
                            </div>
                            <div className="col-6 col-lg-3 p-0 text-center">
                                <p className="fs-xs fw-4 flh-2 mb-3 hvr-primary cp">
                                    <Link to="/besponsor">
                                        <FormattedMessage id="index.sec8.besponsor"/>
                                    </Link>
                                </p>
                            </div>
                            <div className="col-6 col-lg-3 p-0 text-center">
                                <p className="fs-xs fw-4 flh-2 mb-3">
                                    <FormattedMessage id="index.sec8.madewith"/>
                                    <a href="http://mern.io/" target="_blank" className="hvr-primary">
                                        MERN Stack
                                    </a>
                                </p>
                            </div>
                            <div className="col-6 col-lg-3 p-0 text-center">
                                <a href="http://neeti.tecnico.ulisboa.pt" target="_blank" className="hvr-primary">
                                    <p className="fs-xs fw-4 flh-2 mb-3"><FormattedMessage id="index.sec8.copyright"/></p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default Index;

