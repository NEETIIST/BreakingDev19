import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    allMembers(members) {
        return (
            members.map((user, index) => {
                return(
                    <span className="fs-sm fw-4 ml-2">
                        <i className={"fas fa-fw fa-sm mx-1 mb-2 fa-user"} />
                        {user}
                    </span>
                )
            })
        );
    };

    allCodes(members) {
        return (
            members.map((code, index) => {
                return(
                    <span className="fs-sm fw-4 ml-2">
                        <i className={"fas fa-fw fa-sm mx-1 mb-2 fa-key"} />
                        {code}
                    </span>
                )
            })
        );
    };

    render() {
        var timeago = require("timeago.js");

        const company = this.props.company;
        //const members = team.members.length +1;

        const { intl } = this.props;
        const methods = this.props.methods;

        //const canValidate = (team.members.length >=1 && !team.validated);

        return(
            <div className="card text-left dash-team white" key={company.short}>
                <div className="card-body">
                    <div className="row justify-content-center align-items-center m-0">
                        <div className={"col-3 p-0 p-0 pr-2 text-left"}>
                            <img src={"/sponsors/"+company.short+".png"} className={"img-fluid "}/>
                        </div>
                        <div className={"col-9 p-0 px-1 text-left f-dark-grey"}>
                            <div className="row justify-content-center align-items-center m-0 mb-2">
                                <div className="col-12 p-0 text-left no-scrollbar" style={{whiteSpace:"nowrap", overflowX: "scroll"}}>
                                    <span className="fs-md fw-4 flh-2 mb-0 mr-2 f-light-grey">({company.short})</span>
                                    <span className={"fs-xxs fw-4 ml-2 hvr-primary cp"}
                                          onClick={() => methods.editCompany(company)}>
                                        <i className={"fas fa-fw fa-lg mx-1 fa-pencil-alt"}
                                           title={intl.formatMessage({ id: 'staffdash.companies.edit' })} />
                                    </span>
                                </div>
                            </div>
                            <p className="fs-md fw-7 flh-2 mb-0 f-primary">{company.name}</p>
                            {/*
                            <span className={"fs-xxs fw-4 ml-2 " +(team.pending?"":"d-none") }>
                                <i className={"fas fa-fw fa-lg mx-1 fa-exclamation-triangle f-yellow"}
                                   title={intl.formatMessage({ id: 'staffdash.teams.pending' })} />
                                {timeago.format(team.registration)}
                            </span>
                            <span className={"fs-xxs fw-4 ml-2 " +(team.validated?"":"d-none") }>
                                <i className={"fas fa-fw fa-lg mx-1 fa-check f-green"}
                                   title={intl.formatMessage({ id: 'staffdash.teams.validated' })} />
                                {timeago.format(team.registration)}
                            </span>
                            */}
                            <div className="row justify-content-center align-items-center m-0 mt-1">
                                <div className="col-12 p-0 text-left no-scrollbar" style={{whiteSpace:"nowrap", overflowX: "scroll"}}>
                                    {this.allMembers(company.members)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-start m-0 pt-1">
                        <div className={"col-12 p-0 px-2 text-left f-dark-grey"}>
                            <p className="fs-sm fw-7 flh-1 mb-1 ">{company.job}</p>
                            <p className="fs-xs fw-4 flh-2 mb-0 ">{company.search}</p>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center m-0 mt-1 f-grey">
                        <div className="col-12 p-0 text-left no-scrollbar" style={{whiteSpace:"nowrap", overflowX: "scroll"}}>
                            {this.allCodes(company.codes)}
                        </div>
                    </div>
                    <hr className={"mt-2 mb-1"} />
                    <div className="row justify-content-center align-items-start m-0 pt-1 f-dark-grey">
                        <div className={"col-auto p-0 px-2 text-left hvr-primary cp"}
                             onClick={() => methods.generateCode(company)}>
                            <i className={"fas fa-md mx-2 fa-key"}
                               title={intl.formatMessage({ id: 'staffdash.companies.generatecode' })} />
                            <span className="fs-sm fw-4 flh-1 mb-0 "><FormattedMessage id="staffdash.companies.generatecode"/></span>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Company;
