import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import ReactDOM from "react-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";

//import See from "./see";
//import Edit from "./edit";
//import Add from './add';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //hasTeam: false,
            //team: null,
            content: "see"
        };

        //this.createdProfile = this.createdProfile.bind(this);
        //this.editedProfile = this.editedProfile.bind(this);
    }


    navigation = (content) => { this.setState(state => ({ content: content })); };
    /*
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
    }

    createdProfile(profile){ setTimeout(() => { this.setState({ hasProfile: true, profile: profile, content:"see"});}, 3000)};
    editedProfile(profile){ setTimeout(() => { this.setState({ profile: profile, content:"see"});}, 2000)};
    */

    render() {
        let content = this.state.content;
        //let team = this.state.team;
        //let hasTeam = this.state.hasTeam;
        //let remainingSize = ( hasTeam ? "80":"90");

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
                <div className={"row justify-content-center align-content-start py-lg-3 p-0 m-0 dash-subnav no-scrollbar "}>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="see" ? "-active" :"")}
                         onClick={() => this.navigation("see")}>
                        <i className="fas fa-fw fa-search fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.see"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="edit" ? "-active" :"")}
                         onClick={() => this.navigation("edit")}>
                        <i className="fas fa-fw fa-user-edit fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.profile.edit"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 mx-lg-0 text-center cp dash-subopt"+ (content==="files" ? "-active" :"")}
                         onClick={() => this.navigation("files")}>
                        <i className="fas fa-fw fa-file-alt fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0  "><FormattedMessage id="dash.profile.files"/></span>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start m-0 dash-content"}>
                    <div className="col-12 p-0">
                        <div className="spacer-4" />


                    </div>
                </div>
            </Fade>
        );

    }
}

export default Profile;
