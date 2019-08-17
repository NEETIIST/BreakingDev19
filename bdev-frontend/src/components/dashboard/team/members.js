import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";

class Members extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {

        }
    }

    allMembers(members){
        return (
            members.map((member, index) => {
                return(
                    <div className={"col-6 col-lg-3 p-0 my-1 "}>
                        <i className="fas fa-fw fa-user fa-lg mr-2 mt-1"/>
                        <span className="fs-md fw-4 flh-1 mb-1">@ {member}</span>
                    </div>
                )
            })
        );
    }


    render() {
        const team = this.props.team;
        const { intl } = this.props;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-items-center m-0 vh-20">
                    <div className="col-12 col-lg-3 px-3 dash-team-member">
                        <p>Members</p>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Members;
