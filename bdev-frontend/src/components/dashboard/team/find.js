import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";

class Find extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {

        }

    }

    render() {
        const { intl } = this.props;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-items-center m-0 vh-20">

                </div>
            </Fade>
        );

    }
}

export default Find;
