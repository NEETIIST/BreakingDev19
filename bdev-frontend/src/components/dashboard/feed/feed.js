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
            overview: "",
            loaded:false,
        };
    }

    componentDidMount() {
        axios.get(URL+'/api/devs/me/overview', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                this.setState({ overview: response.data, loaded:true });
                //console.log(response);
            })
            .catch(function (error){ console.log(error); })
            .then(response => { this.setState({ loaded:true }); })
    }

    render() {
        const loaded = this.state.loaded;
        //const overview = this.state.overview;
        const overview = {
            "isValidated":this.state.overview.isValidated,
            "hasTeam":this.state.overview.hasTeam,
            "teamValidated": this.state.overview.teamValidated,
            "paymentConfirmed": this.state.overview.paymentConfirmed,
            "isCaptain": this.state.overview.isCaptain,
        }
        return(
            <Fade bottom cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1 f-dark-grey"><FormattedMessage id="dash.feed.title"/></span>
                        <i className="fas fa-fw fa-columns fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className="row justify-content-center align-content-start m-0 dash-content">
                    <div className="col-12 p-0">
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
                            {loaded ? "":
                                <div className="col-12 p-0">
                                    <div className={"row justify-content-center align-content-center vh-40"}>
                                        <div className={"col-12 p-0 text-center f-grey"}>
                                            <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                                            <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                                        </div>
                                    </div>
                                </div>}
                            {overview.isValidated === false ?
                                <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                        "linear-gradient( rgba(224, 134, 31, 0.9), rgba(224, 134, 31, 1))"}}>
                                    <div className="row justify-content-center align-content-center m-0 vh-15"
                                         onClick={()=>this.props.navigation("profile","validate")}>
                                        <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                            <i className="fas fa-exclamation fa-lg"></i>
                                        </div>
                                        <div className="col-9 px-1 text-left">
                                            <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="dash.feed.validate1"/></p>
                                            <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.feed.validate2"/></p>
                                        </div>
                                    </div>
                                </div>
                                :""}
                            {overview.isValidated === true ?
                                <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                        "linear-gradient( rgba(22, 94, 15, 0.9), rgba(22, 94, 15, 1))"}}>
                                    <div className="row justify-content-center align-content-center m-0 vh-15"
                                         onClick={()=>this.props.navigation("profile","edit")}>
                                        <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                            <i className="fas fa-user-check fa-lg"></i>
                                        </div>
                                        <div className="col-9 px-1 text-left">
                                            <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="dash.feed.validate3"/></p>
                                            <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.feed.validate4"/></p>
                                        </div>
                                    </div>
                                </div>
                                :""}
                            {overview.isValidated===true && overview.hasTeam===false ?
                                <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                        "linear-gradient( rgba(224, 134, 31, 0.9), rgba(224, 134, 31, 1))"}}>
                                    <div className="row justify-content-center align-content-center m-0 vh-15"
                                         onClick={()=>this.props.navigation("team","see")}>
                                        <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                            <i className="fas fa-exclamation fa-lg"></i>
                                        </div>
                                        <div className="col-9 px-1 text-left">
                                            <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="dash.feed.noteam1"/></p>
                                            <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.feed.noteam2"/></p>
                                        </div>
                                    </div>
                                </div>
                                :""}
                            {overview.hasTeam === true ?
                                <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                        "linear-gradient( rgba(22, 94, 15, 0.9), rgba(22, 94, 15, 1))"}}>
                                    <div className="row justify-content-center align-content-center m-0 vh-15"
                                         onClick={()=>this.props.navigation("team","see")}>
                                        <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                            <i className="fas fa-users fa-lg"></i>
                                        </div>
                                        <div className="col-9 px-1 text-left">
                                            <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="dash.feed.hasteam1"/></p>
                                            <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.feed.hasteam2"/></p>
                                        </div>
                                    </div>
                                </div>
                                :""}
                            {overview.hasTeam===true && overview.teamValidated===false ?
                                <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                        "linear-gradient( rgba(224, 134, 31, 0.9), rgba(224, 134, 31, 1))"}}>
                                    <div className="row justify-content-center align-content-center m-0 vh-15"
                                         onClick={()=>this.props.navigation("team","validate")}>
                                        <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                            <i className="fas fa-exclamation fa-lg"></i>
                                        </div>
                                        <div className="col-9 px-1 text-left">
                                            <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="dash.feed.validateteam1"/></p>
                                            {overview.isCaptain ?
                                                <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.feed.validateteam2"/></p>
                                                :<p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.feed.validateteam3"/></p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                :""}
                            {overview.teamValidated === true && overview.paymentConfirmed===false ?
                                <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                        "linear-gradient( rgba(22, 94, 15, 0.9), rgba(22, 94, 15, 1))"}}>
                                    <div className="row justify-content-center align-content-center m-0 vh-15"
                                         onClick={()=>this.props.navigation("team","payment")}>
                                        <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                            <i className="fas fa-euro-sign fa-lg"></i>
                                        </div>
                                        <div className="col-9 px-1 text-left">
                                            <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="dash.feed.teamready1"/></p>
                                            <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.feed.teamready2"/></p>
                                        </div>
                                    </div>
                                </div>
                                :""}
                            {overview.paymentConfirmed===true ?
                                <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                        "linear-gradient( rgba(22, 94, 15, 0.9), rgba(22, 94, 15, 1))"}}>
                                    <div className="row justify-content-center align-content-center m-0 vh-15"
                                         onClick={()=>this.props.navigation("team","payment")}>
                                        <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                            <i className="fas fa-check fa-lg"></i>
                                        </div>
                                        <div className="col-9 px-1 text-left">
                                            <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="dash.feed.allready1"/></p>
                                            <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.feed.allready2"/></p>
                                        </div>
                                    </div>
                                </div>
                                :""}
                        </div>
                    </div>
                </div>
            </Fade>

        );

    }
}

export default Feed;
