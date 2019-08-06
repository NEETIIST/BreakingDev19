import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import ReactDOM from "react-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";

import Dev from './dev';
import Idea from "../ideas/idea";

class Devs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devs: [],
            isDetail: false,
            profile: null,
            content: "all",
        };
        this.seeList = this.seeList.bind(this);
    }

    navigation = (content) => { this.setState(state => ({ content: content })); };
    componentDidMount() { this.getDevs(); }

    // TODOS:
    validateProfile(profile){  };
    unvalidateProfile(profile){  };
    confirmPayment(profile){  };
    cancelPayment(profile){  };

    getDevs(){
        axios.get(URL+'/api/devs/all', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.setState({ devs: response.data }); })
            .catch(function (error){ if ( error.response.status == 404 ) console.log("Something Went Wrong"); })
    }

    allDevs() {
        const { intl } = this.props;
        if ( this.state.devs.length === 0)
            return <p className="fs-md fw-4 flh-1 my-3"><FormattedMessage id="staffdash.devs.empty"/></p>;
        else
            return (
                this.state.devs.map((dev, index) => {
                    return(
                        <div className="col-12 col-lg-6 px-1">
                            <div className="row justify-content-start align-content-center m-0 f-dark-grey py-1 my-1 dev-profile ">
                                <div className="col-8 col-lg-9 py-0 pl-2 text-left">
                                    <span className={"fs-sm fw-7 flh-1"}>{dev.name}</span>
                                    <span className={"fs-xs fw-4 flh-1 f-grey ml-2"}>({dev.username})</span>
                                </div>
                                <div className="col-4 col-lg-3 py-0 pr-2 text-right">
                                    <i className={"fas fa-fw fa-times f-green fa-lg flh-1 "+(dev.approved?"d-flex":"d-none")}/>
                                    <i className={"fas fa-fw fa-exclamation-triangle f-yellow fa-lg flh-1 "+(dev.pending?"d-flex":"d-none")}/>
                                    <i className={"fas fa-fw fa-users fa-lg flh-1 "+(dev.hasTeam?"d-flex":"d-none")}/>
                                    <i onClick={() => this.seeProfile(dev)}
                                       title={intl.formatMessage({id: 'staffdash.devs.seemore'})}
                                       className="fas fa-fw fa-search-plus fa-lg flh-1 cp hvr-primary"/>
                                </div>
                            </div>
                        </div>
                    )
                })
            );
    };

    seeProfile(profile){ this.setState({ isDetail: true, profile: profile }); }
    seeList(){ this.setState({ isDetail: false, profile: null }); }

    render() {
        let isDetail = this.state.isDetail;
        let profile =  this.state.profile;
        let content = this.state.content;
        let remainingSize = ( isDetail ? "90":"80");

        return(
            <Fade bottom cascade>
                <div className="row justify-content-center align-content-center m-0 vh-10">
                    <div className="col-11 col-lg-11 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2" />
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="staffdash.devs.title"/></span>
                        <i className="fas fa-fw fa-user-friends fa-lg flh-1 ml-2" />
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                {/*
                <div className={"row justify-content-center align-content-center m-0 vh-10 "+(isDetail?"d-none":"d-flex")} >
                    <div className={"col col-lg-3 p-2 text-center cp dash-subopt"+ (content==="all" ? "-active" :"")}
                         onClick={() => this.navigation("all")}>
                        <i className="fas fa-fw fa-list fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0 d-none d-lg-inline"><FormattedMessage id="staffdash.devs.all"/></span>
                    </div>
                    <div className={"col col-lg-3 p-2 text-center cp dash-subopt"+ (content==="approved" ? "-active" :"")}
                         onClick={() => this.navigation("approved")}>
                        <i className="fas fa-fw fa-check fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0 d-none d-lg-inline"><FormattedMessage id="staffdash.devs.approved"/></span>
                    </div>
                    <div className={"col col-lg-3 p-2 text-center cp dash-subopt"+ (content==="pending" ? "-active" :"")}
                         onClick={() => this.navigation("pending")}>
                        <i className="fas fa-fw fa-gavel fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0 d-none d-lg-inline"><FormattedMessage id="staffdash.devs.pending"/></span>
                    </div>
                </div>
                */}
                <div className={"row justify-content-center align-content-start m-0 vh-"+remainingSize} style={{maxHeight:remainingSize+"vh", overflowX: "hidden", overFlowY: "scroll"}}>
                    <div className="col-11 p-0">
                        {isDetail ? "" : <div className="spacer-4" /> }
                    </div>
                    {isDetail ? <div className="col-11 p-0">
                                    <Dev {...this.props} profile={profile}
                                    methods={{seeList: () => this.seeList()}}/>
                                </div>
                              : this.allDevs() }
                </div>
            </Fade>
        );

    }
}

export default Devs;
