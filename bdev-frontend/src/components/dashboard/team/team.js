import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import ReactDOM from "react-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";

import See from "./see";
import Edit from "./edit";
import Add from './add';
import Members from './members';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: null,
            content: "see",
            loaded: false,
        };

        this.createdTeam = this.createdTeam.bind(this);
        this.editedTeam = this.editedTeam.bind(this);
    }


    navigation = (content) => { this.setState(state => ({ content: content })); };

    componentDidMount() { this.getProfile(); }

    getProfile(){
        axios.get(URL+'/api/devs/me', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                if ( response.data.team === 0)
                    this.setState({ team: response.data.team, loaded:true });
                else
                    this.getTeam();
            })
            .catch(function (error){ if ( error.response.status == 404 ) console.log("User doesn't have a Dev Profile yet"); })
    }

    getTeam(){
        axios.get(URL+'/api/teams/own', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.setState({ team: response.data });  })
            .catch(function (error){ if ( error.response.status == 404 ) console.log("User doesn't have a Team yet"); })
            .then(()=>{this.setState({loaded:true})})
    }


    createdTeam(team){ setTimeout(() => { this.setState({ team: team, content:"see"});}, 3000)};
    editedTeam(team){ setTimeout(() => { this.setState({ team: team, content:"see"});}, 2000)};

    render() {
        let content = this.state.content;
        let team = this.state.team;
        let hasTeam = (this.state.team!==0);
        let loaded = this.state.loaded;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="dash.team.title"/></span>
                        <i className="fas fa-fw fa-users fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start py-lg-3 p-0 m-0 dash-subnav no-scrollbar "+(hasTeam?"":"d-none")}>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="see" ? "-active" :"")}
                         onClick={() => this.navigation("see")}>
                        <i className="fas fa-fw fa-search fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.team.see"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="edit" ? "-active" :"")}
                         onClick={() => this.navigation("edit")}>
                        <i className="fas fa-fw fa-user-edit fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.team.edit"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="members" ? "-active" :"")}
                         onClick={() => this.navigation("members")}>
                        <i className="fas fa-fw fa-users fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.team.members"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="files" ? "-active" :"")}
                         onClick={() => this.navigation("files")}>
                        <i className="fas fa-fw fa-file-alt fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.team.files"/></span>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start m-0 dash-content"}>
                    <div className="col-12 p-0">
                        <div className="spacer-4" />
                        {loaded ? "":
                            <div className={"row justify-content-center align-content-center vh-40"}>
                                <div className={"col-12 p-0 text-center f-grey"}>
                                    <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                                    <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                                </div>
                            </div>}
                        { !hasTeam && loaded ? <Add {...this.props} onSuccess={this.createdTeam}/> : ""}
                        {content === "see" && hasTeam && loaded ? <See {...this.props} team={this.state.team} /> : ""}
                        {content === "edit" && hasTeam && loaded ? <Edit {...this.props} team={this.state.team} onSuccess={this.editedTeam} /> : ""}
                        {content === "members" && hasTeam && loaded ? <Members {...this.props} team={this.state.team} onSuccess={this.editedTeam} /> : ""}
                        {content === "validate" && hasTeam && loaded ? "<Validate {...this.props} profile={profile} onSuccess={this.changedValidation}/>" : ""}
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Profile;
