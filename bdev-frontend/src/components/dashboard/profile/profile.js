import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import ReactDOM from "react-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";

import See from "./see";
import Edit from "./edit";
import Add from './add';
import Validate from './validate';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasProfile: false,
            profile: null,
            content: "see",
            loaded: false,
        };

        this.createdProfile = this.createdProfile.bind(this);
        this.editedProfile = this.editedProfile.bind(this);
        this.changedValidation = this.changedValidation.bind(this);
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
            .then(response => { this.setState({ hasProfile: true, profile: response.data }); })
            .catch(function (error){ if ( error.response.status == 404 ) console.log("User doesn't have a Dev profile yet"); })
            .then(()=>{this.setState({loaded:true})})
    }

    createdProfile(profile){ setTimeout(() => { this.setState({ hasProfile: true, profile: profile, content:"see"});}, 3000)};
    editedProfile(profile){ setTimeout(() => { this.setState({ profile: profile, content:"see"});}, 2000)};
    changedValidation(profile){ this.setState({ profile: profile }) }

    render() {
        let content = this.state.content;
        let profile = this.state.profile;
        let hasProfile = this.state.hasProfile;
        let loaded = this.state.loaded;
        let remainingSize = ( hasProfile ? "80":"90");

        return(
            <Fade bottom cascade>
                <div className="row justify-content-center align-content-center m-0 vh-10">
                    <div className="col-11 col-lg-11 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2"></div>
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="dash.profile.title"/></span>
                        <i className="far fa-fw fa-user fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-center m-0 vh-10 "+(hasProfile?"":"d-none")}>
                    <div className="col-11 p-0">
                        <div className="spacer-2"></div>
                        <div className={"row justify-content-center align-content-center m-0 "} >
                            <div className={"col col-lg-3 p-2 text-center cp dash-subopt"+ (content==="see" ? "-active" :"")}
                                 onClick={() => this.navigation("see")}>
                                <i className="fas fa-fw fa-search fa-lg flh-1 mr-2"/>
                                <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.see"/></span>
                            </div>
                            <div className={"col col-lg-3 p-2 text-center cp dash-subopt"+ (content==="edit" ? "-active" :"")}
                                 onClick={() => this.navigation("edit")}>
                                <i className="fas fa-fw fa-user-edit fa-lg flh-1 mr-2"/>
                                <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.edit"/></span>
                            </div>
                            <div className={"col col-lg-3 p-2 text-center cp dash-subopt"+ (content==="validate" ? "-active" :"")+(hasProfile && profile.validated ? " d-none" :"") }
                                 onClick={() => this.navigation("validate")}>
                                <i className="fas fa-fw fa-user-check fa-lg flh-1 mr-2"/>
                                <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.validate"/></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start m-0 vh-"+remainingSize} style={{maxHeight:remainingSize+"vh", overflowX: "hidden", overFlowY: "scroll"}}>
                    <div className="col-11 p-0">
                        <div className="spacer-4"></div>
                        {loaded ? "":
                            <div className={"row justify-content-center align-content-center vh-40"}>
                                <div className={"col-12 p-0 text-center f-grey"}>
                                    <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                                    <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                                </div>
                            </div>}
                        {profile === null && loaded ? <Add {...this.props} onSuccess={this.createdProfile}/> : ""}
                        {content === "see" && profile && loaded ? <See {...this.props} profile={profile} /> : ""}
                        {content === "edit" && profile && loaded ? <Edit {...this.props} profile={profile} onSuccess={this.editedProfile}/> : ""}
                        {content === "validate" && profile && loaded ? <Validate {...this.props} profile={profile} onSuccess={this.changedValidation}/> : ""}
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Profile;
