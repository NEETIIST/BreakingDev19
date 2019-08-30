import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import { teamInput } from "./formValidation";
import axios from "axios";
import querystring from "query-string";
import Fade from "react-reveal/Fade";
import URL from "../../../utils/requestsURL";
import TagsInput from "../../../utils/TagsInput";


class Edit extends Component {
    constructor(props) {
        super(props);

        let team = props.team;
        this.validator = teamInput;
        this.state = {
            team_name: team.team_name,
            category: team.category,
            proj_name: team.proj_name,
            proj_desc: team.proj_desc,
            wants_members: team.wants_members,
            skills: team.skills,
            website: team.website,
            //
            validation: this.validator.valid(),
            status: "waiting",
            errors: ""
        };

        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
        this.editedTags = this.editedTags.bind(this);
        this.toggleWantsMembers = this.toggleWantsMembers.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
    }

    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
    fieldHasValue = field => {return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");};
    editedTags(newTags){ this.setState(state => ({ skills: newTags })); };
    toggleWantsMembers(answer){ this.setState(state => ({ wants_members: answer })); }
    toggleCategory(answer){ this.setState(state => ({ category: answer })); }

    onSubmit(e) {
        e.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
            this.setState({status: "pending"});
            const newRequest = {
                team_name: this.state.team_name,
                category: this.state.category,
                proj_name: this.state.proj_name,
                proj_desc: this.state.proj_desc,
                wants_members: this.state.wants_members,
                skills: this.state.skills,
                website: this.state.website,
            };
            axios
                .put(URL+"/api/teams/own/edit", querystring.stringify(newRequest), {
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

        let requested = this.props.team.validated || this.props.team.pending ;

        return(
            <Fade right cascade>
                <div className={"row justify-content-center align-items-start m-0"}>
                    <div className={"col-12 p-0 text-left f-dark-grey no-scrollbar "+(status==="waiting"?"d-block":"d-none")} >
                        <p className="fs-sm fw-4 flh-1 mb-3"><FormattedMessage id="dash.team.edit.desc"/></p>
                        <div className={"alert alert-warning p-2 "+(this.props.team.pending?"d-inline-flex":"d-none")}>
                            <i className="fas fa-fw fa-exclamation-triangle fa-md flh-1 mx-1"/>
                            <span className="fs-sm fw-4 flh-1 f-grey mx-1"><FormattedMessage id="dash.team.edit.pending"/></span>
                        </div>
                        <div className={"alert alert-success p-2 "+(this.props.team.validated?"d-inline-flex":"d-none")}>
                            <i className="fas fa-fw fa-user-check fa-md flh-1 mx-1"/>
                            <span className="fs-sm fw-4 flh-1 f-grey mx-1"><FormattedMessage id="dash.team.edit.validated"/></span>
                        </div>
                        <div className={"spacer-2 "+(this.props.team.pending || this.props.team.validated ?"d-block":"d-none")} />
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <div className={"row justify-content-start align-items-start mx-0 my-1 "+(requested?"d-none":"")}>
                                <div className="col-12 col-lg-4 p-0">
                                    <div className="form-group">
                                        <div className={validation.team_name.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("team_name")}
                                                   name="team_name"
                                                   placeholder={intl.formatMessage({id: 'forms.team_name.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.team_name}
                                            />
                                            <span className="help-block fs-xs">
                                                <FormattedMessage id={validation.team_name.message}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-7 offset-lg-1 p-0 mt-lg-2 mb-1 ">
                                    <div className="form-group">
                                        <div className={validation.category.isInvalid && 'has-error'}>
                                            <span className="fs-sm fw-4 flh-2"><FormattedMessage id="forms.category.helper"/></span>
                                            <br className={"d-inline d-lg-none"}/>
                                            <div className={"d-inline cp hvr-primary ml-0 ml-lg-2"} onClick={() => this.toggleCategory("Web")}>
                                                <span className="fs-sm fw-4 flh-2"><FormattedMessage id="dash.team.web"/></span>
                                                <i className={"far fa-fw fa-lg flh-2 ml-1 fa-"+(this.state.category==="Web" ? "check-circle":"circle")} />
                                            </div>
                                            <div className={"d-inline cp hvr-primary ml-2"} onClick={() => this.toggleCategory("Games")}>
                                                <span className="fs-sm fw-4 flh-2"><FormattedMessage id="dash.team.games"/></span>
                                                <i className={"far fa-fw fa-lg flh-2 ml-1 fa-"+(this.state.category==="Games" ? "check-circle":"circle")} />
                                            </div>
                                            <span className="help-block fs-xs"><FormattedMessage id={validation.category.message}/></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-12 col-lg-6 p-0">
                                    <div className={"form-group"}>
                                        <div className={validation.proj_name.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("proj_name") + (requested?" cna":"")}
                                                   name="proj_name"
                                                   placeholder={intl.formatMessage({id: 'forms.proj_name.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.proj_name}
                                                   disabled={requested}
                                            />
                                            <span className="help-block fs-xs">
                                                <FormattedMessage id={validation.proj_name.message}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-5 offset-lg-1 p-0">
                                    <div className="form-group">
                                        <div className={validation.website.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("website")}
                                                   name="website"
                                                   placeholder={intl.formatMessage({id: 'forms.website.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.website}
                                            />
                                            <span className="help-block fs-xs"><FormattedMessage id={validation.website.message}/></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-12 col-lg-12 p-0">
                                    <div className="form-group">
                                        <div className={validation.proj_desc.isInvalid && 'has-error'}>
                                            <textarea type="text"
                                                      className={"form-control form-alt-input " + this.fieldHasValue("proj_desc")}
                                                      name="proj_desc"
                                                      placeholder={intl.formatMessage({id: 'forms.proj_desc.placeholder'})}
                                                      onChange={this.handleInputChange}
                                                      rows={"2"}
                                                      value={this.state.proj_desc}
                                            />
                                            <span className="help-block fs-xs">
                                                <FormattedMessage id={validation.proj_desc.message}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-12 col-lg-12 p-0">
                                    <p className="fs-xs fw-4 flh-1 mb-2"><FormattedMessage id="dash.team.skills.helper"/></p>
                                    <TagsInput {...this.props} data={this.state.skills} update={this.editedTags}/>
                                </div>
                            </div>
                            <div className={"row justify-content-start align-items-start mx-0 my-1 "+(requested?"d-none":"")}>
                                <div className="col-12 col-lg-12 p-0">
                                    <div className={validation.wants_members.isInvalid && 'has-error'}>
                                        <span className="fs-sm fw-4 flh-2"><FormattedMessage id="forms.wants_members.helper"/></span>
                                        <br className={"d-inline d-lg-none"}/>
                                        <div className={"d-inline cp hvr-primary ml-0 ml-lg-2"} onClick={() => this.toggleWantsMembers(true)}>
                                            <span className="fs-sm fw-4 flh-2"><FormattedMessage id="forms.yes"/></span>
                                            <i className={"far fa-fw fa-lg flh-2 ml-1 fa-"+(this.state.wants_members===true ? "check-circle":"circle")} />
                                        </div>
                                        <div className={"d-inline cp hvr-primary ml-2"} onClick={() => this.toggleWantsMembers(false)}>
                                            <span className="fs-sm fw-4 flh-2"><FormattedMessage id="forms.no"/></span>
                                            <i className={"far fa-fw fa-lg flh-2 ml-1 fa-"+(this.state.wants_members===false ? "times-circle":"circle")} />
                                        </div>
                                        <span className="help-block fs-xs"><FormattedMessage id={validation.wants_members.message}/></span>
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
                    </div>
                    <div className={"col-12 text-center p-0 "+(status==="pending"?"d-block":"d-none")}>
                        <Fade>
                            <i className="fas fa-circle-notch fa-spin fa-3x my-3 f-primary"></i>
                            <p className="fs-md fw-4 flh-2 mb-0"><FormattedMessage id="forms.sending"/></p>
                        </Fade>
                    </div>
                    <div className={"col-12 text-center p-0 "+(status==="success"?"d-block":"d-none")}>
                        <Fade>
                            <i className="fas fa-check fa-3x my-3 f-primary"></i>
                            <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="dash.team.edit.done"/></p>
                        </Fade>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Edit;
