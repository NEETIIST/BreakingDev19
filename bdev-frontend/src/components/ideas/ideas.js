import React, { Component } from "react";
import ReactDOM from 'react-dom'
import Fade from 'react-reveal/Fade';
import {FormattedMessage, injectIntl} from "react-intl";

import axios from "axios";
import querystring from "query-string";

import FormValidator from "../../utils/FormValidator";

class Ideas extends Component {
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
            },
            {
                field: "title",
                method: "isEmpty",
                validWhen: false,
                message: "forms.title.empty"
            },
            {
                field: "title",
                method: "isLength",
                args: [{min:0, max: 128}],
                validWhen: true,
                message: "forms.title.toolong"
            },
            {
                field: "description",
                method: "isEmpty",
                validWhen: false,
                message: "forms.description.empty"
            },
            {
                field: "description",
                method: "isLength",
                args: [{min:0, max: 256}],
                validWhen: true,
                message: "forms.description.toolong"
            },
        ]);

        this.state = {
            info:0,
            ideas: [],
            name:"",
            email:"",
            title:"",
            description:"",
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
    };

    fieldHasValue = field => {
        return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");
    };

    onSubmit(e) {
        e.preventDefault();

        const validation = this.validator.validate(this.state);


        this.setState({ validation });
        this.submitted = true;

        //  console.log(validation.isValid);

        if (validation.isValid) {
            this.setState({
                status: "pending",
            });
            const newRequest = {
                name: this.state.name,
                email: this.state.email,
                title: this.state.title,
                description: this.state.description
            };
            axios
                .post("http://localhost:4000/api/ideas/add", querystring.stringify(newRequest), {
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
        }
    }

    changeInfo = (number) => {
        this.setState({info: number})

        if ( number == 0 ){
            axios.get('http://localhost:4000/api/ideas/public')
                .then(response => {
                    this.setState({ ideas: response.data });
                })
                .catch(function (error){
                    console.log(error);
                })
        }
    };

    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollIntoView();

        axios.get('http://localhost:4000/api/ideas/public')
            .then(response => {
                this.setState({ ideas: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    ideasList() {
        return this.state.ideas.map((idea, index) => {
            return <div className="card text-left question">
                <div className="card-body">
                    <p className="fs-md fw-7 flh-2 mb-1">
                        {idea.title}
                        <span className="fs-sm fw-4 f-light-grey ml-2">#{idea.number}</span>
                    </p>
                    <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey">{idea.description}</p>
                    <p className="fs-xxs fw-2 flh-2 mb-0 f-grey text-right">
                        <FormattedMessage id="ideas.origin" values={{
                            name: idea.name,
                            //date: idea.date
                        }}/>
                    </p>
                </div>
            </div>
        })
    }

    render() {
        let validation =    this.submitted ?        // if the form has been submitted at least once
            this.validator.validate(this.state) :   // then check validity every time we render
            this.state.validation                   // otherwise just use what's in state

        const { intl } = this.props;
        const info = this.state.info;
        const status = this.state.status;

        return(
            <div className="row justify-content-center align-items-center p-0 m-0">
                <div className="col-11 col-lg-10 p-0">
                    <div className="row vh-30 justify-content-center align-items-center p-0 m-0 f-primary">
                        <div className="col-12 col-lg-8 p-0 pr-3 text-left">
                            <div className="spacer-8"></div>
                            <p className="fs-xl fw-7 flh-2 mb-0"><FormattedMessage id="ideas.title"/></p>
                            <div className="spacer-2"></div>
                            <p className="fs-sm fw-4 flh-2 mb-2"><FormattedMessage id="ideas.desc1"/></p>
                            <p className="fs-sm fw-4 flh-2 mb-3"><FormattedMessage id="ideas.desc2"/></p>
                            <div className="spacer-2 d-none d-lg-block"></div>
                        </div>
                        <div className="col-12 col-lg-4 p-0 text-center">
                            <div className="spacer-4 d-none d-lg-block"></div>
                            <div className="row justify-content-center align-items-center p-0 m-0">
                                <div className="col-6 col-lg-12 p-0 text-center f-dark-grey">
                                    <div className={"row justify-content-center align-items-center p-2 mx-2 my-2 cp faq-opt " +(info === 0 ? "faq-opt-active":"")}
                                         onClick={() => this.changeInfo(0)}>
                                        <div className="col-3 p-0 text-center">
                                            <i className="far fa-lightbulb fa-lg fa-fw"></i>
                                        </div>
                                        <div className="col-9 px-1 p-lg-0 text-left">
                                            <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="ideas.opt0"/></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-12 p-0 text-center f-dark-grey">
                                    <div className={"row justify-content-center align-items-center p-2 mx-2 my-2 cp faq-opt " +(info === 1 ? "faq-opt-active":"")}
                                         onClick={() => this.changeInfo(1)}>
                                        <div className="col-3 p-0 text-center">
                                            <i className="fas fa-bullhorn fa-lg fa-fw"></i>
                                        </div>
                                        <div className="col-9 px-1 p-lg-0 text-left">
                                            <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="ideas.opt1"/></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="spacer-2 d-lg-none"></div>
                        </div>
                    </div>
                    <hr className="m-0 mb-3 f-secondary secondary" style={{height:2}}/>
                    <div className="row justify-content-center align-items-center p-0 m-0 white f-dark-grey">
                        <div className="col-12 p-0">
                            <div className={"row vh-30 justify-content-center align-items-start px-0 py-3 mx-0 my-2 "+(info==0 ? "d-flex":"d-none")}>
                                <div className="col-12 text-center p-0 faqs-cards">
                                    <Fade bottom cascade>
                                        <div className="card-columns">
                                            { this.ideasList() }
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                            <div className={"row vh-30 justify-content-center align-items-start px-0 py-2 mx-0 my-1 "+(info==1 ? "d-flex":"d-none")}>
                                <Fade bottom cascade>
                                    <div className="col-12 col-lg-8 text-justify p-0 pr-3">
                                        <p className="fs-sm fw-4 flh-2 mb-3 mr-3"><FormattedMessage id="ideas.desc3"/></p>
                                        <p className="fs-sm fw-4 flh-2 mb-3 mr-3"><FormattedMessage id="ideas.desc4"/></p>
                                        <p className="fs-sm fw-4 flh-2 mb-3 mr-3"><FormattedMessage id="ideas.desc5"/></p>
                                        <p className="fs-sm fw-4 flh-2 mb-3 mr-3"><FormattedMessage id="ideas.desc6"/></p>
                                        <p className="fs-sm fw-4 flh-2 mb-3 mr-3"><FormattedMessage id="ideas.desc7"/></p>
                                        <hr/>
                                        <p className="fs-xxxs fw-4 flh-2 mb-3 mr-3"><FormattedMessage id="ideas.desc8"/></p>
                                    </div>
                                    <div className={"col-12 col-lg-4 text-left p-0 "+(status=="waiting"?"d-block":"d-none")}>
                                        <form onSubmit={this.onSubmit} autoComplete="off">
                                            <div className="form-group">
                                                <div className={validation.name.isInvalid && 'has-error'}>
                                                    <input type="text"
                                                           className={"form-control form-alt-input " + this.fieldHasValue("name")}
                                                           name="name"
                                                           placeholder={intl.formatMessage({id: 'forms.name.placeholder'})}
                                                           onChange={this.handleInputChange}
                                                    />
                                                    <span className="help-block fs-xs">
                                                        <FormattedMessage id={validation.name.message}/>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className={validation.email.isInvalid && 'has-error'}>
                                                    <input type="text"
                                                           className={"form-control form-alt-input " + this.fieldHasValue("email")}
                                                           name="email"
                                                           placeholder={intl.formatMessage({id: 'forms.email.placeholder'})}
                                                           onChange={this.handleInputChange}
                                                    />
                                                    <span className="help-block fs-xs">
                                                        <FormattedMessage id={validation.email.message}/>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className={validation.title.isInvalid && 'has-error'}>
                                                    <input type="text"
                                                           className={"form-control form-alt-input " + this.fieldHasValue("title")}
                                                           name="title"
                                                           placeholder={intl.formatMessage({id: 'forms.title.placeholder'})}
                                                           onChange={this.handleInputChange}
                                                    />
                                                    <span className="help-block fs-xs">
                                                        <FormattedMessage id={validation.title.message}/>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className={validation.description.isInvalid && 'has-error'}>
                                                    <textarea type="text"
                                                              className={"form-control form-alt-input " + this.fieldHasValue("description")}
                                                              rows="5"
                                                              name="description"
                                                              placeholder={intl.formatMessage({id: 'forms.description.placeholder'})}
                                                              onChange={this.handleInputChange}
                                                    />
                                                    <span className="help-block fs-xs">
                                                        <FormattedMessage id={validation.description.message}/>
                                                    </span>
                                                </div>
                                            </div>
                                            <input type="submit" value={intl.formatMessage({ id: 'forms.send' })} className="btn btn-dev-alt btn-block fw-7" />
                                        </form>
                                    </div>
                                    <div className={"col-12 col-lg-4 text-left p-0 "+(status=="pending"?"d-block":"d-none")}>
                                        <div className="row vh-30 justify-content-center align-items-center p-0 m-0">
                                            <div className="col-10 p-0 text-center">
                                                <Fade>
                                                    <i className="fas fa-circle-notch fa-spin fa-3x my-3 f-primary"></i>
                                                    <p className="fs-md fw-4 flh-2 mb-0"><FormattedMessage id="forms.sending"/></p>
                                                </Fade>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"col-12 col-lg-4 text-left p-0 "+(status=="success"?"d-block":"d-none")}>
                                        <div className="row vh-30 justify-content-center align-items-center p-0 m-0">
                                            <div className="col-10 p-0 text-center">
                                                <Fade>
                                                    <i className="fas fa-check fa-3x my-3 f-primary"></i>
                                                    <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="ideas.sentsuccess"/></p>
                                                </Fade>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(Ideas);
