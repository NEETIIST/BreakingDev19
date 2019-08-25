import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";
import axios from "axios";
import querystring from "query-string";

import {passwordInput} from "./formValidation";

class Join extends Component {
    constructor(props) {
        super(props);

        this.validator = passwordInput;
        this.state = {
            team: "",
            password: "",
            //
            validation: this.validator.valid(),
            status: "waiting",
            errors: "",
            reply: " ",
        }

        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
        this.joinTeam = this.joinTeam.bind(this);
        this.repeatInput = this.repeatInput.bind(this);

    }

    componentWillMount(){
        if ( this.props.query !== undefined )
            this.state.password = this.props.query;
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
            const team = this.state.password.split("-")[0];
            axios
                .get(URL+"/api/teams/_"+team, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                    },
                })
                .then(res => {
                    if (res.status === 200)
                    {
                        this.setState({ status: "results", team: res.data, reply:" " });
                        //this.props.onSuccess(res.data);
                    }
                })
                .catch(err => {
                    if ( err.response.status === 500 )
                        this.setState({ status: "waiting", reply:"dash.team.join.badcode" });
                    else if ( err.response.status === 404 )
                        this.setState({ status: "waiting", reply:"dash.team.join.noteam" });
                    else
                        this.setState({ status: "waiting", reply:"dash.team.join.badsomething" });
                });
        }
    }

    joinTeam(){
        const team = this.state.password.split("-")[0];
        const pass = this.state.password.split("-")[1];
        const request = { password: pass}
        axios
            .put(URL+"/api/teams/_"+team+"/join", querystring.stringify(request), {
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
                console.log(err.response);
                if ( err.response.data === "Team is already full" )
                    this.setState({ status: "results", reply:"dash.team.join.full" });
                else if ( err.response.data === "Team is already Validated" )
                    this.setState({ status: "results", reply:"dash.team.join.validated" });
                else if ( err.response.data === "Wrong Password" )
                    this.setState({ status: "results", reply:"dash.team.join.wrongpassword" });
                else
                    this.setState({ status: "results", reply:"dash.team.join.badsomething" });
            });
    }

    repeatInput(){
        this.setState({ status: "waiting", reply:" ", password: "" });
    }

    render() {
        let validation = this.submitted ?        // if the form has been submitted at least once
            this.validator.validate(this.state) :   // then check validity every time we render
            this.state.validation;                   // otherwise just use what's in state

        const { intl } = this.props;
        const status = this.state.status;
        let team = this.state.team;
        const reply = this.state.reply;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-items-start m-0">
                    <div className={"col-12 p-0 text-left f-dark-grey "+(status==="waiting"?"d-block":"d-none")}>
                        <p className="fs-md fw-4 flh-2 mb-1"><FormattedMessage id="dash.team.join.desc1"/></p>
                        <p className="fs-xs fw-4 flh-1 mb-0"><FormattedMessage id="dash.team.join.desc2"/></p>
                        <div className="spacer-2"/>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <div className={"row justify-content-start align-items-start mx-0 my-1 "+(reply===" "?"d-none":"")}>
                                <div className="col-12 col-lg-10 p-0">
                                    <div className="alert alert-danger" role="alert">
                                        {intl.formatMessage({id: reply})}
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-start align-items-start mx-0 my-1">
                                <div className="col-6 col-lg-5 p-0">
                                    <div className="form-group">
                                        <div className={validation.password.isInvalid && 'has-error'}>
                                            <input type="password"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("password")}
                                                   name="password"
                                                   placeholder={intl.formatMessage({id: 'forms.access_code.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.password}
                                            />
                                            <span className="help-block fs-xs">
                                                <FormattedMessage id={validation.password.message}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 offset-2 col-lg-3 p-0">
                                    <input type="submit"
                                           value={intl.formatMessage({ id: 'dash.team.join.try' })}
                                           className="btn btn-dev-alt btn-block fw-7" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={"col-12 text-center p-0 "+((status==="results"&&team!=="")?"":"d-none")}>
                        <Fade>
                            <div className={"row justify-content-start align-items-start mx-0 my-1 "+(reply===" "?"d-none":"")}>
                                <div className="col-12 col-lg-8 offset-lg-2 p-0">
                                    <div className="alert alert-danger" role="alert">
                                        {intl.formatMessage({id: reply})}
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center align-items-start m-0">
                                <div className={"col-12 text-center p-0"}>
                                    <p>{team.team_name}</p>
                                </div>
                            </div>
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.team.join.areyousure"/></p>
                            <div className="row justify-content-center align-items-start m-0">
                                <div className={"col-5 col-lg-4 text-center p-0"} onClick={this.joinTeam}>
                                    <button className="btn btn-dev-alt btn-block fw-7">
                                        <p className="fs-sm fw-7 flh-1 mb-0"><FormattedMessage id="dash.team.join.confirm"/></p>
                                    </button>
                                </div>
                                <div className={"col-5 col-lg-4 offset-1 text-center p-0"}>
                                    <button className="btn btn-dev-alt btn-block fw-7" onClick={this.repeatInput}>
                                        <p className="fs-sm fw-7 flh-1 mb-0"><FormattedMessage id="dash.team.join.cancel"/></p>
                                    </button>
                                </div>
                            </div>

                        </Fade>
                    </div>
                    <div className={"col-12 text-center p-0 "+(status==="pending"?"":"d-none")}>
                        <Fade>
                            <i className="fas fa-circle-notch fa-spin fa-3x my-3 f-primary" />
                            <p className="fs-md fw-4 flh-2 mb-0"><FormattedMessage id="forms.sending"/></p>
                        </Fade>
                    </div>
                    <div className={"col-12 text-center p-0 "+(status==="success"?"":"d-none")}>
                        <Fade>
                            <i className="fas fa-check fa-3x my-3 f-primary" />
                            <p className="fs-md fw-4 flh-2 mb-0"><FormattedMessage id="dash.team.join.success"/></p>
                        </Fade>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Join;
