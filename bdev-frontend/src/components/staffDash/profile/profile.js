import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import ReactDOM from "react-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";

import See from "./see";
import Edit from "./edit";
import Add from './add';
import Files from './files';

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
        this.changedFiles = this.changedFiles.bind(this);
    }

    navigation = (content) => { this.setState(state => ({ content: content })); };

    componentDidMount() { this.getProfile(); }

    getProfile(){
        axios.get(URL+'/api/staff/me', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
        .then(response => { this.setState({ hasProfile: true, profile: response.data }); })
        .catch(function (error){ if ( error.response.status == 404 ) console.log("User doesn't have a Staff profile yet"); })
        .then(()=>{this.setState({loaded:true})})
    }

    createdProfile(profile){ setTimeout(() => { this.setState({ hasProfile: true, profile: profile, content:"see"});}, 3000)};
    editedProfile(profile){ setTimeout(() => { this.setState({ profile: profile, content:"see"});}, 2000)};
    changedFiles(profile){ this.setState({ profile: profile}); };

    render() {
        let content = this.state.content;
        let profile = this.state.profile;
        let hasProfile = this.state.hasProfile;
        let loaded = this.state.loaded;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="staffdash.profile.title"/></span>
                        <i className="far fa-fw fa-user fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start py-lg-3 p-0 m-0 dash-subnav no-scrollbar "+(hasProfile?"":"d-none")}>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 text-center cp dash-subopt"+ (content==="see" ? "-active" :"")}
                         onClick={() => this.navigation("see")}>
                        <i className="fas fa-fw fa-search fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.profile.see"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 text-center cp dash-subopt"+ (content==="edit" ? "-active" :"")}
                         onClick={() => this.navigation("edit")}>
                        <i className="fas fa-fw fa-user-edit fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.profile.edit"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="files" ? "-active" :"")}
                         onClick={() => this.navigation("files")}>
                        <i className="fas fa-fw fa-file-alt fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.profile.files"/></span>
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
                        {profile === null && loaded ? <Add {...this.props} onSuccess={this.createdProfile}/> : ""}
                        {content === "see" && profile && loaded ? <See {...this.props} profile={profile} /> : ""}
                        {content === "edit" && profile && loaded ? <Edit {...this.props} profile={profile} onSuccess={this.editedProfile}/> : ""}
                        {content === "files" && profile && loaded ? <Files {...this.props} profile={profile} onSuccess={this.changedFiles} /> : ""}
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Profile;
