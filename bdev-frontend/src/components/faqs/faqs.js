import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";

import './faqs.css';

class Faqs extends Component {
    constructor() {
        super();
        this.state = {
            info:0
        };
    }

    changeInfo = (number) => {
        this.setState({info: number})
    }

    render() {
        const info = this.state.info;
        return(
            <div className="row justify-content-center align-items-center p-0 m-0">
                <div className="col-12 p-0">
                    <div className="row vh-30 justify-content-center align-items-center p-0 m-0 f-primary">
                        <div className="col-11 col-lg-10 p-0 text-left">
                            <div className="spacer-6"></div>
                            <p className="fs-xl fw-7 flh-2 mb-0"><FormattedMessage id="faqs.title"/></p>
                            <div className="spacer-2"></div>
                            <p className="fs-md fw-4 flh-2 mb-3"><FormattedMessage id="faqs.desc1"/></p>
                            <div className="spacer-2"></div>
                            <hr className="m-0 f-secondary secondary" style={{height:2}}/>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center p-0 m-0 white f-dark-grey">
                        <div className="col-11 col-lg-10 p-0 text-left">
                            <div className="row justify-content-center align-items-center p-0 m-0">
                                <div className="col-6 col-lg-3 p-0 text-center">
                                    <div className={"row justify-content-center align-items-center p-2 mx-2 my-1 cp faq-opt "+(info == 1 ? "faq-opt-active":"")}
                                         onClick={() => this.changeInfo(1)}>
                                        <div className="col-3 p-0 text-center">
                                            <i className="fas fa-info fa-lg fa-fw"></i>
                                        </div>
                                        <div className="col-9 px-1 p-lg-0 text-left">
                                            <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="faqs.opt1"/></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3 p-0 text-center">
                                    <div className={"row justify-content-center align-items-center p-2 mx-2 my-1 cp faq-opt "+(info == 2 ? "faq-opt-active":"")}
                                         onClick={() => this.changeInfo(2)}>
                                        <div className="col-3 p-0 text-center">
                                            <i className="fas fa-user-friends fa-lg fa-fw"></i>
                                        </div>
                                        <div className="col-9 px-1 p-lg-0 text-left">
                                            <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="faqs.opt2"/></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3 p-0 text-center">
                                    <div className={"row justify-content-center align-items-center p-2 mx-2 my-1 cp faq-opt "+(info == 3 ? "faq-opt-active":"")}
                                         onClick={() => this.changeInfo(3)}>
                                        <div className="col-3 p-0 text-center">
                                            <i className="fas fa-book fa-lg fa-fw"></i>
                                        </div>
                                        <div className="col-9 px-1 p-lg-0 text-left">
                                            <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="faqs.opt3"/></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3 p-0 text-center">
                                    <div className={"row justify-content-center align-items-center p-2 mx-2 my-1 cp faq-opt "+(info == 4 ? "faq-opt-active":"")}
                                         onClick={() => this.changeInfo(4)}>
                                        <div className="col-3 p-0 text-center">
                                            <i className="fas fa-calendar-week fa-lg fa-fw"></i>
                                        </div>
                                        <div className="col-9 px-1 p-lg-0 text-left">
                                            <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="faqs.opt4"/></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={"row vh-30 justify-content-center align-items-center p-0 mx-0 my-2 "+(info==0 ? "d-flex":"d-none")}>
                                <div className="col-12 col-lg-6 text-center">
                                    <Fade bottom>
                                        <p className="fs-md fw-4 flh-2 mb-0"><FormattedMessage id="faqs.desc2"/></p>
                                        <div className="spacer-4"></div>
                                        <p className="fs-sm fw-4 flh-2 mb-0"><FormattedMessage id="faqs.desc3"/></p>
                                    </Fade>
                                </div>
                            </div>
                            <div className={"row vh-30 justify-content-center align-items-start px-0 py-3 mx-0 my-2 "+(info==1 ? "d-flex":"d-none")}>
                                <div className="col-12 text-center p-0 faqs-cards">
                                    <Fade bottom cascade>
                                    <div className="card-columns">
                                        <div className="card text-left question">
                                            <div className="card-body">
                                                <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q1"/></p>
                                                <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a1"/></p>
                                            </div>
                                        </div>
                                        <div className="card text-left question">
                                            <div className="card-body">
                                                <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q2"/></p>
                                                <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a2"/></p>
                                            </div>
                                        </div>
                                        <div className="card text-left question">
                                            <div className="card-body">
                                                <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q3"/></p>
                                                <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a3"/></p>
                                            </div>
                                        </div>
                                        <div className="card text-left question">
                                            <div className="card-body">
                                                <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q4"/></p>
                                                <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a4"/></p>
                                            </div>
                                        </div>
                                        <div className="card text-left question">
                                            <div className="card-body">
                                                <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q4"/></p>
                                                <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a4"/></p>
                                            </div>
                                        </div>
                                        <div className="card text-left question">
                                            <div className="card-body">
                                                <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q4"/></p>
                                                <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a4"/></p>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                                </div>
                            </div>
                            <div className={"row vh-30 justify-content-center align-items-start px-0 py-3 mx-0 my-2 "+(info==2 ? "d-flex":"d-none")}>
                                <div className="col-12 text-center p-0 faqs-cards">
                                    <Fade bottom cascade>
                                        <div className="card-columns">
                                            <div className="card text-left question">
                                                <div className="card-body">
                                                    <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q1"/></p>
                                                    <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a1"/></p>
                                                </div>
                                            </div>
                                            <div className="card text-left question">
                                                <div className="card-body">
                                                    <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q2"/></p>
                                                    <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a2"/></p>
                                                </div>
                                            </div>
                                            <div className="card text-left question">
                                                <div className="card-body">
                                                    <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q3"/></p>
                                                    <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a3"/></p>
                                                </div>
                                            </div>
                                            <div className="card text-left question">
                                                <div className="card-body">
                                                    <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q4"/></p>
                                                    <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a4"/></p>
                                                </div>
                                            </div>
                                            <div className="card text-left question">
                                                <div className="card-body">
                                                    <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q4"/></p>
                                                    <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a4"/></p>
                                                </div>
                                            </div>
                                            <div className="card text-left question">
                                                <div className="card-body">
                                                    <p className="fs-md fw-7 flh-2 mb-1"><FormattedMessage id="faqs.q4"/></p>
                                                    <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey"><FormattedMessage id="faqs.a4"/></p>
                                                </div>
                                            </div>
                                        </div>
                                    </Fade>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Faqs;
