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
        axios.put(URL+'/api/devs/me/validate', {},{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.props.onSuccess(response.data); })
            .catch(function (error){ console.log(error); })
    }

    cancelValidation(){
        axios.put(URL+'/api/devs/me/validate/cancel', {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.props.onSuccess(response.data); })
            .catch(function (error){ console.log(error); })
    }

    render() {
        const profile = this.props.profile;
        const { intl } = this.props;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-items-center m-0 vh-20">
                    <div className={"col-12 p-0 text-left f-dark-grey "+(profile.pending?"d-none":"")}>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.profile.validate.info1"/></p>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.profile.validate.info2"/></p>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.profile.validate.info3"/></p>
                        <div className="spacer-2" />
                        <button onClick={()=>this.requestValidation()} className="btn btn-dev-alt fw-7" >
                            <span className="fs-sm flh-1"><FormattedMessage id="dash.profile.validate.request"/></span>
                        </button>
                        <div className={"spacer-2"} />
                    </div>
                    <div className={"col-12 p-0 text-left f-dark-grey "+(profile.pending?"":"d-none")}>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.profile.validate.info4"/></p>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.profile.validate.info5"/></p>
                        <div className="spacer-2" />
                        <button onClick={()=>this.cancelValidation()} className="btn btn-dev-alt fw-7" >
                            <span className="fs-sm flh-1"><FormattedMessage id="dash.profile.validate.cancel"/></span>
                        </button>
                        <div className={"spacer-2"} />
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Validate;
