import React, { Component } from "react";
import ReactDOM from 'react-dom'
import Fade from 'react-reveal/Fade';
import {FormattedMessage, injectIntl} from "react-intl";
import URL from "../../utils/requestsURL";

import axios from "axios";
import querystring from "query-string";

import FormValidator from "../../utils/FormValidator";

// Socket.IO
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            channel: null,
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.messages = this.messages.bind(this);
    }

    handleInputChange = event => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    fieldHasValue = field => {
        return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");
    };

    /*
    onSubmit(e) {
        e.preventDefault();

        const validation = this.validator.validate(this.state);


        this.setState({ validation });
        this.submitted = true;

        //  console.log(validation.isValid);

        if (validation.isValid) {
            this.setState({
                status: "pending",
            });
            const newRequest = {
                name: this.state.name,
                email: this.state.email,
                title: this.state.title,
                description: this.state.description
            };
            axios
                .post(URL+"/api/ideas/add", querystring.stringify(newRequest), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                .then(res => {
                    if (res.status == 200)
                        this.setState({
                            status: "success",
                        })
                    console.log(res.status)
                })
                .catch(err => {
                    this.setState({
                        status: "waiting"
                    })
                    console.log(err)
                });
        }
    }
    */

    messages() {
        console.log("here");
        console.log(this.state.channel);
        return this.state.channel.messages.map((message, index) => {
            return <p>{message}</p>
        })
    }

    sendMessage() {
        axios.put(URL+'/api/chat/_1/send', querystring.stringify({message:"Hello"}), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            }
        })
            .then(response => { console.log(response);this.setState({ channel: response.data }); })
            .catch(function (error){ console.log(error); })


        socket.emit('sent_message', this.state.channel.socket_id);
    }

    componentDidMount() {
        this.getChannel();
    }

    getChannel(){
        axios.get(URL+'/api/chat/_1', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            }
        })
            .then(response => { this.setState({ channel: response.data, loaded:true }); this.connectSocket() })
            .catch(function (error){ console.log(error); })
    }

    connectSocket(){
        socket.emit('join', this.state.channel.socket_id);
        socket.on("has_messages", this.getChannel() );
    }

    render() {
        if ( !this.state.loaded )
            return (<p>Not ready</p>)
        else
            return(
                <div className="row justify-content-center align-items-center p-0 m-0 vh-100 primary">
                    <div className="col-11 col-lg-10 p-0 f-white">
                        <p className="fs-sm fw-4 flh-2">Chat</p>
                        <button onClick={this.sendMessage}>Send Socket.io</button>
                        {this.messages()}
                    </div>
                </div>
            );
    }
}

export default injectIntl(Chat);
