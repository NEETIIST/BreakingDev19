import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";
import axios from "axios";

class Members extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            loaded:false,
            devs:[],
        }
    }

    componentDidMount() {
        this.getDevs();
    }

    getDevs(){
        axios.get(URL+'/api/teams/own/members', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(res => { this.setState({ devs: res.data });  })
            .catch(function (error){ console.log(error); })
            .then(()=>{this.setState({loaded:true})})
    }

    allSkills(data) {
        return (
            data.map((tag, index) => {
                return(
                    <div className="tag px-2 py-0 mr-2 mb-1">
                        <p key={index} className="fs-xs fw-4 my-1 px-1">{tag}</p>
                    </div>
                )
            })
        );
    };

    allDevs(){
        const { user } = this.props.auth;
        return (
            this.state.devs.map((dev, index) => {
                const hasPicture = (dev.picture !== "");
                // Decide if we want to highlight the captain or logged user
                const isCaptain = (dev.username === this.props.team.captain);
                const amCaptain = (user.username === this.props.team.captain);
                const amSelf = (user.username === dev.username);
                return(
                    <div className={"col-12 col-lg-3 px-0 px-lg-2 my-2"}>
                        <div className={"row justify-content-center align-items-center m-0 px-lg-2 px-3 vh-20 dash-team-member"+(amSelf?"-own":"")}>
                            <div className="col-12 p-0 py-3 text-center d-none d-lg-inline">
                                <img src={URL+"/files/profile/"+dev.picture} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"":"d-none")}/>
                                <img src={URL+"/files/profile/profile_default.png"} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"d-none":"")}/>
                            </div>
                            <div className="col-12 text-left text-lg-center pb-2">
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-12 p-0 no-scrollbar" style={{whiteSpace:"nowrap", overflowX: "scroll"}}>
                                        <p className="fs-lg fw-7 flh-1 mt-1 mb-2">
                                            <i className={"fas fa-md flh-1 mr-2 fa-user"+(isCaptain?"-tie":"")}/>
                                            {dev.name}
                                            <span className="fs-sm fw-4 flh-1 f-grey ml-2">(@{dev.username})</span>
                                        </p>
                                    </div>
                                    <div className="col-12 p-0 text-left text-lg-center no-scrollbar" style={{whiteSpace:"nowrap", overflowX: "scroll"}}>
                                        {this.allSkills(dev.skills)}
                                    </div>
                                    <hr />
                                    <div className={"col-12 p-0 "+(amCaptain?"":"d-none")}>
                                        <hr className={"my-2"} />
                                        <div className={"hvr-red cp"} onClick={""}>
                                            <i className="fas fa-fw fa-user-times fa-md flh-1 mr-2"/>
                                            <span className="fs-sm fw-4 flh-1 mb-0  "><FormattedMessage id="dash.team.members.remove"/></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        );
    }


    render() {
        const team = this.props.team;
        const { intl } = this.props;
        let loaded = this.state.loaded;
        const teamFull = this.props.team.members > 2 ;

        return(
            <Fade right cascade>
                {loaded ?
                    <div className="row justify-content-center align-items-center m-0 f-dark-grey">
                        <div className={"col-12 p-0 text-left"}>
                            <p className="fs-sm fw-4 flh-1 mb-3"><FormattedMessage id="dash.team.members.desc"/></p>
                        </div>
                        <div className={"col-12 p-0 text-left"}>
                            <div className="row justify-content-center align-items-center m-0">
                                {this.allDevs()}
                                <div className={"col-12 col-lg-3 px-0 px-lg-2 my-2"}>
                                    <div className={"row justify-content-center align-items-center m-0 px-lg-2 px-3 vh-20 dash-team-member "+(teamFull?"d-none":"")}>
                                        <div className="col-3 col-lg-12 p-0 text-center ">
                                            <i className="fas fa-fw fa-plus fa-3x my-1" />
                                        </div>
                                        <div className="col-9 col-lg-12 text-left text-lg-center">
                                            <div className="row justify-content-center align-items-center m-0">
                                                <div className="col-12 p-0">
                                                    <p className="fs-md fw-4 flh-1 my-1"><FormattedMessage id="dash.team.add.invite"/></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={"row justify-content-center align-content-center vh-40"}>
                        <div className={"col-12 p-0 text-center f-grey"}>
                            <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                            <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                        </div>
                    </div>
                }
            </Fade>
        );

    }
}

export default Members;
