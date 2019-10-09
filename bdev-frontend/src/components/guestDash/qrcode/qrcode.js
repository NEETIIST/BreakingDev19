import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import { Link } from "react-router-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";

class QRCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: "",
            loaded:false,
        };
    }

    componentDidMount() {
        let link = "http://"+window.location.href.split("/")[2]+"/sponsordash/visitor?user="+this.props.auth.user.username;
        console.log(link);
        this.setState({link:link});
        /*
        axios.get("https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Example")
            .then(response => { console.log(response); this.setState({  }); })
            .catch(function (error){ console.log(error); })
            .then(()=>{this.setState({loaded:true})})

        */
    }

    render() {
        const loaded = this.state.loaded;

        return(
            <Fade bottom cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1 f-dark-grey"><FormattedMessage id="guestdash.qrcode.title"/></span>
                        <i className="fas fa-fw fa-qrcode fa-lg flh-1 ml-2" />
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className="row justify-content-center align-content-start m-0 dash-content">
                    <div className="col-12 p-0 text-center">
                        <div className="spacer-4" />
                        <img className={"img-fluid"}
                             src={"https://api.qrserver.com/v1/create-qr-code/?size=400x400&data="+this.state.link} />
                        <div className="spacer-4" />
                        <span className="fs-sm fw-4 flh-1 f-grey"><FormattedMessage id="guestdash.qrcode.desc"/></span>
                        <div className="spacer-4" />
                    </div>
                </div>
            </Fade>

        );

    }
}

export default QRCode;
