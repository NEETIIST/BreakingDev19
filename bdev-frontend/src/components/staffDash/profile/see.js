import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';

class See extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {

        }
        this.allSkills = this.allSkills.bind(this);
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
        const profile = this.props.profile;
        const { intl } = this.props;
        let hasPicture = (profile.picture!=="");

        return(
            <Fade right cascade>
            <div className="row justify-content-center align-items-center m-0 vh-20">
                <div className="col-12 col-lg-3 p-0 text-center">
                    <img src={"/profile/"+profile.picture} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"":"d-none")}/>
                    <img src={"/profile/profile_default.png"} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"d-none":"")}/>
                </div>
                <div className="col-12 col-lg-9 p-0 text-left f-dark-grey">
                    <p className="fs-xl fw-7 flh-1 mb-2">
                        {profile.name}
                        <span className="fs-sm fw-4 flh-1 f-grey ml-2">(@{profile.username})</span>
                    </p>
                    <p className="fs-md fw-4 flh-1 mb-1">
                        {profile.college} - {profile.course}
                    </p>
                    <div className="row justify-content-start align-items-center m-0 mt-3">
                        <div className={"col-6 col-lg-3 p-0 hvr-primary cp my-1 "+(profile.github ? "d-flex":"d-none")}>
                            <a href={"https://github.com/"+profile.github} target={"_blank"}>
                                <i className="fab fa-fw fa-github fa-lg mr-2 mt-1"/>
                                <span className="fs-md fw-4 flh-1 mb-1">{profile.github}</span>
                            </a>
                        </div>
                        <div className={"col-6 col-lg-3 p-0 hvr-primary cp my-1 "+(profile.linkedin ? "d-flex":"d-none")}>
                            <a href={"https://www.linkedin.com/in/"+profile.linkedin} target={"_blank"}>
                                <i className="fab fa-fw fa-linkedin fa-lg mr-2 mt-1"/>
                                <span className="fs-md fw-4 flh-1 mb-1">{profile.linkedin}</span>
                            </a>
                        </div>
                        <div className={"col-6 col-lg-3 p-0 hvr-primary cp my-1 "+(profile.twitter ? "d-flex":"d-none")}>
                            <a href={"https://twitter.com/"+profile.twitter} target={"_blank"}>
                                <i className="fab fa-fw fa-twitter fa-lg mr-2 mt-1"/>
                                <span className="fs-md fw-4 flh-1 mb-1">{profile.twitter}</span>
                            </a>
                        </div>
                        <div className={"col-6 col-lg-3 p-0 hvr-primary cp my-1 "+(profile.cv ? "d-flex":"d-none")}>
                            <a href={"/cv/"+profile.cv} target={"_blank"}>
                                <i className="fas fa-fw fa-file-alt fa-lg mr-2 mt-1"/>
                                <span className="fs-md fw-4 flh-1 mb-1"><FormattedMessage id="staffdash.profile.see.cv"/></span>

                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"spacer-2"} />
            <div className="row justify-content-center align-items-center m-0 mt-3">
                <div className="col-12 p-0 f-dark-grey">
                    <p className="fs-sm fw-4 flh-1 mb-1 f-primary">
                        <FormattedMessage id="staffdash.profile.see.job"/>
                    </p>
                    <p className="fs-md fw-4 flh-1 mb-0">
                        {profile.job}
                    </p>
                    <div className={"spacer-2"} />
                    <p className="fs-sm fw-4 flh-1 mb-1 f-primary">
                        <FormattedMessage id="staffdash.profile.see.aboutme"/>
                    </p>
                    <p className="fs-md fw-4 flh-1 mb-0">
                        {profile.bio}
                    </p>
                </div>
            </div>
                <div className={"row justify-content-center align-items-center m-0 mt-3 "+(profile.skills ? "d-flex":"d-none")}>
                    <div className="col-12 p-0 f-dark-grey">
                        <p className="fs-sm fw-4 flh-1 mb-2 f-primary">
                            <FormattedMessage id="staffdash.profile.see.skills"/>
                        </p>
                        {this.allSkills(profile.skills)}
                    </div>
                </div>
            <div className={"spacer-2"} />
            <div className="row justify-content-start align-items-center m-0 mt-2">
                <div className="col-12 p-0">
                    <p className="fs-xs fw-4 flh-1 mb-3 f-primary">
                        <FormattedMessage id="staffdash.profile.see.privateinfo"/>
                    </p>
                </div>
                <div className="col-6 col-lg-3 p-0 f-dark-grey">
                    <i className="fas fa-fw fa-mobile-alt fa-lg mr-2 mt-1" title={intl.formatMessage({id: 'forms.phone.placeholder'})}/>
                    <span className="fs-md fw-4 flh-1 mb-0">{profile.phone}</span>
                </div>
                <div className="col-6 col-lg-3 p-0 f-dark-grey">
                    <i className="fas fa-fw fa-birthday-cake fa-lg mr-2 mt-1" title={intl.formatMessage({id: 'forms.age.placeholder'})}/>
                    <span className="fs-md fw-4 flh-1 mb-0">{profile.age}</span>
                </div>
            </div>
            <div className={"spacer-2"} />
            </Fade>
        );

    }
}

export default See;
