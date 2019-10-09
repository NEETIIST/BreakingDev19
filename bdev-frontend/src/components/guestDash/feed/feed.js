import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import { Link } from "react-router-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <Fade bottom cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1 f-dark-grey"><FormattedMessage id="sponsordash.feed.title"/></span>
                        <i className="fas fa-fw fa-columns fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className="row justify-content-center align-content-start m-0 dash-content">
                    <div className="col-12 p-0">
                        <div className="spacer-2" />
                        <div className="row justify-content-center align-content-start m-0">
                            <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                    "linear-gradient( rgba(37, 113, 131, 0.6), rgba(37, 113, 131, 1)), url('/img/img1.jpg')"}}>
                                <div className="row justify-content-center align-content-center m-0 vh-15"
                                     onClick={()=>this.props.navigation("profile")}>
                                    <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                        <i className="far fa-user fa-lg" />
                                    </div>
                                    <div className="col-9 px-1 text-left">
                                        <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="guestdash.feed.profile1"/></p>
                                        <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="guestdash.feed.profile2"/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="spacer-2" />
                        <hr className="mb-0 mt-1 my-0"/>
                        <div className="spacer-2" />
                        <div className="row justify-content-center align-content-start m-0">
                            <div className={"col-12 col-lg-12 text-justify text-lg-center text-lg-left p-0 f-dark-grey"}>
                                <p className="fs-sm fw-4 flh-2 mb-2 cp" onClick={()=>this.props.navigation("companies")}>
                                    <FormattedMessage id="guestdash.feed.info1"/>
                                </p>
                                <p className="fs-sm fw-4 flh-2 mb-2 cp" onClick={()=>this.props.navigation("qrcode")}>
                                    <FormattedMessage id="guestdash.feed.info2"/>
                                </p>
                                <p className="fs-sm fw-4 flh-2 mb-3 cp" onClick={()=>this.props.navigation("tickets")}>
                                    <FormattedMessage id="guestdash.feed.info3"/>
                                </p>
                            </div>
                        </div>
                        <div className="row justify-content-center align-content-start m-0">
                            <div className={"col-4 col-lg-2 text-center p-0 mx-2 my-lg-0 my-2 f-dark-grey"}>
                                <img src={"/awards/JBL.png"} className={"img-fluid rounded"} />
                            </div>
                            <div className={"col-4 col-lg-2 text-center p-0 mx-2 my-lg-0 my-2 f-dark-grey"}>
                                <img src={"/awards/MiBand.png"} className={"img-fluid rounded"} />
                            </div>
                            <div className={"col-4 col-lg-2 text-center p-0 mx-2 my-lg-0 my-2 f-dark-grey"}>
                                <img src={"/awards/Powerbank.png"} className={"img-fluid rounded"} />
                            </div>
                            <div className={"col-4 col-lg-2 text-center p-0 mx-2 my-lg-0 my-2 f-dark-grey"}>
                                <img src={"/awards/Spotify.png"} className={"img-fluid rounded"} />
                            </div>
                            <div className={"col-4 col-lg-2 text-center p-0 mx-2 my-lg-0 my-2 f-dark-grey"}>
                                <img src={"/awards/Fnac.png"} className={"img-fluid rounded"} />
                            </div>
                        </div>
                        <div className="spacer-2" />
                    </div>
                </div>
            </Fade>

        );

    }
}

export default Feed;
