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
                        <div className={"col-9 px-1 py-2 text-left f-dark-grey"}>
                            <p className="fs-sm fw-7 flh-1 mb-0 f-primary">{company.name}</p>
                        </div>
                    </div>
                    <div className={"row justify-content-center align-items-start m-0 pt-1 "+(company.job?"":"d-none")}>
                        <div className={"col-12 px-2 py-1 text-left f-dark-grey"}>
                            <p className="fs-xs fw-4 flh-1 mb-1 f-primary">
                                <FormattedMessage id="guestdash.company.see.job"/>
                            </p>
                            <p className="fs-sm fw-4 flh-1 mb-0">
                                {company.job}
                            </p>
                        </div>
                    </div>
                    <div className={"row justify-content-center align-items-start m-0 pt-1 "+(company.search?"":"d-none")}>
                        <div className={"col-12 px-2 py-1 text-left f-dark-grey"}>
                            <p className="fs-xs fw-4 flh-1 mb-1 f-primary">
                                <FormattedMessage id="guestdash.company.see.search"/>
                            </p>
                            <p className="fs-sm fw-4 flh-1 mb-0">
                                {company.search}
                            </p>
                        </div>
                    </div>
                    <hr className={"mt-2 mb-1"} />
                    <div className="row justify-content-center align-items-center m-0 f-dark-grey">
                        <div className={"col-12 col-lg-auto pt-1 px-2 text-left f-dark-grey hvr-primary "+(company.website?"":"d-none")}>
                            <a href={company.website} target={"_blank"}>
                                <i className="fas fa-fw fa-home flh-1 mr-2" />
                                <span className="fs-xs fw-4 flh-1 mb-0">{company.website}</span>
                            </a>
                        </div>
                        <div className={"col-12 col-lg-auto pt-1 px-2 text-left f-dark-grey hvr-primary "+(company.email?"":"d-none")}>
                            <a href={"mailto:"+company.email} target={"_blank"}>
                                <i className="fas fa-fw fa-envelope flh-1 mr-2" />
                                <span>{company.email}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Company;
