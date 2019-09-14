import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";
import axios from "axios";
import querystring from "query-string";

class Find extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            teams: [],
        }

        this.chatCaptain = this.chatCaptain.bind(this);
    }

    componentDidMount() {
        this.getTeams();
    }

    chatCaptain(username){
        axios.post(URL+'/api/chat/create', querystring.stringify({target_username:username}), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.props.navigation("chats") })
            .catch(err => console.log(err.response))
    }

    getTeams(){
        axios.get(URL+'/api/teams/wantsmembers', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { console.log(response.data); this.setState({ teams: response.data, loaded:true }); })
            .catch(err => console.log(err.response))
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

    allTeams(){
        const { intl } = this.props;
        return this.state.teams.map((team, index) => {
            const members = team.members.length +1;
            return <div className="card text-left dash-team white" key={team.number}>
                <div className="card-body">
                    <div className="row justify-content-center align-items-center m-0">
                        <div className={"col-3 p-0 p-0 pr-2 text-left"}>
                            <img src={"/icons/WebAlt.png"} className={"img-fluid "+(team.category==="Web"?"":"d-none")}/>
                            <img src={"/icons/JogosAlt.png"} className={"img-fluid "+(team.category==="Games"?"":"d-none")}/>
                        </div>
                        <div className={"col-9 p-0 px-1 text-left f-dark-grey"}>
                            <span className="fs-md fw-7 flh-2 mb-0 f-primary">{team.team_name}</span>
                            <span className="fs-md fw-4 ml-2">
                                <i className={"fas fa-fw fa-sm mx-1 mb-2 fa-users"}
                                   title={intl.formatMessage({ id: 'dash.team.members' })} />
                                {members}
                            </span>
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
                    <div className="row justify-content-center align-items-center m-0 pt-1 f-dark-grey">
                        <div className={"col-12 p-0 px-2 text-left hvr-primary cp"}
                             onClick={()=>this.chatCaptain(team.captain)}>
                            <i className={"fas fa-md mx-2 fa-comments"}
                               title={intl.formatMessage({ id: 'dash.team.asktojoin' })} />
                            <span className="fs-sm fw-4 flh-1 mb-0 "><FormattedMessage id="dash.team.find.asktojoin"/></span>
                        </div>
                        {/*
                        <div className={"col-6 p-0 px-2 text-left f-dark-grey"}>
                            <i className={"fas fa-fw fa-md mx-1 mb-2 fa-users"}
                               title={intl.formatMessage({ id: 'dash.team.members' })} />
                            <span className="fs-sm fw-4 flh-2 mb-0 "><FormattedMessage id="dash.team.join.something"/></span>
                        </div>
                        */}
                    </div>
                </div>
            </div>
        })
    }

    render() {
        const { intl } = this.props;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-items-center m-0 vh-20">
                    <div className="col-12 p-0 f-dark-grey mb-2">
                        <p className="fs-md fw-4 flh-1 mb-1"><FormattedMessage id="dash.team.find.desc1"/></p>
                        <p className="fs-xs fw-4 flh-2 mb-1"><FormattedMessage id="dash.team.find.desc2"/></p>
                    </div>
                    <div className="col-12 text-center p-0 dash-team-list">
                        <Fade bottom cascade>
                            <div className="card-columns">
                                { this.allTeams() }
                            </div>
                        </Fade>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Find;
