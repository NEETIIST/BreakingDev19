import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import axios from "axios";
import URL from "../../../utils/requestsURL";
import querystring from "query-string";
import {ticketInput} from "./formValidation";

class Tickets extends Component {
    constructor(props) {
        super(props);

        this.validator = ticketInput;
        this.state = {
            tickets: [],
            loaded: false,
            //
            username: "",
            raffle: "",
            description:"",
            //
            validation: this.validator.valid(),
            status: "waiting",
            errors: ""
        };

        this.submitted = false;
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange = event => { event.preventDefault(); this.setState({ [event.target.name]: event.target.value });};
    handleRaffleChange = event => { event.preventDefault(); this.setState({raffle: event.target.value}); }
    fieldHasValue = field => {return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");};

    componentDidMount() { this.getTickets(); }
    getTickets(){
        axios.get(URL+'/api/tickets/all', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.setState({ tickets: response.data, loaded: true }); })
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
                username: this.state.username,
                raffle: this.state.raffle,
                description: this.state.description,
            };
            axios
                .post(URL+"/api/tickets/add", querystring.stringify(newRequest), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                    },
                })
                .then(res => {
                    //console.log(res);
                    const tickets = this.state.tickets;
                    tickets.push(res.data);
                    this.setState({ tickets: tickets });
                })
                .catch(err => { console.log(err.response);alert(err.response.data) })
                .then(this.setState({ status: "waiting", username:"",raffle:"",description:"" }))


        }
        this.submitted = false;
    }

    allCodes(){
        const { intl } = this.props;
        let condition;
        if ( this.state.raffle === "") condition = (ticket) => { return(ticket) };
        else if ( this.state.raffle === "job_fair") condition = (ticket) => { return( ticket.raffle==="job_fair"? ticket : null) };
        else if ( this.state.raffle === "event_award") condition = (ticket) => { return( ticket.raffle==="event_award"? ticket : null) };
        else if ( this.state.raffle === "volunteer_raffle") condition = (ticket) => { return( ticket.raffle==="volunteer_raffle"? ticket : null) };
        let filteredTickets = this.state.tickets.filter(condition);
        if ( filteredTickets.length === 0)
            return <div className="card text-center dash-team white">
                <div className="card-body">
                    <span className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.tickets.empty"/></span>
                </div>
            </div>
        else
            return filteredTickets.map((ticket, index) => {
                return <div className="card text-left dash-team white" key={ticket.identifier}>
                    <div className="card-body">
                        <div className="row justify-content-center align-items-center m-0">
                            <div className={"col-12 px-2 f-primary"}>
                                <span className="fs-sm fw-7 flh-1 mb-0">#{index} - </span>
                                <span className={"fs-sm fw-7 flh-1 mb-0 ml-0 "+(ticket.raffle==="event_award"?"":"d-none")}>
                                    <FormattedMessage id="staffdash.tickets.event_award"/>
                                </span>
                                <span className={"fs-sm fw-7 flh-1 mb-0 ml-0 "+(ticket.raffle==="job_fair"?"":"d-none")}>
                                    <FormattedMessage id="staffdash.tickets.job_fair"/>
                                </span>
                                <span className={"fs-sm fw-7 flh-1 mb-0 ml-0 "+(ticket.raffle==="volunteer_raffle"?"":"d-none")}>
                                    <FormattedMessage id="staffdash.tickets.volunteer_raffle"/>
                                </span>
                                <span className="fs-xxs fw-4 flh-1 mb-0 ml-2 f-light-grey">({ticket.identifier})</span>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-start m-0 pt-1">
                            <div className={"col-12 p-0 px-2 text-left f-dark-grey"}>
                                <p className="fs-xs fw-4 flh-1 mb-1">@{ticket.username}</p>
                                <p className="fs-xs fw-4 flh-1 mb-1">{ticket.description}</p>
                            </div>
                        </div>
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
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="staffdash.tickets.title"/></span>
                        <i className="fas fa-fw fa-ticket-alt fa-lg flh-1 ml-2" />
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
                                    <div className="col-6 col-lg-2 px-2">
                                        <div className="form-group">
                                            <div className={validation.raffle.isInvalid && 'has-error'}>
                                                <select
                                                    value={this.state.raffle}
                                                    name="value"
                                                    className="form-control form-control-sm"
                                                    onChange={this.handleRaffleChange}>
                                                    <option disabled value="">
                                                        {intl.formatMessage({id: 'staffdash.tickets.pickone'})}
                                                    </option>
                                                    <option value="event_award">
                                                        {intl.formatMessage({id: 'staffdash.tickets.event_award'})}
                                                    </option>
                                                    <option value="job_fair">
                                                        {intl.formatMessage({id: 'staffdash.tickets.job_fair'})}
                                                    </option>
                                                    <option value="volunteer_raffle">
                                                        {intl.formatMessage({id: 'staffdash.tickets.volunteer_raffle'})}
                                                    </option>
                                                </select>
                                                <span className="help-block fs-xs">
                                                    <FormattedMessage id={validation.raffle.message}/>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3 px-2">
                                        <div className="form-group">
                                            <div className={validation.username.isInvalid && 'has-error'}>
                                                <input type="text"
                                                       className={"form-control form-alt-input " + this.fieldHasValue("username")}
                                                       name="username"
                                                       placeholder={intl.formatMessage({id: 'forms.username.placeholder'})}
                                                       onChange={this.handleInputChange}
                                                       value={this.state.username}
                                                />
                                                <span className="help-block fs-xs">
                                                    <FormattedMessage id={validation.username.message}/>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-5 px-2">
                                        <div className="form-group">
                                            <div className={validation.description.isInvalid && 'has-error'}>
                                                <input type="text"
                                                       className={"form-control form-alt-input " + this.fieldHasValue("description")}
                                                       name="description"
                                                       placeholder={intl.formatMessage({id: 'forms.description_raffle.placeholder'})}
                                                       onChange={this.handleInputChange}
                                                       value={this.state.description}
                                                />
                                                <span className="help-block fs-xs">
                                                    <FormattedMessage id={validation.description.message}/>
                                                </span>
                                            </div>
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

export default Tickets;
