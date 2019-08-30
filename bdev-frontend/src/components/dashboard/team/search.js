import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";
import axios from "axios";

class Search extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            devs: [],
            loaded: false,
        }

    }

    componentDidMount() {
        this.getDevs();
    }

    getDevs(){
        axios.get(URL+'/api/teams/needsteam', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { console.log(response.data); this.setState({ devs: response.data, loaded:true }); })
            .catch(err => console.log(err.response))
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

    allDevs(){
        const { intl } = this.props;
        return this.state.devs.map((dev, index) => {
            const hasPicture = (dev.picture!=="");
            return <div className="card text-left dash-team white" key={dev.username}>
                <div className="card-body">
                    <div className="row justify-content-center align-items-center m-0">
                        <div className={"col-3 p-0 p-0 pr-2 text-left"}>
                            <img src={URL+"/files/profile/"+dev.picture} className={"profile-pic-fluid pic-img mb-3 mb-lg-0 "+(hasPicture?"":"d-none")}/>
                            <img src={URL+"/files/profile/profile_default.png"} className={"profile-pic-fluid pic-img mb-3 mb-lg-0 "+(hasPicture?"d-none":"")}/>
                        </div>
                        <div className={"col-9 p-0 px-1 text-left f-dark-grey"}>
                            <span className="fs-md fw-7 flh-2 mb-0 f-primary">{dev.name}</span>
                            <span className="fs-sm fw-4 flh-2 mb-1 "> @{dev.username}</span>
                            <p className="fs-sm fw-4 flh-2 mb-0 ">{dev.course}</p>
                            <div className="row justify-content-center align-items-center m-0 mt-2">
                                <div className="col-12 p-0 text-left no-scrollbar" style={{whiteSpace:"nowrap", overflowX: "scroll"}}>
                                    {this.allSkills(dev.skills)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-start m-0 pt-2">
                        <div className={"col-12 p-0 px-2 text-left f-dark-grey"}>
                            <p className="fs-sm fw-4 flh-1 mb-1 ">{dev.bio}</p>
                        </div>
                    </div>
                    <hr className={"mt-2 mb-1"} />
                    <div className="row justify-content-center align-items-start m-0 pt-1 f-dark-grey">
                        <div className={"col-12 p-0 px-2 text-center hvr-primary cp"} onClick={"something"}>
                            <i className={"fas fa-md mx-2 fa-comments"}
                               title={intl.formatMessage({ id: "dash.team.search.invitetojoin" })} />
                            <span className="fs-sm fw-4 flh-1 mb-0 "><FormattedMessage id="dash.team.search.invitetojoin"/></span>
                        </div>
                        {/*
                        <div className={"col-6 p-0 px-2 text-left f-dark-grey"}>
                            <i className={"fas fa-fw fa-md mx-1 mb-2 fa-users"}
                               title={intl.formatMessage({ id: 'dash.team.members' })} />
                            <span className="fs-sm fw-4 flh-2 mb-0 "><FormattedMessage id="dash.team.join.something"/></span>
                        </div>
                        */}
                    </div>
                </div>
            </div>
        })
    }

    render() {
        const { intl } = this.props;

        return(
            <Fade right cascade>
                <div className={"row justify-content-center align-items-center m-0 vh-20 " +(this.state.loaded?"":"d-none")}>
                    <div className="col-12 p-0 f-dark-grey mb-2">
                        <p className="fs-md fw-4 flh-1 mb-1"><FormattedMessage id="dash.team.search.desc1"/></p>
                        <p className="fs-xs fw-4 flh-2 mb-1"><FormattedMessage id="dash.team.search.desc2"/></p>
                    </div>
                    <div className="col-12 text-center p-0 dash-team-list">
                        <Fade bottom cascade>
                            <div className="card-columns">
                                { this.allDevs() }
                            </div>
                        </Fade>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-center vh-40 " +(this.state.loaded?"d-none":"")}>
                    <div className={"col-12 p-0 text-center f-grey"}>
                        <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                        <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Search;
