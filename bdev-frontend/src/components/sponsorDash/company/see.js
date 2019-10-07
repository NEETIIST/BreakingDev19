import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";

class See extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {

        }
        this.allSkills = this.allSkills.bind(this);
    }

    allSkills(data) {
        return (
            data.map((tag, index) => {
                return(
                    <div className="tag px-2 py-0 mr-2 mb-1">
                        <p key={index} className="fs-xs fw-4 my-1 px-1">{tag}</p>
                    </div>
                )
            })
        );
    };


    render() {
        const company = this.props.company;
        const { intl } = this.props;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-items-center m-0 vh-20">
                    <div className="col-12 col-lg-3 p-0 text-center">
                        <img src={"/sponsors/"+company.short+".png"} className={"img-fluid mb-3 mb-lg-0 "}/>
                    </div>
                    <div className="col-12 col-lg-9 p-2 text-left f-dark-grey">
                        <p className="fs-md fw-7 flh-2 f-primary">
                            {company.name}
                        </p>
                        <div className="row justify-content-start align-items-center m-0 mt-3">
                            <div className={"col-6 col-lg-3 p-0 hvr-primary cp my-1 "+(company.website ? "d-flex":"d-none")}>
                                <a href={company.website} target={"_blank"}>
                                    <i className="fas fa-fw fa-home fa-lg mr-2 mt-1"/>
                                    <span className="fs-md fw-4 flh-1 mb-1">{company.website}</span>
                                </a>
                            </div>
                            <div className={"col-6 col-lg-3 p-0 hvr-primary cp my-1 "+(company.email ? "d-flex":"d-none")}>
                                <a href={"mailto:"+company.email} target={"_blank"}>
                                    <i className="fas fa-fw fa-envelope fa-lg mr-2 mt-1"/>
                                    <span className="fs-md fw-4 flh-1 mb-1">{company.email}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"spacer-2"} />
                <div className="row justify-content-center align-items-center m-0 mt-3">
                    <div className="col-12 p-0 f-dark-grey">
                        <p className="fs-sm fw-4 flh-1 mb-1 f-primary">
                            <FormattedMessage id="sponsordash.company.see.job"/>
                        </p>
                        <p className="fs-md fw-4 flh-1 mb-0">
                            {company.job}
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center m-0 mt-3">
                    <div className="col-12 p-0 f-dark-grey">
                        <p className="fs-sm fw-4 flh-1 mb-1 f-primary">
                            <FormattedMessage id="sponsordash.company.see.search"/>
                        </p>
                        <p className="fs-md fw-4 flh-1 mb-0">
                            {company.search}
                        </p>
                    </div>
                </div>
                <div className={"spacer-2"} />
            </Fade>
        );

    }
}

export default See;
