import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import { Link } from "react-router-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";
import querystring from "query-string";

class Visitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            visitor: "",
            loaded: false,
            success: false,
        };

        this.createTicket = this.createTicket.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        let username = this.props.location.search.split('?user=')[1];
        axios.get(URL+'/api/sponsors/_'+username+'/short', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                this.setState({ visitor: response.data, loaded:true, username:username });
                console.log(response);
            })
            .catch(function (error){ console.log(error); })
    }

    createTicket(){
        this.setState({loaded:false});
        console.log(this.state);
        const newRequest = {
            username: this.state.username,
            raffle: "job_fair",
            description: "Visita à Banca do/a "+this.props.auth.user.username,
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
                this.setState({ success: true, loaded:true });
                this.goBack();
            })
            .catch(err => { console.log(err.response) })
    }

    goBack(){window.setTimeout(() => { this.props.navigation("feed") }, 3000)}

    render() {
        const loaded = this.state.loaded;
        const visitor = this.state.visitor;
        let hasPicture = (visitor.picture!=="");

        return(
            <Fade bottom cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1 f-dark-grey"><FormattedMessage id="sponsordash.feed.visitor"/></span>
                        <i className="fas fa-fw fa-user fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className="row justify-content-center align-content-start m-0 dash-content">
                    <div className="col-12 p-0">
                        <div className="spacer-2" />
                        {!loaded && this.state.success===false ?
                            <div className={"row justify-content-center align-content-center vh-40"}>
                                <div className={"col-12 p-0 text-center f-grey"}>
                                    <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                                    <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                                </div>
                            </div>
                        :""}
                        {loaded && this.state.success===true ?
                            <Fade right cascade>
                                <div className={"row justify-content-center align-content-center vh-40"}>
                                    <div className={"col-12 p-0 text-center f-grey"}>
                                        <i className="fas fa-check fa-3x my-3 f-primary" />
                                        <p className="fs-sm fw-4 flh-2 mb-2"><FormattedMessage id="sponsordash.feed.visitor.confirmed1"/></p>
                                        <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="sponsordash.feed.visitor.confirmed2"/></p>
                                    </div>
                                </div>
                            </Fade>
                            :""}
                        {loaded && this.state.success===false?
                            <div className={"row justify-content-center align-content-center vh-40 m-0"}>
                                <div className={"col-12 p-0 text-center"}>
                                    <img src={URL+"/files/profile/"+visitor.picture} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"":"d-none")}/>
                                    <img src={URL+"/files/profile/profile_default.png"} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"d-none":"")}/>
                                    <div className="spacer-4" />
                                    <span className="fs-lg fw-4 flh-1 f-dark-grey py-3">{visitor.name}</span>
                                    <div className="spacer-2" />
                                    <hr />
                                    <div className={"row justify-content-center align-content-center m-0 "+(this.state.success?"d-none":"")}>
                                        <div className={"col-12 p-0 text-center"}>
                                            <p className="fs-md fw-4 flh-1 mb-3"><FormattedMessage id="sponsordash.feed.visitor.confirm"/></p>
                                            <button className="btn btn-dev-alt fw-7 mx-2 py-2 px-3" onClick={()=>this.createTicket()}>
                                                <i className="fas fa-check fa-md mr-2" />
                                                <span className="fs-sm fw-7 flh-1 mb-0 p-1"><FormattedMessage id="forms.yes"/></span>
                                            </button>
                                            <button className="btn btn-dev-alt fw-7 mx-2 py-2 px-3" onClick={()=>this.goBack()}>
                                                <i className="fas fa-times fa-md mr-2" />
                                                <span className="fs-sm fw-7 flh-1 mb-0 p-1"><FormattedMessage id="forms.no"/></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :""}
                        <div className="spacer-2" />
                    </div>
                </div>
            </Fade>

        );

    }
}

export default Visitor;
