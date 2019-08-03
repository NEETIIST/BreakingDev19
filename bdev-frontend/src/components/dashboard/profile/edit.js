import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import { devProfileInput } from "./formValidation";
import axios from "axios";
import querystring from "query-string";
import Fade from "react-reveal/Fade";
import URL from "../../../utils/requestsURL";
import TagsInput from "../../../utils/TagsInput";


class Edit extends Component {
    constructor(props) {
        super(props);

        let profile = props.profile;
        this.validator = devProfileInput;
        this.state = {
            name: profile.name,
            age: profile.age,
            college: profile.college,
            course: profile.course,
            phone: profile.phone,
            bio: profile.bio,
            food: profile.food,
            skills: profile.skills,
            github: profile.github,
            twitter: profile.twitter,
            linkedin: profile.linkedin,
            needsTeam: profile.needsTeam,
            //
            validation: this.validator.valid(),
            status: "waiting",
            errors: ""
        };

        //console.log(this.props.onSuccess);
        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
        this.editedTags = this.editedTags.bind(this);
        this.toggleNeedsTeam = this.toggleNeedsTeam.bind(this);
    }

    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
    fieldHasValue = field => {return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");};
    editedTags(newTags){ this.setState(state => ({ skills: newTags })); };
    toggleNeedsTeam(answer){ this.setState(state => ({ needsTeam: answer })); }

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
                food: this.state.food,
                skills: this.state.skills,
                needsTeam: this.state.needsTeam,
                github: this.state.github,
                twitter: this.state.twitter,
                linkedin: this.state.linkedin,
            };
            axios
                .put(URL+"/api/devs/me/edit", querystring.stringify(newRequest), {
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
                        <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.edit.desc"/></p>
                        <div className="spacer-2"/>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-12 col-lg-4 p-0">
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
                                <div className="col-7 col-lg-4 offset-lg-1 p-0">
                                    <div className="form-group">
                                        <div className={validation.phone.isInvalid && 'has-error'}>
                                            <input type="tel"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("phone")}
                                                   name="phone"
                                                   placeholder={intl.formatMessage({id: 'forms.phone.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.phone}
                                            />
                                            <span className="help-block fs-xs">
                                                <FormattedMessage id={validation.phone.message}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 col-lg-2 offset-1 p-0">
                                    <div className="form-group">
                                        <div className={validation.age.isInvalid && 'has-error'}>
                                            <input type="number"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("age")}
                                                   name="age"
                                                   placeholder={intl.formatMessage({id: 'forms.age.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.age}
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
                                                   value={this.state.college}
                                            />
                                            <span className="help-block fs-xs">
                                                <FormattedMessage id={validation.college.message}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 offset-lg-1 p-0">
                                    <div className="form-group">
                                        <div className={validation.course.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("course")}
                                                   name="course"
                                                   placeholder={intl.formatMessage({id: 'forms.course.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.course}
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
                                              value={this.state.bio}
                                              rows={"2"}
                                    />
                                            <span className="help-block fs-xs"><FormattedMessage id={validation.bio.message}/></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-12 col-lg-7 p-0 mt-lg-2 mb-1">
                                    <div className={validation.needsTeam.isInvalid && 'has-error'}>
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="forms.needsTeam.helper"/></span>
                                        <div className={"d-inline cp hvr-primary"} onClick={() => this.toggleNeedsTeam(true)}>
                                            <span className="fs-sm fw-4 flh-2 ml-2"><FormattedMessage id="forms.yes"/></span>
                                            <i className={"far fa-fw fa-lg flh-2 ml-1 fa-"+(this.state.needsTeam ? "check-circle":"circle")} />
                                        </div>
                                        <div className={"d-inline cp hvr-primary"} onClick={() => this.toggleNeedsTeam(false)}>
                                            <span className="fs-sm fw-4 flh-2 ml-2"><FormattedMessage id="forms.no"/></span>
                                            <i className={"far fa-fw fa-lg flh-1 ml-1 fa-"+(this.state.needsTeam ? "circle":"times-circle")} />
                                        </div>
                                        <span className="help-block fs-xs"><FormattedMessage id={validation.needsTeam.message}/></span>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-5 p-0">
                                    <div className="form-group">
                                        <div className={validation.food.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("food")}
                                                   name="food"
                                                   placeholder={intl.formatMessage({id: 'forms.food.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.food}
                                            />
                                            <span className="help-block fs-xs"><FormattedMessage id={validation.food.message}/></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-12 col-lg-12 p-0">
                                    <p className="fs-xs fw-4 flh-1 mb-2"><FormattedMessage id="forms.skills.helper"/></p>
                                    <TagsInput {...this.props} data={this.state.skills} update={this.editedTags}/>
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
                                                   value={this.state.github}
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
                                                   value={this.state.linkedin}
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
                                                   value={this.state.twitter}
                                            />
                                            <span className="help-block fs-xs"><FormattedMessage id={validation.twitter.message}/></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-end align-items-start mx-0 my-3">
                                <div className="col-6 col-lg-3 p-0">
                                    <input type="submit"
                                           value={intl.formatMessage({ id: 'forms.edit' })+" "+intl.formatMessage({ id: 'dash.profile.title' })}
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
                            <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="dash.profile.edit.done"/></p>
                        </Fade>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Edit;
