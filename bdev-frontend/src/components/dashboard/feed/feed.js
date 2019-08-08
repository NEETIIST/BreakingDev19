import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import { Link } from "react-router-dom";

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <Fade bottom cascade>
                <div className="row justify-content-center align-content-center m-0 vh-10">
                    <div className="col-11 col-lg-11 p-0 text-right">
                        <div className="spacer-2 mb-2"></div>
                        <span className="fs-lg fw-7 flh-1 f-dark-grey"><FormattedMessage id="dash.feed.title"/></span>
                        <i className="fas fa-fw fa-columns fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className="row justify-content-center align-content-start m-0 vh-90 overflow-auto" style={{maxHeight:"90vh"}}>
                    <div className="col-11 p-0">
                        <div className="spacer-2"></div>
                        <div className="row justify-content-center align-content-start m-0">
                            <div className="col-12 col-lg dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                    "linear-gradient( rgba(37, 113, 131, 0.6), rgba(37, 113, 131, 1)), url('/img/img1.jpg')"}}>
                                <div className="row justify-content-center align-content-center m-0 vh-15"
                                onClick={()=>this.props.navigation("profile")}>
                                    <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                        <i className="far fa-user fa-lg"></i>
                                    </div>
                                    <div className="col-9 px-1 text-left">
                                        <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="dash.feed.userinfo1"/></p>
                                        <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.feed.userinfo2"/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                    "linear-gradient( rgba(37, 113, 131, 0.6), rgba(37, 113, 131, 1)), url('/img/sponsors2.png')"}}>
                                <div className="row justify-content-center align-content-center m-0 vh-15"
                                     onClick={()=>this.props.navigation("team")}>
                                    <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                        <i className="fas fa-users fa-lg"></i>
                                    </div>
                                    <div className="col-9 px-1 text-left">
                                        <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="dash.feed.teaminfo1"/></p>
                                        <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.feed.teaminfo2"/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="spacer-2"></div>
                        <hr className="mb-0 mt-1 my-0"/>
                        <div className="spacer-2"></div>
                        <div className="row justify-content-center align-content-start m-0">
                            <div className="col-12 p-0">
                                {/*
                                <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.feed.userinfo"/></p>
                                */}
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

        );

    }
}

export default Feed;
