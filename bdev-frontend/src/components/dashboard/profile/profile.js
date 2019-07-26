import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import {NavLink} from "react-router-dom";
import Feed from "../feed/feed";
import Team from "../team/team";

class Profile extends Component {
    constructor(props) {
        super(props);
        if ( props.subcontent === "default" ?
            this.state = { content: "see" } :
            this.state = { content: props.subcontent }
        );
        this.props.history.push('/dashboard/profile/'+this.state.content);
    }

    navigation = (content) => {
        //console.log(content);
        this.setState(state => ({ content: content }));
        this.props.history.push('/dashboard/profile/'+content)
    };

    render() {
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
                        <div className="row justify-content-center align-content-center m-0">
                            <div className="col col-lg-3 p-2 text-center dash-subopt" onClick={() => this.navigation("see")}>
                                <NavLink activeClassName="dash-subopt-active" exact to="/dashboard/profile/see">
                                    <i className="fas fa-fw fa-search fa-lg flh-1 mr-2"/>
                                    <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.see"/></span>
                                    <span className="dash-subopt-box mt-2"/>
                                </NavLink>
                            </div>
                            <div className="col col-lg-3 p-2 text-center dash-subopt" onClick={() => this.navigation("edit")}>
                                <NavLink activeClassName="dash-subopt-active" exact to="/dashboard/profile/edit">
                                    <i className="fas fa-fw fa-user-edit fa-lg flh-1 mr-2"/>
                                    <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.edit"/></span>
                                    <span className="dash-subopt-box mt-2"/>
                                </NavLink>
                            </div>
                            <div className="col col-lg-3 p-2 text-center dash-subopt" onClick={() => this.navigation("validate")}>
                                <NavLink activeClassName="dash-subopt-active" exact to="/dashboard/profile/validate">
                                    <i className="fas fa-fw fa-check fa-lg flh-1 mr-2"/>
                                    <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.validate"/></span>
                                    <span className="dash-subopt-box mt-2"/>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center align-content-start m-0 vh-80 overflow-auto" style={{maxHeight:"80vh"}}>
                    <div className="col-11 p-0">
                        {this.state.content == "see" ? "see" : ""}
                        {this.state.content == "edit" ? "edit" : ""}
                        {this.state.content == "validate" ? "validate" : ""}
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Profile;
