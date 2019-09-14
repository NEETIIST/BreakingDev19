import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import URL from "../../../utils/requestsURL";
import { messageInput } from "./formValidation";
import axios from "axios";
import querystring from "query-string";
import './chats.css'

// Socket.IO
import 'whatwg-fetch';
import openSocket from 'socket.io-client';

const url_socket = URL.split(":")[0]+":"+URL.split(":")[1]+":8000"
const socket = openSocket(url_socket);

class Chat extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.validator = messageInput;
        this.state = {
            message: "",
            //
            validation: this.validator.valid(),
            status: "waiting",
            errors: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
    fieldHasValue = field => {return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");};
    onSubmit(e){
        e.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid && this.state.message !== "") {
            this.setState({status: "pending"});
            const newRequest = {
                message: this.state.message,
            };

            axios
                .put(URL+"/api/chat/_"+this.props.channel.channel+"/send", querystring.stringify(newRequest), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                    },
                })
                .then(res => {
                    this.setState({ status: "waiting", message:"" });
                    this.props.onSent(res.data);
                    this.scrollToBottom();
                })
                .catch(err => {
                    this.setState({ status: "waiting" });
                    console.log(err)
                })
                //.then(socket.emit('sent_message', this.props.channel.socket_id));
        }
    }

    allMessages(){
        const { user } = this.props.auth;

        return (
            this.props.channel.messages.map((message, index) => {
                //const target = channel.members.filter(member => member !== user.username)[0]; // Only Works with a single user
                //let lastMessage = channel.messages.slice(-1)[0];
                const ownMessage = message.author===user.username;

                return(
                    <div className={"row align-content-middle m-0 "+(ownMessage?"justify-content-start":"justify-content-end")} key={message._id}>
                        <div className={"col-auto py-2 px-3 text-justify message my-1 "+(ownMessage?"owner":"target")}>
                            <span className={"fs-sm fw-4 flh-1 mb-0 "}>
                                {message.content}
                            </span>
                        </div>
                    </div>
                )
            })
        )
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
        this.connectSocket();
    }

    componentDidUpdate(prevProps) {
        this.scrollToBottom();
    }

    /*
    componentWillUnmount() {
        socket.emit('disconnect', this.props.channel.socket_id);
    }*/


    connectSocket(){
        socket.emit('join', this.props.channel.socket_id);
        socket.on("has_messages", ()=>{console.log("has messages"); this.props.update();} );
    }

    render() {
        //const team = this.props.team;
        const { intl } = this.props;

        let validation = this.submitted ?        // if the form has been submitted at least once
            this.validator.validate(this.state) :   // then check validity every time we render
            this.state.validation;                   // otherwise just use what's in state
        const status = this.state.status;

        return(
            <Fade right>
                <div className={"row justify-content-center align-content-start m-0 vh-55 pb-1"}>
                    <div className={"col-12 p-0"} style={{maxHeight:"55vh",overflowY:"auto"}}>
                        {this.allMessages()}
                        <div style={{ float:"left", clear: "both" }}
                             ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start m-0 vh-10 mt-2"}>
                    <div className={"col-12 p-0"}>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <div className={"row justify-content-start align-items-center"}>
                                <div className={"col-12 col-lg-10"}>
                                    <div className={"form-group "+(status==="waiting"?"":"d-none")}>
                                        <div className={validation.message.isInvalid && 'has-error'}>
                                            <input type="text"
                                                   className={"form-control form-alt-input " + this.fieldHasValue("message")}
                                                   name="message"
                                                   placeholder={intl.formatMessage({id: 'forms.message.placeholder'})}
                                                   onChange={this.handleInputChange}
                                                   value={this.state.message}
                                            />
                                            <span className="help-block fs-xs">
                                                <FormattedMessage id={validation.message.message}/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className={""+(status==="pending"?"":"d-none")}>
                                        <i className="fas fa-fw fa-circle-notch fa-spin fa-lg" />
                                    </div>
                                </div>
                                <div className={"col-2 d-none d-lg-flex"}>
                                    <input type="submit"
                                           value={intl.formatMessage({ id: 'forms.send' })}
                                           className="btn btn-dev-alt btn-block fw-7" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Chat;
