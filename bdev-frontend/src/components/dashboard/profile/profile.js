import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import ReactDOM from "react-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";

import See from "./see";
import Edit from "./edit";
import Add from './add';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasProfile: false,
            profile: null,
            content: "see"
        }
        //this.props.history.push('/dashboard/profile/'+this.state.content);
    }

    navigation = (content) => {
        //console.log(content);
        this.setState(state => ({ content: content }));
        //this.props.history.push('/dashboard/profile/'+content)
    };

    componentDidMount() {
        //ReactDOM.findDOMNode(this).scrollIntoView();
        //console.log(this.props);

        axios.get(URL+'/api/devs/me', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
        .then(response => {
            console.log(response);
            this.setState({ profile: response.data });
        })
        .catch(function (error){
            if ( error.response.status == 404 )
                console.log("User doesn't have a dev profile yet");
        })
    }

    render() {
        let content = this.state.content;
        let profile = this.state.profile;
        let hasProfile = this.state.hasProfile;

        return(
            <Fade bottom cascade>
                <div className="row justify-content-center align-content-center m-0 vh-10">
                    <div className="col-11 col-lg-11 p-0 text-right">
                        <div className="spacer-2 mb-2"></div>
                        <span className="fs-lg fw-7 flh-1 f-dark-grey"><FormattedMessage id="dash.profile.title"/></span>
                        <i className="far fa-fw fa-user fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className="row justify-content-center align-content-center m-0 vh-10">
                    <div className="col-11 p-0">
                        <div className="spacer-2"></div>
                        <div className={"row justify-content-center align-content-center m-0 "+(hasProfile?"":"d-none")} >
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
                            <div className={"col col-lg-3 p-2 text-center cp dash-subopt"+ (content==="validate" ? "-active" :"")}
                                 onClick={() => this.navigation("validate")}>
                                <i className="fas fa-fw fa-check fa-lg flh-1 mr-2"/>
                                <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.validate"/></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center align-content-start m-0 vh-80 overflow-auto" style={{maxHeight:"80vh"}}>
                    <div className="col-11 p-0">
                        {profile ? "" : <Add {...this.props}/>}
                        {content === "see" && profile ? <See {...this.props}/> : ""}
                        {content === "edit" && profile ? <Edit {...this.props}/> : ""}
                        {content === "validate" && profile ? "validate" : ""}
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Profile;
