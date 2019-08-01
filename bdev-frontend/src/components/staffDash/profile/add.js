import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
//import FormValidator from "../../../utils/FormValidator";
import { addForm } from "./formValidation";
import axios from "axios";
import querystring from "query-string";
import Fade from "react-reveal/Fade";


class Add extends Component {
    constructor(props) {
        super(props);

        this.validator = addForm;
        this.state = {
            name:"",
            age:"",
            college:"",
            course:"",
            phone:"",
            bio: "",
            job: "",
            //skills:"",
            github:"",
            twitter:"",
            linkedin:"",
            //
            validation: this.validator.valid(),
            status: "waiting",
            errors: ""
        };

        console.log(this.props.onSuccess);
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
                age: this.state.age,
                college: this.state.college,
                course: this.state.course,
                phone: this.state.phone,
                bio: this.state.bio,
                job: this.state.job,
                //skills: this.state.skills,
                github: this.state.github,
                twitter: this.state.twitter,
                linkedin: this.state.linkedin,
            };
            axios
                .post("http://localhost:4000/api/staff/create", querystring.stringify(newRequest), {
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
            <div className={"row justify-content-center align-items-start m-0"}>
                <div className={"col-12 p-0 text-left f-dark-grey "+(status=="waiting"?"d-block":"d-none")}>
                    <p className="fs-md fw-4 flh-1 mb-1"><FormattedMessage id="staffdash.profile.add.title"/></p>
                    <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.profile.add.desc"/></p>
                    <div className="spacer-2"/>
                    <form onSubmit={this.onSubmit} autoComplete="off">
                    <div className="row justify-content-start align-items-start mx-0 my-1">
                        <div className="col-12 col-lg-8 p-0">
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
                        </div>
                    </div>
                    <div className="row justify-content-start align-items-start mx-0 my-1">
                        <div className="col-7 col-lg-4 p-0">
                            <div className="form-group">
                                <div className={validation.phone.isInvalid && 'has-error'}>
                                    <input type="tel"
                                           className={"form-control form-alt-input " + this.fieldHasValue("phone")}
                                           name="phone"
                                           placeholder={intl.formatMessage({id: 'forms.phone.placeholder'})}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="help-block fs-xs">
                                        <FormattedMessage id={validation.phone.message}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-lg-3 offset-1 p-0">
                            <div className="form-group">
                                <div className={validation.age.isInvalid && 'has-error'}>
                                    <input type="number"
                                           className={"form-control form-alt-input " + this.fieldHasValue("age")}
                                           name="age"
                                           placeholder={intl.formatMessage({id: 'forms.age.placeholder'})}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="help-block fs-xs">
                                        <FormattedMessage id={validation.age.message}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-start align-items-start mx-0 my-1">
                        <div className="col-12 col-lg-5 p-0">
                            <div className="form-group">
                                <div className={validation.college.isInvalid && 'has-error'}>
                                    <input type="text"
                                           className={"form-control form-alt-input " + this.fieldHasValue("college")}
                                           name="college"
                                           placeholder={intl.formatMessage({id: 'forms.college.placeholder'})}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="help-block fs-xs">
                                    <FormattedMessage id={validation.college.message}/>
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 offset-lg-1 p-0">
                            <div className="form-group">
                                <div className={validation.course.isInvalid && 'has-error'}>
                                    <input type="text"
                                           className={"form-control form-alt-input " + this.fieldHasValue("course")}
                                           name="course"
                                           placeholder={intl.formatMessage({id: 'forms.course.placeholder'})}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="help-block fs-xs">
                                    <FormattedMessage id={validation.course.message}/>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-start align-items-start mx-0 my-1">
                        <div className="col-12 col-lg-12 p-0">
                            <div className="form-group">
                                <div className={validation.bio.isInvalid && 'has-error'}>
                                    <textarea type="text"
                                           className={"form-control form-alt-input " + this.fieldHasValue("bio")}
                                           name="bio"
                                           placeholder={intl.formatMessage({id: 'forms.bio.placeholder'})}
                                           onChange={this.handleInputChange}
                                           rows={"2"}
                                    />
                                    <span className="help-block fs-xs"><FormattedMessage id={validation.bio.message}/></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-start align-items-start mx-0 my-1">
                        <div className="col-12 col-lg-12 p-0">
                            <div className="form-group">
                                <div className={validation.job.isInvalid && 'has-error'}>
                                <input type="text"
                                       className={"form-control form-alt-input " + this.fieldHasValue("job")}
                                       name="job"
                                       placeholder={intl.formatMessage({id: 'forms.job.placeholder'})}
                                       onChange={this.handleInputChange}
                                />
                                    <span className="help-block fs-xs"><FormattedMessage id={validation.job.message}/></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-start align-items-start mx-0 my-1">
                        <div className="col-12 px-1">
                            <p className="fs-xs fw-4 flh-1 mb-2"><FormattedMessage id="forms.usernames.helper"/></p>
                        </div>
                        <div className="col-8 col-lg px-0 px-lg-2">
                            <div className="form-group">
                                <div className={validation.github.isInvalid && 'has-error'}>
                                    <input type="text"
                                           className={"form-control form-alt-input " + this.fieldHasValue("github")}
                                           name="github"
                                           placeholder={intl.formatMessage({id: 'forms.github.placeholder'})}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="help-block fs-xs"><FormattedMessage id={validation.github.message}/></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 col-lg px-0 px-lg-2">
                            <div className="form-group">
                                <div className={validation.linkedin.isInvalid && 'has-error'}>
                                    <input type="text"
                                           className={"form-control form-alt-input " + this.fieldHasValue("linkedin")}
                                           name="linkedin"
                                           placeholder={intl.formatMessage({id: 'forms.linkedin.placeholder'})}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="help-block fs-xs"><FormattedMessage id={validation.linkedin.message}/></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 col-lg px-0 px-lg-2">
                            <div className="form-group">
                                <div className={validation.twitter.isInvalid && 'has-error'}>
                                    <input type="text"
                                           className={"form-control form-alt-input " + this.fieldHasValue("twitter")}
                                           name="twitter"
                                           placeholder={intl.formatMessage({id: 'forms.twitter.placeholder'})}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="help-block fs-xs"><FormattedMessage id={validation.twitter.message}/></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end align-items-start mx-0 my-3">
                        <div className="col-6 col-lg-3 p-0">
                            <input type="submit"
                                   value={intl.formatMessage({ id: 'forms.add' })+" "+intl.formatMessage({ id: 'staffdash.profile.title' })}
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
                        <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="staffdash.profile.add.done"/></p>
                    </Fade>
                </div>
            </div>
        );

    }
}

export default Add;
