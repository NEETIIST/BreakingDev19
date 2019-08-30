import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import axios from "axios";
import URL from "../../../utils/requestsURL";

class Validate extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {

        };
        //this.requestValidation = this.requestValidation.bind(this);
        //this.cancelValidation = this.cancelValidation.bind(this);
    }

    requestValidation(){
        axios.put(URL+'/api/teams/own/validate', {},{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.props.onSuccess(response.data); })
            .catch(function (error){ console.log(error); })
    }

    cancelValidation(){
        axios.put(URL+'/api/teams/own/validate/cancel', {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.props.onSuccess(response.data); })
            .catch(function (error){ console.log(error); })
    }

    render() {
        const team = this.props.team;
        const { intl } = this.props;
        const isReady = team.members.length >= 1 ;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-items-center m-0 vh-20">
                    <div className={"col-12 p-0 text-left f-dark-grey "+(!isReady && !team.pending && !team.validated?"":"d-none")}>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.team.validate.info1"/></p>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.team.validate.info2"/></p>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.team.validate.info3"/></p>
                        <div className="spacer-2" />
                    </div>
                    <div className={"col-12 p-0 text-left f-dark-grey "+(isReady && !team.pending && !team.validated?"":"d-none")}>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.team.validate.info4"/></p>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.team.validate.info5"/></p>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.team.validate.info6"/></p>
                        <div className="spacer-2" />
                        <button onClick={()=>this.requestValidation()} className="btn btn-dev-alt fw-7" >
                            <span className="fs-sm flh-1"><FormattedMessage id="dash.team.validate.request"/></span>
                        </button>
                        <div className={"spacer-2"} />
                    </div>
                    <div className={"col-12 p-0 text-left f-dark-grey "+(team.pending?"":"d-none")}>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.team.validate.info7"/></p>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.team.validate.info8"/></p>
                        <div className="spacer-2" />
                        <button onClick={()=>this.cancelValidation()} className="btn btn-dev-alt fw-7" >
                            <span className="fs-sm flh-1"><FormattedMessage id="dash.team.validate.cancel"/></span>
                        </button>
                        <div className={"spacer-2"} />
                    </div>
                    <div className={"col-12 p-0 text-left f-dark-grey "+(team.validated?"":"d-none")}>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.team.validate.info9"/></p>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.team.validate.info10"/></p>
                        <div className="spacer-2" />
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Validate;
