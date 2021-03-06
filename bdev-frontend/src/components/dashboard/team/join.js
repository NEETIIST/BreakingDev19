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
            team: {members:[], skills:[]},
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

    componentDidMount(){
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
                console.log(err);
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

    allSkills(data) {
        return (
            data.map((tag, index) => {
                return(
                    <div className="tag px-2 py-0 mr-2 mb-1">
                        <p key={index} className="fs-xs fw-4 my-1 px-1">{tag}</p>
                    </div>
                )
            })
        );
    };

    render() {
        let validation = this.submitted ?        // if the form has been submitted at least once
            this.validator.validate(this.state) :   // then check validity every time we render
            this.state.validation;                   // otherwise just use what's in state

        const { intl } = this.props;
        const status = this.state.status;
        const team = this.state.team;
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
                            <div className="row justify-content-center align-items-center m-0">
                                <div className="col-12 col-lg-6 text-center p-0">
                                <div className="card text-left dash-team white">
                                <div className="card-body">
                                    <div className="row justify-content-center align-items-center m-0">
                                        <div className={"col-3 p-0 p-0 pr-2 text-left"}>
                                            <img src={"/icons/WebAlt.png"} className={"img-fluid "+(team.category==="Web"?"":"d-none")}/>
                                            <img src={"/icons/JogosAlt.png"} className={"img-fluid "+(team.category==="Games"?"":"d-none")}/>
                                        </div>
                                        <div className={"col-9 p-0 px-1 text-left f-dark-grey"}>
                                            <span className="fs-md fw-7 flh-2 mb-0 f-primary">{team.team_name}</span>
                                            <span className="fs-md fw-4 ml-2">
                                                <i className={"fas fa-fw fa-sm mx-1 mb-2 fa-users"}
                                                   title={intl.formatMessage({ id: 'dash.team.members' })} />
                                                   {team.members.length+1}
                                            </span>
                                            <div className="row justify-content-center align-items-center m-0 mt-1">
                                                <div className="col-12 p-0 text-left no-scrollbar" style={{whiteSpace:"nowrap", overflowX: "scroll"}}>
                                                    {this.allSkills(team.skills)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-start m-0 pt-1">
                                        <div className={"col-12 p-0 px-2 text-left f-dark-grey"}>
                                            <p className="fs-sm fw-7 flh-1 mb-1 ">{team.proj_name}</p>
                                            <p className="fs-xs fw-4 flh-2 mb-0 ">{team.proj_desc}</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div className={"col-12 col-lg-6 text-center p-0"}>
                                    <p className="fs-md fw-4 flh-1 mb-2"><FormattedMessage id="dash.team.join.areyousure"/></p>
                                    <div className="row justify-content-center align-items-start m-0">
                                        <div className={"col-8 text-center p-0 py-2"} onClick={this.joinTeam}>
                                            <button className="btn btn-dev-alt btn-block fw-7">
                                                <i className="fas fa-check fa-md mr-2" />
                                                <span className="fs-sm fw-7 flh-1 mb-0 p-1"><FormattedMessage id="dash.team.join.confirm"/></span>
                                            </button>
                                        </div>
                                        <div className={"col-8 text-center p-0 py-2"}>
                                            <button className="btn btn-dev-alt btn-block fw-7" onClick={this.repeatInput}>
                                                <i className="fas fa-redo fa-md mr-2" />
                                                <span className="fs-sm fw-7 flh-1 mb-0 p-1"><FormattedMessage id="dash.team.join.cancel"/></span>
                                            </button>
                                        </div>
                                    </div>
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
