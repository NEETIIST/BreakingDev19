import React, { Component } from "react";
import ReactDOM from 'react-dom'
import Fade from 'react-reveal/Fade';
import {FormattedMessage, injectIntl} from "react-intl";

import axios from "axios";
import querystring from "query-string";

import FormValidator from "../../utils/FormValidator";
//import './besponsor.css';

class Ideas extends Component {
    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollIntoView();
    }

    constructor() {
        super();


    }

    render() {
        return(
            <div className="row vh-100 justify-content-center align-items-center m-0 primary f-white">
                <div className="col-12 text-center">
                </div>
            </div>
        );
    }
}

export default injectIntl(Ideas);
