import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import axios from "axios";
import URL from "../../../utils/requestsURL";

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overview:{},
        };
    }

    componentDidMount() { this.getOverview(); }
    getOverview(){
        axios.get(URL+'/api/staff/overview', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.setState({ overview: response.data }); })
            .catch(function (err){ console.log(err); })
    }

    render() {
        const overview = this.state.overview;
        return(
            <Fade bottom cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="staffdash.feed.title"/></span>
                        <i className="fas fa-fw fa-columns fa-lg flh-1 ml-2" />
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className="row justify-content-center align-content-start m-0 dash-content">
                    <div className="col-12 p-0">
                        <div className={"spacer-4"} />
                        <div className="row justify-content-center align-content-start m-0">
                            <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                    "linear-gradient( rgba(37, 113, 131, 0.6), rgba(37, 113, 131, 1)), url('/img/img1.jpg')"}}>
                                <div className="row justify-content-center align-content-center m-0 vh-15"
                                     onClick={()=>this.props.navigation("devs")}>
                                    <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                        <span className="fs-3xl fw-7 flh-1">{overview.devsTotal}</span>
                                    </div>
                                    <div className="col-9 px-1 text-left">
                                        <p className="fs-lg fw-7 flh-1 my-1"><FormattedMessage id="staffdash.feed.devinfo1"/></p>
                                        <p className="fs-sm fw-4 flh-1 mb-0">{overview.devsPending} <FormattedMessage id="staffdash.feed.devinfo2"/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                    "linear-gradient( rgba(37, 113, 131, 0.6), rgba(37, 113, 131, 1)), url('/img/sponsors5.png')"}}>
                                <div className="row justify-content-center align-content-center m-0 vh-15"
                                     onClick={()=>this.props.navigation("teams")}>
                                    <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                        <span className="fs-3xl fw-7 flh-1">{overview.teamsValidated}</span>
                                    </div>
                                    <div className="col-9 px-1 text-left">
                                        <p className="fs-lg fw-7 flh-1 my-1"><FormattedMessage id="staffdash.feed.teaminfo1"/></p>
                                        <p className="fs-sm fw-4 flh-1 mb-0">{overview.teamsTotal} <FormattedMessage id="staffdash.feed.teaminfo2"/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                    "linear-gradient( rgba(37, 113, 131, 0.6), rgba(37, 113, 131, 1)), url('/img/sponsors2.png')"}}>
                                <div className="row justify-content-center align-content-center m-0 vh-15"
                                     onClick={()=>this.props.navigation("ideas")}>
                                    <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                        <span className="fs-3xl fw-7 flh-1">{overview.ideasApproved}</span>
                                    </div>
                                    <div className="col-9 px-1 text-left">
                                        <p className="fs-lg fw-7 flh-1 my-1"><FormattedMessage id="staffdash.feed.ideainfo1"/></p>
                                        <p className="fs-sm fw-4 flh-1 mb-0">{overview.ideasPending} <FormattedMessage id="staffdash.feed.ideainfo2"/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Feed;
