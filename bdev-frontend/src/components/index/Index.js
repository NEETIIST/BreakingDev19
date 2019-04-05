import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
//import {IndexNavbar} from "./navbar/indexNavbar";
//import PropTypes from "prop-types";
//import { connect } from "react-redux";
//import { loginUser } from "../../actions/authActions";


//import { IndexNavbar } from './navbar/indexNavbar';

class Index extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div>
                <Sidebar/>
                <div className="row vh-100 justify-content-center align-items-center m-0 primary">
                    <div className="col-12 p-0 m-0 text-center">
                        <img src="img/splashAlt.png" class="img-fluid" />
                    </div>
                </div>
                <div className="row vh-100 justify-content-center align-items-center m-0 alternative">
                    <div className="col-12 p-0 m-0">

                    </div>
                </div>
                <div className="row vh-100 justify-content-center align-items-center m-0 white">
                    <div className="col-12 p-0 m-0">

                    </div>
                </div>
            </div>
        );
    }
}


export default Index;
