import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import ReactDOM from "react-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";

import Team from './team';

class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            content: "all",
            ready: false,
        };

        this.validateTeam = this.validateTeam.bind(this);
        this.invalidateTeam = this.invalidateTeam.bind(this);
    }

    navigation = (content) => { this.setState(state => ({ content: content })); };
    componentDidMount() { this.getTeams(); }

    validateTeam(team){
        axios.put(URL+'/api/teams/_'+team.number+'/validate', {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                let updatedTeams = this.state.teams.filter( function(team){ return team !== team } );
                updatedTeams.push( response.data );
                this.setState({ teams: updatedTeams });
            })
            .catch(function (error){ console.log(error); })
    };
    invalidateTeam(team){
        axios.put(URL+'/api/teams/_'+team.number+'/invalidate', {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                let updatedTeams = this.state.teams.filter( function(team){ return team !== team } );
                updatedTeams.push( response.data );
                this.setState({ teams: updatedTeams });
            })
            .catch(function (error){ console.log(error); })
    };

    getTeams(){
        axios.get(URL+'/api/teams/active', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.setState({ teams: response.data, ready:true }); })
            .catch(function (error){ console.log("Something Went Wrong"); })
    }

    showTeams(){
        const { intl } = this.props;
        let condition = (team) => { return(team) };
        if ( this.state.content === "pending") condition = (team) => { return( team.pending? team : null) };
        if ( this.state.content === "validated") condition = (team) => { return( team.validated? team : null) };
        let filteredTeams = this.state.teams.filter(condition).sort((a, b) => a.name.localeCompare(b.name)) ;
        if ( filteredTeams.length === 0 && this.state.ready)
            return <p className="fs-md fw-4 flh-1 my-3"><FormattedMessage id="staffdash.teams.empty"/></p>;
        else
            return (
                filteredTeams.map((team, index) => {
                    return(
                        <Team {...this.props} team={team}
                              methods={{
                                  validateTeam: (team) => this.validateTeam(team),
                                  invalidateTeam: (team) => this.invalidateTeam(team),
                              }}
                        />
                    )
                })
            )
    }

    pendingTeamsCount(){return this.state.teams.filter((team) => { return( team.pending? team : null) }).length}

    render() {
        let content = this.state.content;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 col-lg-11 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="staffdash.teams.title"/></span>
                        <i className="fas fa-fw fa-user-friends fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start py-lg-3 p-0 m-0 dash-subnav no-scrollbar "+(isDetail?"d-none":"")} >
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 text-center cp dash-subopt"+ (content==="all" ? "-active" :"")}
                         onClick={() => this.navigation("all")}>
                        <i className="fas fa-fw fa-list fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.teams.all"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 text-center cp dash-subopt"+ (content==="pending" ? "-active" :"")}
                         onClick={() => this.navigation("pending")}>
                        <i className="fas fa-fw fa-gavel fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0 mr-2"><FormattedMessage id="staffdash.teams.all.pending"/></span>
                        <span className={"fs-xs fw-7 flh-1 mb-0 count-notification py-1 px-2 "+(this.pendingTeamsCount()===0?"d-none":"d-inline")}>{this.pendingTeamsCount()}</span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 text-center cp dash-subopt"+ (content==="validated" ? "-active" :"")}
                         onClick={() => this.navigation("validated")}>
                        <i className="fas fa-fw fa-check fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.teams.all.validated"/></span>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start m-0 pt-3 pb-2 dash-content"}>
                    {!this.state.ready ?
                        <div className="col-12 p-0">
                            <div className={"row justify-content-center align-content-center vh-40"}>
                                <div className={"col-12 p-0 text-center f-grey"}>
                                    <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                                    <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="col-12 text-center p-0 dash-team-list">
                            <Fade bottom cascade>
                                <div className="card-columns">
                                    { this.showTeams() }
                                </div>
                            </Fade>
                        </div>
                    }
                </div>
            </Fade>
        );

    }
}

export default Teams;
