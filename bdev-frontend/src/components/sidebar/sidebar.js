import React, { Component } from "react";
import Fade from 'react-reveal/Fade';

import './sidebar.css';

class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        };
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    render() {
        const show = this.state.isOpen ? "visible" : "hidden";
        return(
            <div>
                <div className="row justify-content-start align-items-center vh-10 fixed-top p-0 m-0">
                    <div class="col-6 col-lg-2 text-left pl-3">
                        <div className="sidebar-button hvr-underline-from-left p-2 cp" onClick={this.toggleSidebar}>
                            <i className="fas fa-bars fa-lg f-white px-2"></i>
                            <span className="f-white mt-3 fs-lg px-2">MENU</span>
                        </div>
                    </div>
                </div>
                <Fade when={this.state.isOpen} duration={400}>
                    <div id={"sidebar"} className={show}>
                        <div className="row justify-content-start align-items-center vh-100 p-0 m-0 f-white">
                            <div className="col-12 col-lg-3 p-0" id={"sidebarContent"}>
                                <div className="row justify-content-start align-items-center vh-10 p-0 m-0">
                                    <div className="col-12 text-left p-2">
                                        <div className="sidebar-button hvr-underline-from-left ml-2 p-2 cp" onClick={this.toggleSidebar}>
                                            <i className="fas fa-times fa-lg f-white px-2"></i>
                                            <span className="f-white mt-3 fs-lg px-2">VOLTAR</span>
                                        </div>
                                    </div>
                                </div>
                                <hr className="m-0"/>
                                <div className="row justify-content-center align-items-center vh-75 p-0 m-0">
                                    <div class="col-11 text-left">
                                        <p>Opt 1</p>
                                    </div>
                                </div>
                                <hr className="m-0"/>
                                <div className="row justify-content-center align-items-center vh-15 p-0 m-0">
                                    <div className="col-11 text-center">
                                        
                                        <a href="#" target="_blank">
                                            <i className="fab fa-facebook-square fa-2x px-2 clickable"></i>
                                        </a>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-instagram fa-2x px-2 clickable"></i>
                                        </a>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-linkedin fa-2x px-2 clickable"></i>
                                        </a>
                                        <a href="#" target="_blank">
                                            <i className="fab fa-github-square fa-2x px-2 clickable"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-lg-9 p-0" id={"sidebarMask"} onClick={this.toggleSidebar}>
                                <div className="row justify-content-start align-items-center vh-100 p-0 m-0">
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        );
        /*
        return (
            <div>
                <div className="row justify-content-center align-items-center vh-10 fixed-top">
                    <div className="col-11 text-left">
                        <i className="fas fa-bars fa-2x" onClick={this.toggleSidebar}></i>
                    </div>
                </div>
                <Fade left when={this.state.isOpen} duration={1000}>
                    <div id={"navbar"} className={"row justify-content-start align-items-center vh-100 fixed-top "+show}>
                        <div className="col-6 text-left alternative">
                            <i className="fas fa-times fa-2x" onClick={this.toggleSidebar}></i>
                        </div>
                    </div>
                </Fade>
            </div>
        );
        */
    }
}

export default Sidebar;
