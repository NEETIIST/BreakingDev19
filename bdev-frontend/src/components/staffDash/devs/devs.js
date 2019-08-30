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
            ready: false,
        };
        this.seeList = this.seeList.bind(this);
        this.validateProfile = this.validateProfile.bind(this);
        this.invalidateProfile = this.invalidateProfile.bind(this);
        this.confirmPayment = this.confirmPayment.bind(this);
        this.cancelPayment = this.cancelPayment.bind(this);
    }

    navigation = (content) => { this.setState(state => ({ content: content })); };
    componentDidMount() { this.getDevs(); }

    // TODOS:
    validateProfile(profile){
        axios.put(URL+'/api/devs/_'+profile.username+'/validate', {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                let updatedDevs = this.state.devs.filter( function(dev){ return dev !== profile } );
                updatedDevs.push( response.data );
                this.setState({ devs: updatedDevs, profile: response.data });
            })
            .catch(function (error){ console.log(error); })
    };
    invalidateProfile(profile){
        axios.put(URL+'/api/devs/_'+profile.username+'/invalidate', {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                let updatedDevs = this.state.devs.filter( function(dev){ return dev !== profile } );
                updatedDevs.push( response.data );
                this.setState({ devs: updatedDevs, profile: response.data });
            })
            .catch(function (error){ console.log(error); })
    };
    confirmPayment(profile){
        axios.put(URL+'/api/devs/_'+profile.username+'/confirmPayment', {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                let updatedDevs = this.state.devs.filter( function(dev){ return dev !== profile } );
                updatedDevs.push( response.data );
                this.setState({ devs: updatedDevs, profile: response.data });
            })
            .catch(function (error){ console.log(error); })
    };
    cancelPayment(profile){
        axios.put(URL+'/api/devs/_'+profile.username+'/cancelPayment', {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                let updatedDevs = this.state.devs.filter( function(dev){ return dev !== profile } );
                updatedDevs.push( response.data );
                this.setState({ devs: updatedDevs, profile: response.data });
            })
            .catch(function (error){ console.log(error); })
    };

    getDevs(){
        axios.get(URL+'/api/devs/all', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.setState({ devs: response.data, ready:true }); })
            .catch(function (error){ if ( error.response.status == 404 ) console.log("Something Went Wrong"); })
    }

    showDevs() {
        const { intl } = this.props;
        let condition = (dev) => { return(dev) };
        if ( this.state.content === "pending") condition = (dev) => { return( dev.pending? dev : null) };
        if ( this.state.content === "validated") condition = (dev) => { return( dev.validated? dev : null) };
        let filteredDevs = this.state.devs.filter(condition).sort((a, b) => a.name.localeCompare(b.name)) ;
        if ( filteredDevs.length === 0 && this.state.ready)
            return <p className="fs-md fw-4 flh-1 my-3"><FormattedMessage id="staffdash.devs.empty"/></p>;
        else
            return (
                filteredDevs.map((dev, index) => {
                    return(
                        <div className="col-12 col-lg-6 px-1">
                            <div className="row justify-content-start align-content-center m-0 f-dark-grey py-1 my-1 dev-profile cp"
                                 onClick={() => this.seeProfile(dev)}>
                                <div className="col-8 col-lg-9 py-0 pl-2 text-left">
                                    <span className={"fs-sm fw-7 flh-1"}>{dev.name}</span>
                                    <span className={"fs-xs fw-4 flh-1 f-grey ml-2"}>({dev.username})</span>
                                    <i className={"fas fa-fw fa-users fa-md flh-1 ml-2 mr-1 "+(dev.team!==0?"":"d-none")}
                                       title={intl.formatMessage({id: 'staffdash.devs.hasteam'})}/>
                                </div>
                                <div className="col-4 col-lg-3 py-0 pr-2 text-right">
                                    <i className={"fas fa-fw fa-user-check f-green fa-md flh-1 mx-1 "+(dev.validated?"d-inline":"d-none")}
                                       title={intl.formatMessage({id: 'staffdash.devs.validated'})}/>
                                    <i className={"fas fa-fw fa-exclamation-triangle f-yellow fa-md flh-1 mx-1 "+(dev.pending?"d-inline":"d-none")}
                                       title={intl.formatMessage({id: 'staffdash.devs.pending'})}/>
                                    <i className={"fas fa-fw fa-euro-sign f-green fa-md flh-1 mx-1 "+(dev.payment?"d-inline":"d-none")}
                                       title={intl.formatMessage({id: 'staffdash.devs.payment'})}/>
                                    <i className={"fas fa-fw fa-users fa-md flh-1 mx-1 "+(dev.hasTeam?"d-inline":"d-none")}
                                       title={intl.formatMessage({id: 'staffdash.devs.seemore'})}/>
                                    <i className="fas fa-fw fa-chevron-right fa-md flh-1 hvr-primary ml-1"
                                       title={intl.formatMessage({id: 'staffdash.devs.seemore'})}/>
                                </div>
                            </div>
                        </div>
                    )
                })
            );
    };

    pendingDevsCount(){return this.state.devs.filter((dev) => { return( dev.pending? dev : null) }).length}

    seeProfile(profile){ this.setState({ isDetail: true, profile: profile }); }
    seeList(){ this.setState({ isDetail: false, profile: null }); }

    render() {
        let isDetail = this.state.isDetail;
        let profile =  this.state.profile;
        let content = this.state.content;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 col-lg-11 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="staffdash.devs.title"/></span>
                        <i className="fas fa-fw fa-user-friends fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start py-lg-3 p-0 m-0 dash-subnav no-scrollbar "+(isDetail?"d-none":"")} >
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 text-center cp dash-subopt"+ (content==="all" ? "-active" :"")}
                         onClick={() => this.navigation("all")}>
                        <i className="fas fa-fw fa-list fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.devs.all"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 text-center cp dash-subopt"+ (content==="pending" ? "-active" :"")}
                         onClick={() => this.navigation("pending")}>
                        <i className="fas fa-fw fa-gavel fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0 mr-2"><FormattedMessage id="staffdash.devs.all.pending"/></span>
                        <span className={"fs-xs fw-7 flh-1 mb-0 count-notification py-1 px-2 "+(this.pendingDevsCount()===0?"d-none":"d-inline")}>{this.pendingDevsCount()}</span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 text-center cp dash-subopt"+ (content==="validated" ? "-active" :"")}
                         onClick={() => this.navigation("validated")}>
                        <i className="fas fa-fw fa-check fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.devs.all.validated"/></span>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start m-0 dash-content"}>
                        {!this.state.ready ?
                            <div className="col-12 p-0">
                                <div className={"row justify-content-center align-content-center vh-40"}>
                                    <div className={"col-12 p-0 text-center f-grey"}>
                                        <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                                        <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                                    </div>
                                </div>
                            </div>
                            : ""}
                        {isDetail && this.state.ready ? "" : <div className="spacer-4" /> }
                    {isDetail && this.state.ready ?
                        <div className="col-12 p-0">
                            <Dev {...this.props} profile={profile}
                                 methods={{
                                     seeList: () => this.seeList(),
                                     validateProfile: (profile) => this.validateProfile(profile),
                                     invalidateProfile: (profile) => this.invalidateProfile(profile),
                                     confirmPayment: (profile) => this.confirmPayment(profile),
                                     cancelPayment: (profile) => this.cancelPayment(profile),
                                 }}/>
                        </div>
                        : this.showDevs() }
                </div>
            </Fade>
        );

    }
}

export default Devs;
