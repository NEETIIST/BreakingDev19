import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
//import FormValidator from "../../../utils/FormValidator";
import { companyAddInput } from "./formValidation";
import axios from "axios";
import querystring from "query-string";
import Fade from "react-reveal/Fade";
import URL from "../../../utils/requestsURL";


class Add extends Component {
    constructor(props) {
        super(props);

        this.validator = companyAddInput;
        this.state = {
            name:"",
            short:"",
            //
            validation: this.validator.valid(),
            status: "waiting",
            errors: ""
        };

        //console.log(this.props.onSuccess);
        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
    fieldHasValue = field => {return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");};

    onSubmit(e) {
        e.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
            this.setState({status: "pending"});
            const newRequest = {
                name: this.state.name,
                short: this.state.short,
            };
            axios
                .post(URL+"/api/companies/create", querystring.stringify(newRequest), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                    },
                })
                .then(res => {
                    if (res.status === 200)
                    {
                        this.setState({ status: "success" });
                        this.props.onSuccess(res.data);
                    }
                })
                .catch(err => {
                    this.setState({ status: "waiting" });
                    console.log(err)
                });
        }
    }

    render() {
        let validation = this.submitted ?        // if the form has been submitted at least once
            this.validator.validate(this.state) :   // then check validity every time we render
            this.state.validation;                   // otherwise just use what's in state

        const { intl } = this.props;
        const status = this.state.status;

        return(
            <Fade right cascade>
                <div className={"row justify-content-center align-items-start m-0"}>
                    <div className={"col-12 p-0 text-left f-dark-grey "+(status=="waiting"?"d-block":"d-none")}>
                        <p className="fs-md fw-4 flh-1 mb-1"><FormattedMessage id="staffdash.companies.add.title"/></p>
                        <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.companies.add.desc"/></p>
                        <div className="spacer-2"/>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-12 col-lg-7 p-0">
                                    <div className="form-group">
                                        <div className={validation.name.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("name")}
                                                   name="name"
                                                   placeholder={intl.formatMessage({id: 'forms.name.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.name}
                                            />
                                            <span className="help-block fs-xs">
                                                <FormattedMessage id={validation.name.message}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 offset-lg-1 p-0">
                                    <div className="form-group">
                                        <div className={validation.short.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("short")}
                                                   name="short"
                                                   placeholder={intl.formatMessage({id: 'forms.short.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.short}
                                            />
                                            <span className="help-block fs-xs">
                                                <FormattedMessage id={validation.short.message}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-end align-items-start mx-0 my-3">
                                <div className="col-6 col-lg-3 p-0">
                                    <input type="submit"
                                           value={intl.formatMessage({ id: 'staffdash.companies.add.title' })}
                                           className="btn btn-dev-alt btn-block fw-7" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={"col-12 text-center p-0 "+(status=="pending"?"d-block":"d-none")}>
                        <Fade>
                            <i className="fas fa-circle-notch fa-spin fa-3x my-3 f-primary"></i>
                            <p className="fs-md fw-4 flh-2 mb-0"><FormattedMessage id="forms.sending"/></p>
                        </Fade>
                    </div>
                    <div className={"col-12 text-center p-0 "+(status=="success"?"d-block":"d-none")}>
                        <Fade>
                            <i className="fas fa-check fa-3x my-3 f-primary"></i>
                            <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="staffdash.companies.add.done"/></p>
                        </Fade>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Add;
