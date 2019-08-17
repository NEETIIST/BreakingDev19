import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";

class See extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {

        }
        this.allSkills = this.allSkills.bind(this);
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

    allMembers(members){
        return (
            members.map((member, index) => {
                return(
                    <div className={"col-6 col-lg-3 p-0 my-1 "}>
                        <i className="fas fa-fw fa-user fa-lg mr-2 mt-1"/>
                        <span className="fs-md fw-4 flh-1 mb-1">@ {member}</span>
                    </div>
                )
            })
        );
    }


    render() {
        const team = this.props.team;
        const { intl } = this.props;

        //let hasPicture = (profile.picture!=="");

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-items-center m-0 vh-20">
                    <div className="col-12 col-lg-3 px-3 text-center text-lg-left">
                        <img src={"/icons/WebAlt.png"} className={"img-fluid p-3 "+(team.category==="Web"?"":"d-none")}/>
                        <img src={"/icons/JogosAlt.png"} className={"img-fluid p-3 "+(team.category==="Games"?"":"d-none")}/>
                    </div>
                    <div className="col-12 col-lg-9 p-0 text-left f-dark-grey">
                        <div className="row justify-content-start align-items-center m-0">
                            <div className={"col-auto px-2 py-1 alert alert-warning mr-2 my-1 my-lg-0 "+(team.pending?"":"d-none")}>
                                <i className="fas fa-fw fa-exclamation-triangle fa-md flh-1 mx-1"/>
                                <span className="fs-sm fw-4 flh-1 f-grey mx-1"><FormattedMessage id="dash.team.see.pending"/></span>
                            </div>
                            <div className={"col-auto px-2 py-1 alert alert-success mr-2 my-1 my-lg-0 "+(team.validated?"":"d-none")}>
                                <i className="fas fa-fw fa-user-check fa-md flh-1 mx-1"/>
                                <span className="fs-sm fw-4 flh-1 f-grey mx-1"><FormattedMessage id="dash.team.see.validated"/></span>
                            </div>
                        </div>
                        <p className="fs-xl fw-7 flh-1 mb-3 mt-3">
                            {team.team_name}
                        </p>
                        <p className={"fs-md fw-4 flh-1 mb-1 "+(team.website === "" ? "d-none":"")}>
                            <i className="fas fa-fw fa-home fa-lg mr-2"/>
                            {team.website}
                        </p>
                        <div className="row justify-content-start align-items-center m-0 mt-3">
                            <div className={"col-6 col-lg-3 p-0 my-1 "}>
                                <i className="fas fa-fw fa-user-tie fa-lg mr-2"/>
                                <span className="fs-md fw-4 flh-1 mb-1">@{team.captain}</span>
                            </div>
                            {this.allMembers(team.members)}
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center m-0 mt-3">
                    <div className="col-12 p-0 f-dark-grey">
                        <p className="fs-sm fw-4 flh-1 mb-3 f-primary">
                            <FormattedMessage id="dash.team.see.project"/>
                        </p>
                        <p className="fs-lg fw-7 flh-1 mb-2">
                            {team.proj_name}
                        </p>
                        <p className="fs-md fw-4 flh-2 mb-0">
                            {team.proj_desc}
                        </p>
                    </div>
                </div>
                <div className={"row justify-content-center align-items-center m-0 mt-3 "+(team.skills ? "d-flex":"")}>
                    <div className="col-12 p-0 f-dark-grey">
                        <p className="fs-sm fw-4 flh-1 mb-2 f-primary">
                            <FormattedMessage id="dash.team.see.skills"/>
                        </p>
                        {this.allSkills(team.skills)}
                    </div>
                </div>
                <div className={"spacer-2"} />
            </Fade>
        );

    }
}

export default See;
