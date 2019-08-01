import React, { Component } from "react";
import ReactDOM from 'react-dom'
import Fade from 'react-reveal/Fade';
import {FormattedMessage, injectIntl} from "react-intl";

import axios from "axios";
import querystring from "query-string";

import FormValidator from "../../utils/FormValidator";
import './besponsor.css';

class BeSponsor extends Component {
    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollIntoView();
    }

    constructor() {
        super();

        this.validator = new FormValidator([
            {
                field: "name",
                method: "isEmpty",
                validWhen: false,
                message: "forms.name.empty"
            },
            {
                field: "name",
                method: "isLength",
                args: [{min:0, max: 128}],
                validWhen: true,
                message: "forms.name.toolong"
            },
            {
                field: "company",
                method: "isEmpty",
                validWhen: false,
                message: "forms.company.empty"
            },
            {
                field: "name",
                method: "isLength",
                args: [{min:0, max: 128}],
                validWhen: true,
                message: "forms.company.toolong"
            },
            {
                field: "phone",
                method: "isEmpty",
                validWhen: false,
                message: "forms.phone.empty"
            },
            {
                field: "phone",
                method: "isNumeric",  // isMobilePhone not working, try later
                //arguments: [{locale:['pt-PT']}],
                validWhen: true,
                message: "forms.phone.invalid"
            },
            {
                field: "email",
                method: "isEmpty",
                validWhen: false,
                message: "forms.email.empty"
            },
            {
                field: "email",
                method: "isEmail",
                validWhen: true,
                message: "forms.email.invalid"
            }
        ])

        this.state = {
            name:"",
            company:"",
            email:"",
            phone:"",
            validation: this.validator.valid(),
            status: "waiting",
            errors: ""
        };

        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange = event => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        //console.log(validation.isValid);

        if (validation.isValid) {
            this.setState({
                status: "pending",
            })
            const newRequest = {
                name: this.state.name,
                company: this.state.company,
                email: this.state.email,
                phone: this.state.phone
            };
            axios
                .post("http://localhost:4000/api/emails/besponsor", querystring.stringify(newRequest), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                .then(res => {
                    if (res.status == 200)
                        this.setState({
                            status: "success",
                        })
                    console.log(res.status)
                })
                .catch(err => {
                    this.setState({
                        status: "waiting"
                    })
                    console.log(err)
                });
            /*
            this.setState({
                name: "",
                company: "",
                email: "",
                phone: ""
            })
            */
        }
    }

    fieldHasValue = field => {
        return ( this.state[field] != "" ? "form-input-hasvalue" : "");
    }

    render() {
        let validation =    this.submitted ?                         // if the form has been submitted at least once
                            this.validator.validate(this.state) :   // then check validity every time we render
                            this.state.validation                   // otherwise just use what's in state

        const { intl } = this.props;
        const status = this.state.status;
        //console.log(success);

        return(
            <div className="row justify-content-center align-items-center p-0 m-0 primary f-white">
                <div className="col-12 text-left p-0">
                    <div className="row justify-content-center align-items-center p-0 m-0">
                        <div className="col-12 col-lg-4 px-0 text-center photo-container">
                            <img src="img/sponsors1.png" className="img-fluid single-photo"/>
                        </div>
                        <div className="col-6 col-lg-4 px-0 text-center photo-container d-none d-lg-block">
                            <img src="img/sponsors2.png" className="img-fluid single-photo"/>
                        </div>
                        <div className="col-6 col-lg-4 px-0 text-center photo-container d-none d-lg-block">
                            <img src="img/sponsors3.png" className="img-fluid single-photo"/>
                        </div>
                    </div>
                </div>
                <div className="col-11 col-lg-10 text-left p-0">
                    <div className="row justify-content-center align-items-center p-0 m-0">
                        <Fade bottom>
                            <div className="col-12 p-0">
                                <div className="spacer-6"></div>
                                <p className="fs-xl fw-7 flh-2 mb-0"><FormattedMessage id="besponsor.title"/></p>
                                <div className="spacer-4"></div>
                                <p className="fs-md fw-4 flh-2 mb-3"><FormattedMessage id="besponsor.desc1"/></p>
                                <p className="fs-md fw-4 flh-2 mb-3"><FormattedMessage id="besponsor.desc2"/></p>
                            </div>
                        </Fade>
                    </div>
                    <div class="row vh-70 justify-content-center align-items-center p-0 m-0">
                        <div className={"col-12 col-lg-6 text-left p-0 "+(status=="waiting"?"d-block":"d-none")}>
                            <p className="fs-md fw-4 flh-2"><FormattedMessage id="besponsor.desc3"/></p>
                            <p className="fs-md fw-4 flh-2 f-alternative">{this.state.errors}</p>
                            <div className="spacer-2"></div>
                            <form onSubmit={this.onSubmit} autocomplete="off">
                                <div className="form-group">
                                    <div className={validation.name.isInvalid && 'has-error'}>
                                        <input type="text" className={"form-control form-primary-input "+this.fieldHasValue("name")}
                                               name="name"
                                               placeholder={intl.formatMessage({ id: 'forms.name.placeholder' })}
                                               onChange={this.handleInputChange}
                                        />
                                        <span className="help-block fs-xs">
                                            <FormattedMessage id={validation.name.message}/>
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className={validation.company.isInvalid && 'has-error'}>
                                        <input type="text" className={"form-control form-primary-input "+this.fieldHasValue("company")}
                                               name="company"
                                               placeholder={intl.formatMessage({ id: 'forms.company.placeholder' })}
                                               onChange={this.handleInputChange}
                                        />
                                        <span className="help-block fs-xs">
                                            <FormattedMessage id={validation.company.message}/>
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className={validation.phone.isInvalid && 'has-error'}>
                                        <input type="tel" className={"form-control form-primary-input "+this.fieldHasValue("phone")}
                                               name="phone"
                                               placeholder={intl.formatMessage({ id: 'forms.phone.placeholder' })}
                                               onChange={this.handleInputChange}
                                        />
                                        <span className="help-block fs-xs">
                                            <FormattedMessage id={validation.phone.message}/>
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className={validation.email.isInvalid && 'has-error'}>
                                        <input type="email" className={"form-control form-primary-input "+this.fieldHasValue("email")}
                                               name="email"
                                               placeholder={intl.formatMessage({ id: 'forms.email.placeholder' })}
                                               onChange={this.handleInputChange}
                                        />
                                        <span className="help-block fs-xs">
                                            <FormattedMessage id={validation.email.message}/>
                                        </span>
                                    </div>
                                </div>
                                <input type="submit" value={intl.formatMessage({ id: 'forms.send' })} className="btn btn-dev btn-block fw-7" />
                            </form>
                        </div>
                        <div className={"col-12 col-lg-6 text-left p-0 "+(status=="pending"?"d-block":"d-none")}>
                            <div className="row vh-30 justify-content-center align-items-center p-0 m-0">
                                <div className="col-12 p-0 text-center">
                                    <Fade>
                                        <i className="fas fa-circle-notch fa-spin fa-3x my-3"></i>
                                        <p className="fs-lg fw-4 flh-2 mb-0"><FormattedMessage id="forms.sending"/></p>
                                    </Fade>
                                </div>
                            </div>
                        </div>
                        <div className={"col-12 col-lg-6 text-left p-0 "+(status=="success"?"d-block":"d-none")}>
                            <div className="row vh-30 justify-content-center align-items-center p-0 m-0">
                                <div className="col-12 p-0 text-center">
                                    <Fade>
                                        <i className="fas fa-check fa-3x my-3"></i>
                                        <p className="fs-md fw-4 flh-2 mb-0"><FormattedMessage id="besponsor.sentsuccess"/></p>
                                    </Fade>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 text-left pl-3">
                            <img src="img/sponsors4.png" className="img-fluid p-3"/>
                        </div>
                    </div>
                    <div className="spacer-2"></div>
                    <p className="fs-md fw-4 flh-2 mb-3">
                        <FormattedMessage id="besponsor.desc4"/>
                        <a href="mailto:breakingdev@neeti.tecnico.ulisboa.pt" target="_blank" className="clickable">
                            breakingdev@neeti.tecnico.ulisboa.pt
                        </a>
                    </p>
                    <p className="fs-lg fw-4 flh-2 mb-3"><FormattedMessage id="besponsor.desc5"/></p>
                    <div className="spacer-8"></div>
                </div>
            </div>
        );

    }
}

export default injectIntl(BeSponsor);
