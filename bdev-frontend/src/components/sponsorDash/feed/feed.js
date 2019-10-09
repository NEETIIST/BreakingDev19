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
                console.log(response);
            })
            .catch(function (error){ console.log(error); })
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
                        <span className="fs-lg fw-7 flh-1 f-dark-grey"><FormattedMessage id="sponsordash.feed.title"/></span>
                        <i className="fas fa-fw fa-columns fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className="row justify-content-center align-content-start m-0 dash-content">
                    <div className="col-12 p-0">
                        <div className="spacer-2"></div>
                        <div className="row justify-content-center align-content-start m-0">
                            <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                    "linear-gradient( rgba(37, 113, 131, 0.6), rgba(37, 113, 131, 1)), url('/img/sponsors2.png')"}}>
                                <div className="row justify-content-center align-content-center m-0 vh-15"
                                     onClick={()=>this.props.navigation("company")}>
                                    <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                        <i className="fas fa-user-tie fa-lg" />
                                    </div>
                                    <div className="col-9 px-1 text-left">
                                        <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="sponsordash.feed.company1"/></p>
                                        <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="sponsordash.feed.company2"/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                    "linear-gradient( rgba(37, 113, 131, 0.6), rgba(37, 113, 131, 1)), url('/img/sponsors1.png')"}}>
                                <div className="row justify-content-center align-content-center m-0 vh-15"
                                     onClick={()=>this.props.navigation("devs")}>
                                    <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                        <i className="fas fa-user-friends fa-lg"></i>
                                    </div>
                                    <div className="col-9 px-1 text-left">
                                        <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="sponsordash.feed.devs1"/></p>
                                        <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="sponsordash.feed.devs2"/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 dash-button-box cp mx-0 mx-lg-2 my-1" style={{backgroundImage:
                                    "linear-gradient( rgba(37, 113, 131, 0.6), rgba(37, 113, 131, 1)), url('/img/img1.jpg')"}}>
                                <div className="row justify-content-center align-content-center m-0 vh-15"
                                     onClick={()=>this.props.navigation("devs")}>
                                    <div className="col-3 p-0 text-center align-self-center fs-2xl">
                                        <i className="fas fa-users fa-lg"></i>
                                    </div>
                                    <div className="col-9 px-1 text-left">
                                        <p className="fs-lg fw-7 flh-1 mb-1"><FormattedMessage id="sponsordash.feed.teams1"/></p>
                                        <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="sponsordash.feed.teams2"/></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="spacer-2"></div>
                    </div>
                </div>
            </Fade>

        );

    }
}

export default Feed;
