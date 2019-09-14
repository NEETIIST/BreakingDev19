import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import axios from "axios";
import URL from "../../../utils/requestsURL";
import querystring from "query-string";
import { promoCodeInput } from "./formValidation";

class PromoCodes extends Component {
    constructor(props) {
        super(props);

        this.validator = promoCodeInput;
        this.state = {
            promocodes: [],
            loaded: false,
            //
            code: "",
            value: 0,
            teamCode: true,
            //
            validation: this.validator.valid(),
            status: "waiting",
            errors: ""
        };

        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleTeamCode = this.toggleTeamCode.bind(this);
    }

    handleInputChange = event => { event.preventDefault(); this.setState({ [event.target.name]: event.target.value });};
    fieldHasValue = field => {return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");};
    toggleTeamCode(answer){ this.setState(state => ({ teamCode: answer })); }

    componentDidMount() { this.getPromoCodes(); }
    getPromoCodes(){
        axios.get(URL+'/api/promocodes/all', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.setState({ promocodes: response.data, loaded: true }); })
            .catch(function (err){ console.log(err); })
    }

    disableCode(code){
        const { intl } = this.props;
        if ( window.confirm(intl.formatMessage({ id: 'staffdash.promocodes.disable.confirm'}) ))
        axios.put(URL+'/api/promocodes/_'+code+'/disable', {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { console.log(response); this.getPromoCodes() })
            .catch(function (err){ console.log(err); })
    }

    onSubmit(e) {
        e.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
            this.setState({status: "pending"});
            const newRequest = {
                code: this.state.code,
                value: this.state.value,
                teamCode: this.state.teamCode,
            };
            axios
                .post(URL+"/api/promocodes/add", querystring.stringify(newRequest), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                    },
                })
                .then(res => {
                    const codes = this.state.promocodes;
                    codes.push(res.data);
                    this.setState({ promocodes: codes });
                })
                .catch(err => { console.log(err) })
                .then(this.setState({ status: "waiting" }))


        }
    }

    allCodes(){
        const { intl } = this.props;
        if ( this.state.promocodes.length === 0)
            return <div className="card text-center dash-team white">
                <div className="card-body">
                    <span className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.promocodes.empty"/></span>
                </div>
            </div>
        else
            return this.state.promocodes.map((code, index) => {
                const disabled = code.usesRemaining===0;
                return <div className="card text-left dash-team white" key={code.code}>
                    <div className="card-body">
                        <div className="row justify-content-center align-items-center m-0">
                            <div className={"col-10 px-2 f-primary"}>
                                <span className="fs-sm fw-7 flh-1 mb-0">{code.code}</span>
                                <span className="fs-sm fw-4 flh-1 mb-0 ml-2 f-grey">( {code.value}€ )</span>
                            </div>
                            <div className={"col-2 px-2 align-self-end f-light-grey"}>
                                <i className={"fas fa-md mx-2 fa-trash hvr-red cp "+(disabled?"d-none":"")}
                                   title={intl.formatMessage({ id: 'staffdash.promocodes.disable' })}
                                   onClick={()=>this.disableCode(code.code)}/>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-start m-0 pt-0">
                            <div className={"col-12 p-0 px-2 text-left f-dark-grey"}>
                                <p className="fs-xs fw-4 flh-1 mb-1"><FormattedMessage id="staffdash.promocodes.remainingUses" values={{uses: code.usesRemaining}}/></p>
                                <p className={"fs-xxs fw-4 flh-1 mb-0 "+(code.teamUsed===""?"d-none":"")}>
                                    <FormattedMessage id="staffdash.promocodes.claimedTeam" values={{team: code.teamUsed}}/>
                                </p>
                            </div>
                        </div>
                        {/*
                        <hr className={"mt-2 mb-1"} />
                        <div className="row justify-content-center align-items-center m-0 pt-1 f-dark-grey">
                            <div className={"col-12 p-0 px-2 text-left hvr-primary cp"}
                                 onClick={()=>this.chatCaptain(team.captain)}>
                                <i className={"fas fa-md mx-2 fa-comments"}
                                   title={intl.formatMessage({ id: 'dash.team.asktojoin' })} />
                                <span className="fs-sm fw-4 flh-1 mb-0 "><FormattedMessage id="dash.team.find.asktojoin"/></span>
                            </div>
                            <div className={"col-6 p-0 px-2 text-left f-dark-grey"}>
                                <i className={"fas fa-fw fa-md mx-1 mb-2 fa-users"}
                                   title={intl.formatMessage({ id: 'dash.team.members' })} />
                                <span className="fs-sm fw-4 flh-2 mb-0 "><FormattedMessage id="dash.team.join.something"/></span>
                            </div>
                        </div>
                        */}
                    </div>
                </div>
        })
    }

    render() {
        //const overview = this.state.overview;
        const loaded = this.state.loaded;

        let validation = this.submitted ?        // if the form has been submitted at least once
            this.validator.validate(this.state) :   // then check validity every time we render
            this.state.validation;                   // otherwise just use what's in state

        const { intl } = this.props;
        const status = this.state.status;

        return(
            <Fade bottom cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="staffdash.promocodes.title"/></span>
                        <i className="fas fa-fw fa-percentage fa-lg flh-1 ml-2" />
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className="row justify-content-center align-content-start m-0 dash-content">
                    <div className="col-12 p-0">
                        <div className="spacer-4" />
                        {!loaded ?
                            <div className={"row justify-content-center align-content-center vh-40"}>
                                <div className={"col-12 p-0 text-center f-grey"}>
                                    <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                                    <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                                </div>
                            </div>
                        :""}
                        {loaded ?
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <div className={"row justify-content-center align-content-center vh-10 m-0"}>
                                    <div className="col-8 col-lg-3 px-1">
                                        <div className="form-group">
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
                                    </div>
                                    <div className="col-4 col-lg-2 px-1">
                                        <div className="form-group">
                                            <div className={validation.value.isInvalid && 'has-error'}>
                                                <input type="text"
                                                       className={"form-control form-alt-input " + this.fieldHasValue("value")}
                                                       name="value"
                                                       placeholder={intl.formatMessage({id: 'forms.value.placeholder'})}
                                                       onChange={this.handleInputChange}
                                                       value={this.state.value}
                                                />
                                                <span className="help-block fs-xs">
                                                    <FormattedMessage id={validation.value.message}/>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-8 col-lg-4 px-1 f-dark-grey">
                                        <div className={validation.teamCode.isInvalid && 'has-error'}>
                                            <span className="fs-sm fw-4 flh-2"><FormattedMessage id="forms.teamCode.helper"/></span>
                                            <br className={"d-inline d-lg-none"}/>
                                            <div className={"d-inline cp hvr-primary ml-0 ml-lg-2"} onClick={() => this.toggleTeamCode(false)}>
                                                <span className="fs-sm fw-4 flh-2"><FormattedMessage id="forms.yes"/></span>
                                                <i className={"far fa-fw fa-lg flh-2 ml-1 fa-"+(!this.state.teamCode ? "check-circle":"circle")} />
                                            </div>
                                            <div className={"d-inline cp hvr-primary ml-2"} onClick={() => this.toggleTeamCode(true)}>
                                                <span className="fs-sm fw-4 flh-2"><FormattedMessage id="forms.no"/></span>
                                                <i className={"far fa-fw fa-lg flh-1 ml-1 fa-"+(!this.state.teamCode ? "circle":"check-circle")} />
                                            </div>
                                            <span className="help-block fs-xs"><FormattedMessage id={validation.teamCode.message}/></span>
                                        </div>
                                    </div>
                                    <div className={"col-4 col-lg-2"+(status==="waiting"?"":"d-none")}>
                                        <input type="submit"
                                               value={intl.formatMessage({ id: 'forms.add' })}
                                               className="btn btn-dev-alt btn-block fw-7" />
                                    </div>
                                    <div className={"col-2 "+(status==="pending"?"":"d-none")}>
                                        <i className="fas fa-fw fa-circle-notch fa-spin fa-lg" />
                                    </div>
                                </div>
                            </form>
                        :""}
                        {loaded ?
                            <div className={"row justify-content-center align-content-center m-0"}>
                                <div className={"col-12 p-0 text-center f-grey"}>
                                    <hr />
                                    <Fade bottom cascade>
                                        <div className="card-columns promocodes-columns">
                                            {this.allCodes()}
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        :""}
                    </div>
                </div>
            </Fade>
        );

    }
}

export default PromoCodes;
