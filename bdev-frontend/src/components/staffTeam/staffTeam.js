import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import axios from "axios";
import URL from "../../utils/requestsURL";
import Team from "../staffDash/teams/team";

class StaffTeam extends Component {
    constructor() {
        super();
        this.state = {
            staffs:[],
        };
    }

    componentDidMount() { this.getStaffs(); }
    getStaffs(){
        axios.get(URL+'/api/staff/public', {})
            .then(response => { this.setState({ staffs: response.data }); })
            .catch(function (err){ console.log(err); })
    }

    allStaffs(){
        const { intl } = this.props;
        let staffs = this.state.staffs;
        staffs.sort(function(a,b){
            return a.name.localeCompare(b.name);
        });
        if ( staffs.length === 0 && this.state.ready)
            return <p className="fs-md fw-4 flh-1 my-3 f-dark-grey"><FormattedMessage id="staff.empty"/></p>;
        else
            return (
                staffs.map((staff, index) => {
                    let hasPicture = (staff.picture!=="");
                    return(
                        <div className={"col-12 col-lg-4 text-center my-2"}>
                            <img src={URL+"/files/profile/"+staff.picture} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"":"d-none")}/>
                            <img src={URL+"/files/profile/profile_default.png"} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"d-none":"")}/>
                            <p className="fs-md fw-7 flh-2 mb-1 mt-3">{staff.name}</p>
                            <p className="fs-sm fw-4 flh-2 mb-2 ">{staff.job}</p>
                            <a href={"https://github.com/"+staff.github} target={"_blank"} className={staff.github?"":"d-none"}>
                                <i className="fab fa-fw fa-github fa-lg mr-2 mt-1"/>
                            </a>
                            <a href={"https://linkedin.com/in/"+staff.linkedin} target={"_blank"} className={staff.linkedin?"":"d-none"}>
                                <i className="fab fa-fw fa-linkedin fa-lg mr-2 mt-1"/>
                            </a>
                        </div>
                    )
                })
            )
    }

    render() {
        return(
            <div className="row vh-100 justify-content-center align-items-start p-0 m-0 white f-primary">
                <div className="col-11 col-lg-10 text-center">
                    <div className={"spacer-8"} />
                    <p className="fs-xl fw-7 flh-2 mb-1 "><FormattedMessage id="staff.title"/></p>
                    <p className="fs-lg fw-4 flh-2 mb-1 "><FormattedMessage id="staff.desc1"/></p>
                    <div className={"spacer-4"}/>
                    <hr className={"f-primary primary mb-3"} style={{"height":"2px"}}/>
                    <div className={"row justify-content-center align-items-center p-0 m-0"}>
                        {this.allStaffs()}
                    </div>
                    <div className={"spacer-8"}/>
                    <div className={"spacer-4"}/>
                </div>
            </div>
        );

    }
}

export default StaffTeam;
