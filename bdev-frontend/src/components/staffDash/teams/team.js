import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
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

    allMembers(members) {
        return (
            members.map((user, index) => {
                return(
                    <span className="fs-sm fw-4 ml-2">
                        <i className={"fas fa-fw fa-sm mx-1 mb-2 fa-user"} />
                        {user}
                    </span>
                )
            })
        );
    };

    render() {
        var timeago = require("timeago.js");

        const team = this.props.team;
        const members = team.members.length +1;

        const { intl } = this.props;
        const methods = this.props.methods;

        const canValidate = (team.members.length >=1 && !team.validated);

        return(
            <div className="card text-left dash-team white" key={team.number}>
                <div className="card-body">
                    <div className="row justify-content-center align-items-center m-0">
                        <div className={"col-3 p-0 p-0 pr-2 text-left"}>
                            <img src={"/icons/WebAlt.png"} className={"img-fluid "+(team.category==="Web"?"":"d-none")}/>
                            <img src={"/icons/JogosAlt.png"} className={"img-fluid "+(team.category==="Games"?"":"d-none")}/>
                        </div>
                        <div className={"col-9 p-0 px-1 text-left f-dark-grey"}>
                            <span className="fs-md fw-4 flh-2 mb-0 mr-1 f-light-grey">(#{team.number})</span>
                            <span className="fs-md fw-7 flh-2 mb-0 f-primary">{team.team_name}</span>
                            <span className={"fs-xxs fw-4 ml-2 " +(team.pending?"":"d-none") }>
                                <i className={"fas fa-fw fa-lg mx-1 fa-exclamation-triangle f-yellow"}
                                   title={intl.formatMessage({ id: 'staffdash.teams.pending' })} />
                                {timeago.format(team.registration)}
                            </span>
                            <span className={"fs-xxs fw-4 ml-2 " +(team.validated?"":"d-none") }>
                                <i className={"fas fa-fw fa-lg mx-1 fa-check f-green"}
                                   title={intl.formatMessage({ id: 'staffdash.teams.validated' })} />
                                {timeago.format(team.registration)}
                            </span>
                            <br/>
                            <span className="fs-sm fw-4">
                                <i className={"fas fa-sm mx-1 mb-2 fa-user-tie"}
                                   title={intl.formatMessage({ id: 'dash.team.captain' })} />
                                {team.captain}
                            </span>
                            {this.allMembers(team.members)}
                            <div className="row justify-content-center align-items-center m-0 mt-1">
                                <div className="col-12 p-0 text-left no-scrollbar" style={{whiteSpace:"nowrap", overflowX: "scroll"}}>
                                    {this.allSkills(team.skills)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-start m-0 pt-1">
                        <div className={"col-12 p-0 px-2 text-left f-dark-grey"}>
                            <p className="fs-sm fw-7 flh-1 mb-1 ">{team.proj_name}</p>
                            <p className="fs-xs fw-4 flh-2 mb-0 ">{team.proj_desc}</p>
                        </div>
                    </div>
                    <hr className={"mt-2 mb-1"} />
                    <div className="row justify-content-center align-items-start m-0 pt-1 f-dark-grey">
                        <div className={"col-auto p-0 px-2 text-left hvr-green cp "+(canValidate?"":"d-none")}
                             onClick={() => methods.validateTeam(team)}>
                            <i className={"fas fa-md mx-2 fa-check"}
                               title={intl.formatMessage({ id: 'staffdash.teams.validate' })} />
                            <span className="fs-sm fw-4 flh-1 mb-0 "><FormattedMessage id="staffdash.teams.validate"/></span>
                        </div>
                        <div className={"col-auto p-0 px-2 text-left hvr-red cp "+(team.validated?"":"d-none")}
                             onClick={() => methods.invalidateTeam(team)}>
                            <i className={"fas fa-md mx-2 fa-times"}
                               title={intl.formatMessage({ id: 'staffdash.teams.invalidate' })} />
                            <span className="fs-sm fw-4 flh-1 mb-0 "><FormattedMessage id="staffdash.teams.invalidate"/></span>
                        </div>
                        <div className={"col-auto p-0 px-2 text-left hvr-primary cp"} onClick={"something"}>
                            <i className={"fas fa-md mx-2 fa-comments"}
                               title={intl.formatMessage({ id: 'dash.team.asktojoin' })} />
                            <span className="fs-sm fw-4 flh-1 mb-0 "><FormattedMessage id="dash.team.find.asktojoin"/></span>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Team;
