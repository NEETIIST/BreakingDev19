import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";

class BeSponsor extends Component {
    constructor() {
        super();
        this.state = {

        };
    }


    render() {
        return(
            <div className="row vh-100 justify-content-center align-items-center p-0 m-0 primary f-white">
                <div className="col-11 col-lg-10 text-left">
                    <div className="spacer-8"></div>
                    <p className="fs-lg fw-7 flh-1 mb-3"><FormattedMessage id="besponsor.title"/></p>
                    <div className="spacer-2"></div>
                    <p className="fs-md fw-4 flh-2 mb-3"><FormattedMessage id="besponsor.desc1"/></p>
                    <p className="fs-md fw-4 flh-2 mb-3"><FormattedMessage id="besponsor.desc2"/></p>
                    <div className="spacer-2"></div>
                    <p className="fs-md fw-4 flh-2 mb-3"><FormattedMessage id="besponsor.desc3"/></p>
                    <div className="spacer-2"></div>
                    <p className="fs-md fw-4 flh-2 mb-3">
                        <FormattedMessage id="besponsor.desc4"/>
                        <a href="mailto:breakingdev@neeti.tecnico.ulisboa.pt" target="_blank" className="clickable">
                            breakingdev@neeti.tecnico.ulisboa.pt
                        </a>
                    </p>
                    <p className="fs-lg fw-4 flh-2 mb-3"><FormattedMessage id="besponsor.desc5"/></p>
                    <div className="spacer-8"></div>
                </div>
            </div>
        );

    }
}

export default BeSponsor;
