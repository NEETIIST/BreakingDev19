import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import ReactDOM from "react-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";


import Company from './company';

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            content: "all",
            ready: false,
        };
    }

    navigation = (content) => { this.setState(state => ({ content: content })); };
    componentDidMount() { this.getCompanies(); }

    getCompanies(){
        axios.get(URL+'/api/companies/all', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { console.log(response); this.setState({ companies: response.data, ready:true }); })
            .catch(function (error){ console.log("Something Went Wrong"); })
    }

    showCompanies(){
        const { intl } = this.props;
        let condition = (team) => { return(team) };
        //if ( this.state.content === "pending") condition = (team) => { return( team.pending? team : null) };
        //if ( this.state.content === "validated") condition = (team) => { return( team.validated? team : null) };
        //let filteredTeams = this.state.teams.filter(condition).sort((a, b) => a.team_name.localeCompare(b.team_name)) ;
        let filteredCompanies = this.state.companies.filter(condition).sort((a, b) => a.short.localeCompare(b.short));
        if ( filteredCompanies.length === 0 && this.state.ready)
            return (
                <p className="fs-md fw-4 flh-1 my-3 f-dark-grey" onClick={() => this.navigation("add")}>
                    <FormattedMessage id="staffdash.companies.empty"/>
                </p>
            )
        else
            return (
                filteredCompanies.map((company, index) => {
                    return(
                        <Company {...this.props} company={company} />
                    )
                })
            )
    }

    render() {
        let content = this.state.content;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 col-lg-12 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="staffdash.companies.title"/></span>
                        <i className="fas fa-fw fa-user-friends fa-lg flh-1 ml-2" />
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start m-0 pt-3 pb-2 dash-content"}>
                    { !this.state.ready && content === "all" ?
                        <div className="col-12 p-0">
                            <div className={"row justify-content-center align-content-center vh-40"}>
                                <div className={"col-12 p-0 text-center f-grey"}>
                                    <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                                    <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                                </div>
                            </div>
                        </div>
                        :""}
                    { this.state.ready && content === "all" ?
                        <div className="col-12 text-left p-0 px-1 dash-team-list">
                            <p className="fs-sm fw-4 flh-1 f-grey mb-1"><FormattedMessage id="guestdash.companies.desc1"/></p>
                            <p className="fs-sm fw-4 flh-1 f-grey mb-3"><FormattedMessage id="guestdash.companies.desc2"/></p>
                            <Fade bottom cascade>
                                <div className="card-columns">
                                    { this.showCompanies() }
                                </div>
                            </Fade>
                            {/*
                            <p className="fs-sm fw-4 flh-1 f-grey mt-3"><FormattedMessage id="guestdash.companies.desc2"/></p>
                            */}
                        </div>
                        :""}
                </div>
            </Fade>
        );

    }
}

export default Companies;

