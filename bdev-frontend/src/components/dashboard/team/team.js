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
import Join from './join';
import Find from './find';
import Validate from './validate';
import Search from './search';
import Payment from './payment';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dev: null,
            team: "",
            content: "see",
            loaded: false,
            query: null,
            isCaptain: false,
        };

        this.createdTeam = this.createdTeam.bind(this);
        this.editedTeam = this.editedTeam.bind(this);
        this.removedMember = this.removedMember.bind(this);
        this.disbandedTeam = this.disbandedTeam.bind(this);
        this.joinedTeam = this.joinedTeam.bind(this);
        this.leftTeam = this.leftTeam.bind(this);
        this.resetCode = this.resetCode.bind(this);
        this.changedValidation = this.changedValidation.bind(this);
    }

    componentDidMount() {
        this.getProfile();
        if ( this.props.location.search !== "" )
        {
            this.state.query = this.props.location.search.replace(/^.*?\=/, '');
            this.state.content = "join";
        }
    }

    navigation = (content) => { this.setState(state => ({ content: content })); };

    getProfile(){
        axios.get(URL+'/api/devs/me', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                this.setState({ dev: response.data });
                if ( response.data.team === 0)
                    this.setState({ team: 0, loaded:true});
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
            .then(response => { this.setState({ team: response.data, isCaptain:(response.data.captain===this.props.auth.user.username) });  })
            .catch(function (error){ if ( error.response.status == 404 ) console.log("User doesn't have a Team yet"); })
            .then(()=>{this.setState({loaded:true})})
    }


    createdTeam(team){ setTimeout(() => { this.setState({ team: team, content:"see"});}, 3000)};
    editedTeam(team){ setTimeout(() => { this.setState({ team: team, content:"see"});}, 2000)};
    joinedTeam(team){ setTimeout(() => { this.setState({ team: team, content:"see"});}, 3000)};
    removedMember(team){this.setState({ team: team });}
    disbandedTeam(dev){ this.setState({team:0, dev:dev, content:"see"});}
    leftTeam(dev){ this.setState({team:0, dev:dev, content:"see"});}
    resetCode(team){this.setState({ team: team });}
    changedValidation(team){ this.setState({ team: team }) }

    render() {
        let content = this.state.content;
        let teamValidated = this.state.team.validated;
        let hasTeam = (this.state.team!==0);
        let loaded = this.state.loaded;
        let isValidated;
        if (loaded) isValidated = this.state.dev.validated;
        let isCaptain = this.state.isCaptain;

        console.log(teamValidated);

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
                <div className={"row justify-content-center align-content-start py-lg-3 p-0 m-0 dash-subnav no-scrollbar "+(hasTeam&&loaded?"":"d-none")}>
                    <div className={"col-auto col-lg-2 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="see" ? "-active" :"")}
                         onClick={() => this.navigation("see")}>
                        <i className="fas fa-fw fa-search fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.team.see"/></span>
                    </div>
                    <div className={"col-auto col-lg-2 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="edit" ? "-active" :"")+(isCaptain?"":" d-none")}
                         onClick={() => this.navigation("edit")}>
                        <i className="fas fa-fw fa-user-edit fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.team.edit"/></span>
                    </div>
                    <div className={"col-auto col-lg-2 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="members" ? "-active" :"")}
                         onClick={() => this.navigation("members")}>
                        <i className="fas fa-fw fa-users fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.team.members"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="validate" ? "-active" :"")+(isCaptain&&!teamValidated?"":" d-none")}
                         onClick={() => this.navigation("validate")}>
                        <i className="fas fa-fw fa-check fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.team.validate"/></span>
                    </div>
                    <div className={"col-auto col-lg-2 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="payment" ? "-active" :"")+(teamValidated?"":" d-none")}
                         onClick={() => this.navigation("payment")}>
                        <i className="fas fa-fw fa-money-check-alt fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.team.payment"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="search" ? "-active" :"")+(isCaptain&&content==="search"?"":" d-none")}
                         onClick={() => this.navigation("search")}>
                        <i className="fas fa-fw fa-search fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.team.search"/></span>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start py-lg-3 p-0 m-0 dash-subnav no-scrollbar "+((!hasTeam&&content&&loaded!=="see")?"":"d-none")}>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="add" ? "-active" :"")}
                         onClick={() => this.navigation("add")}>
                        <i className="far fa-fw fa-plus-square fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.team.add"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="find" ? "-active" :"")}
                         onClick={() => this.navigation("find")}>
                        <i className="fas fa-fw fa-search fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.team.find"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="join" ? "-active" :"")}
                         onClick={() => this.navigation("join")}>
                        <i className="fas fa-fw fa-users fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.team.join"/></span>
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
                        { !isValidated && loaded ?
                            <div className={"row justify-content-center align-content-center vh-40"}>
                                <div className={"col-12 p-0 text-center f-grey"}>
                                    <i className="fas fa-fw fa-user-times fa-3x mb-3" />
                                    <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.team.notvalidated"/></p>
                                </div>
                            </div>
                        : ""}
                        { isValidated && loaded && !hasTeam && content==="see" ?
                            <div className={"row justify-content-center align-content-center f-grey"}>
                                <div className={"col-9 col-lg-3 mx-3 my-2 p-0 text-center cp dash-team-options"}
                                     onClick={() => this.navigation("add")}>
                                    <div className={"row justify-content-center align-content-center vh-15 px-2 py-3 m-0"} style={{alignItems:"center"}}>
                                        <div className={"col-3 col-lg-12 text-center py-1 px-2"}>
                                            <i className="far fa-fw fa-plus-square fa-3x my-auto" />
                                        </div>
                                        <div className={"col-9 col-lg-12 text-left text-lg-center py-1"}>
                                            <p className="fs-md fw-7 flh-1 mb-1"><FormattedMessage id="dash.team.add.title"/></p>
                                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.team.add.short"/></p>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-9 col-lg-3 mx-3 my-2 p-0 text-center cp dash-team-options"}
                                     onClick={() => this.navigation("find")}>
                                    <div className={"row justify-content-center align-content-center vh-15 px-2 py-3 m-0"} style={{alignItems:"center"}}>
                                        <div className={"col-3 col-lg-12 text-center py-1 px-2"}>
                                            <i className="fas fa-fw fa-search fa-3x" />
                                        </div>
                                        <div className={"col-9 col-lg-12 text-left text-lg-center py-1"}>
                                            <p className="fs-md fw-7 flh-1 mb-1"><FormattedMessage id="dash.team.find.title"/></p>
                                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.team.find.short"/></p>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-9 col-lg-3 mx-3 my-2  p-0 text-center cp dash-team-options"}
                                     onClick={() => this.navigation("join")}>
                                    <div className={"row justify-content-center align-content-center vh-15 px-2 py-3 m-0"} style={{alignItems:"center"}}>
                                        <div className={"col-3 col-lg-12 text-center py-1 px-2"}>
                                            <i className="fas fa-users fa-3x" />
                                        </div>
                                        <div className={"col-9 col-lg-12 text-left text-lg-center py-1"}>
                                            <p className="fs-md fw-7 flh-1 mb-1"><FormattedMessage id="dash.team.join.title"/></p>
                                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.team.join.short"/></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ""}
                        {content === "add" && loaded ? <Add {...this.props} onSuccess={this.createdTeam}/> : ""}
                        {content === "find" && loaded ? <Find {...this.props} /> : ""}
                        {content === "join" && loaded ? <Join {...this.props} query={this.state.query} onSuccess={this.joinedTeam}/>: ""}
                        {content === "see" && hasTeam && loaded ? <See {...this.props} team={this.state.team} /> : ""}
                        {content === "edit" && hasTeam && loaded ? <Edit {...this.props} team={this.state.team} onSuccess={this.editedTeam} /> : ""}
                        {content === "members" && hasTeam && loaded ? <Members {...this.props} team={this.state.team} onRemove={this.removedMember} onDisband={this.disbandedTeam} onLeave={this.leftTeam} onResetCode={this.resetCode} navigation={this.navigation}/> : ""}
                        {content === "validate" && hasTeam && loaded ? <Validate {...this.props} team={this.state.team} onSuccess={this.changedValidation}/> : ""}
                        {content === "payment" && hasTeam && isValidated && loaded ? <Payment {...this.props} team={this.state.team}/> : ""}
                        {content === "search" && hasTeam && loaded ? <Search {...this.props} /> : ""}
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Profile;
