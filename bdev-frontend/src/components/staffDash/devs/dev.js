import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";

class Dev extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.allSkills = this.allSkills.bind(this);
        console.log(props);
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

    test(){console.log("");}


    render() {
        const profile = this.props.profile;
        const { intl } = this.props;
        const methods = this.props.methods;

        let hasPicture = (profile.picture!=="");

        // TODO: Implement system to remove a user files
        return(
            <Fade right cascade>
                <div className={"row justify-content-center align-content-center m-0 vh-10"} >
                    <div className={"col-2 col-lg-4 p-2 text-left cp hvr-primary"}
                         onClick={() => methods.seeList()}>
                        <i className="fas fa-fw fa-chevron-left fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0 d-none d-lg-inline"><FormattedMessage id="staffdash.devs.goback"/></span>
                    </div>
                    <div className={"col-5 col-lg-4 p-2 text-center cp hvr-green "+(profile.validated?"d-none":"d-flex")}
                         onClick={() => methods.validateProfile(profile)}>
                        <i className="fas fa-fw fa-user-check fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.devs.validate"/></span>
                    </div>
                    <div className={"col-5 col-lg-4 p-2 text-center cp hvr-red "+(!profile.validated?"d-none":"d-flex")}
                         onClick={() => methods.invalidateProfile(profile)}>
                        <i className="fas fa-fw fa-user-times fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.devs.invalidate"/></span>
                    </div>
                    <div className={"col-5 col-lg-4 p-2 text-center cp hvr-green "+(profile.payment?"d-none":"d-flex")}
                         onClick={() => methods.confirmPayment(profile)}>
                        <i className="fas fa-fw fa-euro-sign fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.devs.confirmPayment"/></span>
                    </div>
                    <div className={"col-5 col-lg-4 p-2 text-center cp hvr-red "+(!profile.payment?"d-none":"d-flex")}
                         onClick={() => methods.cancelPayment(profile)}>
                        <i className="fas fa-fw fa-times fa-lg flh-1"/>
                        <i className="fas fa-euro-sign fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.devs.cancelPayment"/></span>
                    </div>

                </div>
                <hr className={"mt-0 mb-2"} />
                <div className={"spacer-2"} />
                <div className="row justify-content-center align-items-center m-0 vh-20">
                    <div className="col-12 col-lg-3 p-0 text-center">
                        <img src={URL+"/files/profile/"+profile.picture} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"":"d-none")}/>
                        <img src={URL+"/files/profile/profile_default.png"} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"d-none":"")}/>
                    </div>
                    <div className="col-12 col-lg-9 p-0 text-left f-dark-grey">
                        <div className="row justify-content-start align-items-center m-0">
                            <div className={"col-auto px-2 py-1 alert alert-warning mr-2 my-1 my-lg-0 "+(profile.pending?"d-inline":"d-none")}>
                                <i className="fas fa-fw fa-exclamation-triangle fa-md flh-1 mx-1"/>
                                <span className="fs-sm fw-4 flh-1 f-grey mx-1"><FormattedMessage id="staffdash.devs.pending"/></span>
                            </div>
                            <div className={"col-auto px-2 py-1 alert alert-success mr-2 my-1 my-lg-0 "+(profile.validated?"d-inline":"d-none")}>
                                <i className="fas fa-fw fa-user-check fa-md flh-1 mx-1"/>
                                <span className="fs-sm fw-4 flh-1 f-grey mx-1"><FormattedMessage id="staffdash.devs.validated"/></span>
                            </div>
                            <div className={"col-auto px-2 py-1 alert alert-success mr-2 my-1 my-lg-0 "+(profile.payment?"d-inline":"d-none")}>
                                <i className="fas fa-fw fa-euro-sign fa-md flh-1"/>
                                <span className="fs-sm fw-4 flh-1 f-grey mx-1"><FormattedMessage id="staffdash.devs.payment"/></span>
                            </div>
                        </div>
                        <p className="fs-xl fw-7 flh-1 mb-2 mt-3">
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
                                <a href={URL+"/files/cv/"+profile.cv} target={"_blank"}>
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
                            <FormattedMessage id="staffdash.devs.see.aboutme"/>
                        </p>
                        <p className="fs-md fw-4 flh-1 mb-0">
                            {profile.bio}
                        </p>
                    </div>
                </div>
                <div className={"row justify-content-center align-items-center m-0 mt-3 "+(profile.skills ? "d-flex":"d-none")}>
                    <div className="col-12 p-0 f-dark-grey">
                        <p className="fs-sm fw-4 flh-1 mb-2 f-primary">
                            <FormattedMessage id="staffdash.devs.see.skills"/>
                        </p>
                        {this.allSkills(profile.skills)}
                    </div>
                </div>
                <div className={"spacer-2"} />
                <div className="row justify-content-start align-items-center m-0 mt-2">
                    <div className="col-12 p-0">
                        <p className="fs-xs fw-4 flh-1 mb-3 f-primary">
                            <FormattedMessage id="staffdash.devs.see.privateinfo"/>
                        </p>
                    </div>
                    <div className="col-6 col-lg-3 px-0 py-1 f-dark-grey">
                        <i className="fas fa-fw fa-mobile-alt fa-lg mr-2 mt-1" title={intl.formatMessage({id: 'forms.phone.placeholder'})}/>
                        <span className="fs-md fw-4 flh-1 mb-0">{profile.phone}</span>
                    </div>
                    <div className="col-6 col-lg-3 px-0 py-1 f-dark-grey">
                        <i className="fas fa-fw fa-birthday-cake fa-lg mr-2 mt-1" title={intl.formatMessage({id: 'forms.age.placeholder'})}/>
                        <span className="fs-md fw-4 flh-1 mb-0">{profile.age}</span>
                    </div>
                    <div className="col-6 col-lg-3 px-0 py-1 f-dark-grey">
                        <i className="fas fa-fw fa-drumstick-bite fa-lg mr-2 mt-1" title={intl.formatMessage({id: 'forms.food.placeholder'})}/>
                        <span className="fs-md fw-4 flh-1 mb-0">{profile.food}</span>
                    </div>
                </div>
                <div className={"spacer-2"} />
            </Fade>
        );

    }
}

export default Dev;
