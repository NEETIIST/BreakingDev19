import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import axios from "axios";
import URL from "../../../utils/requestsURL";
import querystring from "query-string";
import {paymentInput} from "./formValidation";

class Payment extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.validator = paymentInput;
        this.state = {
            payment: "",
            loaded: false,
            code: "",
            //
            validation: this.validator.valid(),
            status: "waiting",
            errors: ""
        };
        //this.requestValidation = this.requestValidation.bind(this);
        //this.cancelValidation = this.cancelValidation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(URL+'/api/devs/me/price', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.setState({payment:response.data, loaded:true}); })
            .catch(function (error){ console.log(error); })
    }

    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
    fieldHasValue = field => {return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");};
    onSubmit(e){
        e.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid && this.state.message !== "") {
            this.setState({status: "pending"});

            axios
                .post(URL+"/api/promocodes/_"+this.state.code+"/use", {},{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                    },
                })
                .then(res => {
                    this.setState({ status: "waiting", payment:res.data });
                })
                .catch(err => {
                    this.setState({ status: "waiting", errors:err.response.data, code:"" });
                    console.log(err.response)
                })
            //.then(socket.emit('sent_message', this.props.channel.socket_id));
        }
    }

    render() {
        const team = this.props.team;
        const { intl } = this.props;
        //const isReady = team.members.length >= 1 ;
        const loaded = this.state.loaded;
        const payment = this.state.payment;
        const hasCode = payment.promocode !== "";
        const isConfirmed = payment.confirmed;
        const isFree = payment.price === 0;


        let validation = this.submitted ?        // if the form has been submitted at least once
            this.validator.validate(this.state) :   // then check validity every time we render
            this.state.validation;                   // otherwise just use what's in state

        const status = this.state.status;
        const errors = this.state.errors;

        return(
            <Fade right cascade>
                <div className={"row justify-content-center align-content-center vh-40 "+(loaded?"d-none":"")}>
                    <div className={"col-12 p-0 text-center f-grey"}>
                        <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                        <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                    </div>
                </div>
                <div className={"row justify-content-center align-items-center m-0 vh-20 "+(loaded?"":"d-none")+(isConfirmed?" d-none":"")}>
                    <div className={"col-12 p-0 text-left f-dark-grey"}>
                        <p className="fs-md fw-4 flh-2 mb-1"><FormattedMessage id="dash.team.payment.info1"/></p>
                        <p className="fs-md fw-4 flh-2 mb-1"><FormattedMessage id="dash.team.payment.info2"/></p>
                        <p className={"fs-md fw-4 flh-2 mb-1 "+(hasCode&&!isFree?"":"d-none")}>
                            <FormattedMessage id="dash.team.payment.info5"/>
                            <span className={"f-primary fw-7"}>{payment.promocode}</span>
                            <FormattedMessage id="dash.team.payment.info6"/>
                        </p>
                        <p className={"fs-md fw-4 flh-2 mb-1 "+(hasCode&&!isFree?"d-none":"")}><FormattedMessage id="dash.team.payment.info3"/></p>
                        <form onSubmit={this.onSubmit} autoComplete="off" className={(hasCode?"d-none":"")}>
                            <div className={"alert alert-danger mt-3 py-2 px-3 "+(status==="waiting"&&errors!==""?"":"d-none")} role="alert">
                                <FormattedMessage id={"dash.team.payment.alert."+errors}/>
                            </div>
                            <div className={"row justify-content-start align-items-start"}>
                                <div className={"col-8 col-lg-6"}>
                                    <div className={"form-group "+(status==="waiting"?"":"d-none")}>
                                        <div className={validation.code.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("code")}
                                                   name="code"
                                                   placeholder={intl.formatMessage({id: 'forms.code.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.code}
                                            />
                                            <span className="help-block fs-xs">
                                                <FormattedMessage id={validation.code.message}/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className={""+(status==="pending"?"":"d-none")}>
                                        <i className="fas fa-fw fa-circle-notch fa-spin fa-lg" />
                                    </div>
                                </div>
                                <div className={"col-4 col-lg-2"}>
                                    <input type="submit"
                                           value={intl.formatMessage({ id: 'forms.use' })}
                                           className="btn btn-dev-alt btn-block fw-7" />
                                </div>
                            </div>
                        </form>
                        <p className={"fs-xs fw-4 flh-2 "+(hasCode?"d-none":"")}><FormattedMessage id="dash.team.payment.info4"/></p>
                        <div className={"row justify-content-center align-items-center mx-0 my-2"}>
                            <div className={"col-12 col-lg-6 p-0 text-left f-dark-grey"}>
                                <div className="card">
                                    <div className="card-header">
                                        <FormattedMessage id="dash.team.payment.account"/>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <FormattedMessage id="dash.team.payment.iban"/>
                                        </li>
                                        <li className="list-group-item">
                                            <FormattedMessage id="dash.team.payment.name"/>
                                        </li>
                                        <li className="list-group-item">
                                            <FormattedMessage id="dash.team.payment.value"/>
                                            {payment.price} €
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p className="fs-sm fw-4 flh-2"><FormattedMessage id="dash.team.payment.info7"/></p>
                    </div>
                </div>
                <div className={"row justify-content-center align-items-center m-0 vh-20 "+(loaded?"":"d-none")+(isConfirmed?"":" d-none")}>
                    <div className={"col-12 p-0 text-left f-dark-grey"}>
                        <p className={"fs-md fw-4 flh-2 mb-2 "+(isFree?"":"d-none")}>
                            <FormattedMessage id="dash.team.payment.info8"/>
                            <span className={"f-primary fw-7"}>{payment.promocode}</span>
                            <FormattedMessage id="dash.team.payment.info9"/>
                        </p>
                        <p className={"fs-md fw-4 flh-2 mb-2 "+(isFree?"d-none":"")}>
                            <FormattedMessage id="dash.team.payment.info8"/>
                            <span className={"f-primary fw-7"}>{payment.promocode}</span>
                            <FormattedMessage id="dash.team.payment.info10"/>
                        </p>
                        <p className="fs-md fw-4 flh-2"><FormattedMessage id="dash.team.payment.info11"/></p>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Payment;
