import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import axios from "axios";
import URL from "../../../utils/requestsURL";
import querystring from "query-string";

class Tickets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: [],
            loaded: false,
        };

    }

    componentDidMount() { this.getTickets(); }
    getTickets(){
        axios.get(URL+'/api/tickets/own', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.setState({ tickets: response.data, loaded: true }); })
            .catch(function (err){ console.log(err); })
    }

    allCodes(){
        const { intl } = this.props;
        let condition = (ticket) => { return(ticket) };
        let filteredTickets = this.state.tickets.filter(condition);
        if ( filteredTickets.length === 0)
            return <div className="card text-center dash-team white">
                <div className="card-body">
                    <span className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="guestdash.tickets.empty"/></span>
                </div>
            </div>
        else
            return filteredTickets.map((ticket, index) => {
                return <div className="card text-left dash-team white" key={ticket.identifier}>
                    <div className="card-body">
                        <div className="row justify-content-center align-items-center m-0">
                            <div className={"col-12 px-2 f-primary"}>
                                {/*
                                <span className="fs-sm fw-7 flh-1 mb-0">#{index} - </span>
                                */}
                                <span className={"fs-sm fw-7 flh-1 mb-0 ml-0 "+(ticket.raffle==="event_award"?"":"d-none")}>
                                    <FormattedMessage id="staffdash.tickets.event_award"/>
                                </span>
                                <span className={"fs-sm fw-7 flh-1 mb-0 ml-0 "+(ticket.raffle==="job_fair"?"":"d-none")}>
                                    <FormattedMessage id="staffdash.tickets.job_fair"/>
                                </span>
                                <span className="fs-xxs fw-4 flh-1 mb-0 ml-2 f-light-grey">({ticket.identifier})</span>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-start m-0 pt-1">
                            <div className={"col-12 p-0 px-2 text-left f-dark-grey"}>
                                <span className="fs-xs fw-4 flh-1 f-grey ">@{ticket.username}: </span>
                                <span className="fs-xs fw-4 flh-1 ">{ticket.description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            })
    }

    render() {
        const loaded = this.state.loaded;
        const { intl } = this.props;

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
                            <div className={"row justify-content-center align-content-center m-0"}>
                                <div className={"col-12 p-0 text-center f-grey"}>
                                    <Fade bottom cascade>
                                        <div className="card-columns promocodes-columns">
                                            {this.allCodes()}
                                            <div className="card text-center dash-team white cp" onClick={()=>this.props.navigation("qrcode")}>
                                                <div className="card-body">
                                                    <span className="fs-sm fw-4 flh-1 mb-0">
                                                        <FormattedMessage id="guestdash.tickets.info"/>
                                                    </span>
                                                </div>
                                            </div>
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
