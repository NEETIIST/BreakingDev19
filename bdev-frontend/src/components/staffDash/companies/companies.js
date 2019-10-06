import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import ReactDOM from "react-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";


//import Dev from "../devs/dev";
import Add from "./add";
import Edit from "./edit";
import Company from './company';

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            content: "all",
            ready: false,
            company: undefined,
        };

        //this.validateTeam = this.validateTeam.bind(this);
        //this.invalidateTeam = this.invalidateTeam.bind(this);
        this.createdCompany = this.createdCompany.bind(this);
        this.editedCompany = this.editedCompany.bind(this);
        this.editCompany = this.editCompany.bind(this);
    }

    navigation = (content) => { this.setState(state => ({ content: content })); };
    componentDidMount() { this.getCompanies(); }

    createdCompany(company){ setTimeout(() => { this.setState({ content:"all"}); this.getCompanies();}, 3000)};
    editedCompany(company){ setTimeout(() => { this.setState({ content:"all"}); this.getCompanies();}, 2000)};
    editCompany(company){ this.setState(state =>({content:"edit",company:company}))};

    generateCode(company){
        axios.put(URL+'/api/companies/_'+company.short+'/generate', {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                this.getCompanies();
            })
            .catch(function (error){ console.log(error); })
    };

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
        let filteredCompanies = this.state.companies.filter(condition);
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
                        <Company {...this.props} company={company}
                              methods={{
                                  editCompany: (company) => this.editCompany(company),
                                  generateCode: (company) => this.generateCode(company),
                              }}
                        />
                    )
                })
            )
    }

    render() {
        let content = this.state.content;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 col-lg-11 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="staffdash.companies.title"/></span>
                        <i className="fas fa-fw fa-user-friends fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start py-lg-3 p-0 m-0 dash-subnav no-scrollbar "} >
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 text-center cp dash-subopt"+ (content==="all" ? "-active" :"")}
                         onClick={() => this.navigation("all")}>
                        <i className="fas fa-fw fa-list fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.companies.all"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 text-center cp dash-subopt"+ (content==="add" ? "-active" :"")}
                         onClick={() => this.navigation("add")}>
                        <i className="fas fa-fw fa-gavel fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0 mr-2"><FormattedMessage id="staffdash.companies.add"/></span>
                    </div>
                    <div className={"col-auto col-lg-3 p-2 py-2 px-3 px-lg-2 mx-2 text-center cp dash-subopt"+ (content==="edit" ? "-active" :"")+(content!=="edit"?" d-none":"")}
                         onClick={() => this.navigation("edit")}>
                        <i className="fas fa-fw fa-check fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.companies.edit"/></span>
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
                        <div className="col-12 text-center p-0 dash-team-list">
                            <Fade bottom cascade>
                                <div className="card-columns">
                                    { this.showCompanies() }
                                </div>
                            </Fade>
                        </div>
                        :""}
                    {content==="add"?
                        <div className="col-12 p-0 text-center">
                            <Add {...this.props} onSuccess={this.createdCompany}/>
                        </div>
                        :""}
                    {content==="edit"?
                        <div className="col-12 p-0 text-center">
                            <Edit {...this.props} company={this.state.company} onSuccess={this.editedCompany}/>
                        </div>
                        :""}

                </div>
            </Fade>
        );

    }
}

export default Companies;

