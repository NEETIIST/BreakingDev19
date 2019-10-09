import React, { Component } from "react";
import {FormattedMessage} from "react-intl";

import { companyEditInput } from "./formValidation";
import axios from "axios";
import querystring from "query-string";
import Fade from "react-reveal/Fade";
import URL from "../../../utils/requestsURL";
import TagsInput from "../../../utils/TagsInput";


class Edit extends Component {
    constructor(props) {
        super(props);

        let company = props.company;
        this.validator = companyEditInput;
        this.state = {
            name: company.name,
            short: company.short,
            job: company.job,
            search: company.search,
            website: company.website,
            email: company.email,
            //
            validation: this.validator.valid(),
            status: "waiting",
            errors: ""
        };

        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
        this.editedTags = this.editedTags.bind(this);
    }

    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
    fieldHasValue = field => {return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");};
    editedTags(newTags){ this.setState(state => ({ skills: newTags })); };

    onSubmit(e) {
        e.preventDefault();

        console.log(this.state);

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
            this.setState({status: "pending"});
            const newRequest = {
                name: this.state.name,
                //short: this.state.short,
                job: this.state.job,
                search: this.state.search,
                website: this.state.website,
                email: this.state.email,
            };
            axios
                .put(URL+"/api/companies/_"+this.props.company.short+"/edit", querystring.stringify(newRequest), {
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

    // TODO: a validação disto está na merda
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
                        <p className="fs-sm fw-4 flh-1 mb-1"><FormattedMessage id="sponsordash.company.edit.desc1"/></p>
                        <p className="fs-xs fw-4 flh-1 mb-2"><FormattedMessage id="sponsordash.company.edit.desc2"/></p>
                        <div className="spacer-2"/>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-12 col-lg-12 p-0">
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
                            </div>
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-12 col-lg-12 p-0">
                                    <div className="form-group">
                                        <div className={validation.job.isInvalid && 'has-error'}>
                                    <textarea type="text"
                                              className={"form-control form-alt-input " + this.fieldHasValue("job")}
                                              name="job"
                                              placeholder={intl.formatMessage({id: 'forms.work.placeholder'})}
                                              onChange={this.handleInputChange}
                                              value={this.state.job}
                                              rows={"2"}
                                    />
                                            <span className="help-block fs-xs"><FormattedMessage id={validation.job.message}/></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-12 col-lg-12 p-0">
                                    <div className="form-group">
                                        <div className={validation.search.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("search")}
                                                   name="search"
                                                   placeholder={intl.formatMessage({id: 'forms.search.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.search}
                                            />
                                            <span className="help-block fs-xs"><FormattedMessage id={validation.search.message}/></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-12 col-lg-6 p-0">
                                    <div className="form-group">
                                        <div className={validation.website.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("website")}
                                                   name="website"
                                                   placeholder={intl.formatMessage({id: 'forms.website_alt.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.website}
                                            />
                                            <span className="help-block fs-xs"><FormattedMessage id={validation.website.message}/></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-5 offset-lg-1 p-0">
                                    <div className="form-group">
                                        <div className={validation.email.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("email")}
                                                   name="email"
                                                   placeholder={intl.formatMessage({id: 'forms.email.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.email}
                                            />
                                            <span className="help-block fs-xs"><FormattedMessage id={validation.email.message}/></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-end align-items-start mx-0 my-3">
                                <div className="col-6 col-lg-3 p-0">
                                    <input type="submit"
                                           value={intl.formatMessage({ id: 'forms.save' })}
                                           className="btn btn-dev-alt btn-block fw-7" />
                                </div>
                            </div>
                        </form>
                        <div className="spacer-2" />
                    </div>
                    <div className={"col-12 text-center p-0 "+(status=="pending"?"d-block":"d-none")}>
                        <Fade>
                            <i className="fas fa-circle-notch fa-spin fa-3x my-3 f-primary" />
                            <p className="fs-md fw-4 flh-2 mb-0"><FormattedMessage id="forms.sending"/></p>
                        </Fade>
                    </div>
                    <div className={"col-12 text-center p-0 "+(status=="success"?"d-block":"d-none")}>
                        <Fade>
                            <i className="fas fa-check fa-3x my-3 f-primary" />
                            <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="staffdash.profile.edit.done"/></p>
                        </Fade>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Edit;
