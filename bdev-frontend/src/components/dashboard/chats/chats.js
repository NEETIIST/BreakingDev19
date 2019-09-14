import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import ReactDOM from "react-dom";
import axios from "axios";
import URL from "../../../utils/requestsURL";
import Chat from "./chat";

class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            allChannels: [],
            detail: false,
            channel: null,
            targetDev: "",
        };

        this.openChannel = this.openChannel.bind(this);
        this.leaveChannel = this.leaveChannel.bind(this);
        this.sentMessage = this.sentMessage.bind(this);
        this.updateChannel = this.updateChannel.bind(this);
    }

    navigation = (content) => { this.setState(state => ({ content: content })); };

    componentDidMount() { this.getChannelsOveview() }

    getChannelsOveview(){
        axios.get(URL+'/api/chat/own', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => { this.setState({ loaded: true, allChannels: response.data }); console.log(response.data) })
            .catch(function (error){ console.log(error); })
    }


    openChannel(channel){
        const { user } = this.props.auth;
        const target = channel.members.filter(member => member !== user.username)[0]; // Only Works with a single user
        axios.get(URL+'/api/devs/_'+target, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {this.setState({ detail: true, channel: channel, targetDev: response.data });})
            .catch(function (error){ console.log(error); })
    }
    updateChannel(){
        console.log("Fetching Messages");
        let channel_number = this.state.channel.channel;
        axios.get(URL+'/api/chat/_'+channel_number, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
            },
        })
            .then(response => {
                console.log(response.data);
                let updatedChannels = this.state.allChannels.filter( function(channel){ return channel.channel !== channel_number } );
                updatedChannels.push( response.data );
                this.setState({ allChannels: updatedChannels, channel: response.data });
            })
            .catch(function (error){ console.log(error); })
    }
    leaveChannel(){ this.setState({ detail: false }); }
    sentMessage(channel){ this.setState({channel: channel})}

    allChannels(){
        let channels = this.state.allChannels;
        const { user } = this.props.auth;

        return (
            channels.map((channel, index) => {
                const target = channel.members.filter(member => member !== user.username)[0]; // Only Works with a single user
                let lastMessage = channel.messages.slice(-1)[0];
                const ownMessage = lastMessage.author===user.username;

                return(
                    <div className="card text-left dash-team white" key={channel.channel}>
                        <div className="card-body">
                            <div className="row justify-content-center align-items-start m-0 cp" onClick={()=>this.openChannel(channel)}>
                                <div className={"col-12 p-0 px-1 text-left f-dark-grey"}>
                                    <p className="fs-md fw-7 flh-1 mb-1 ">
                                        <FormattedMessage id="dash.chat.target"/> {target}
                                    </p>
                                    <p className={"fs-sm fw-4 flh-2 mb-0 "+(ownMessage?"":"d-none")}>
                                        <FormattedMessage id="dash.chat.own"/>: {lastMessage.content}
                                    </p>
                                    <p className={"fs-sm fw-4 flh-2 mb-0 "+(!ownMessage?"":"d-none")}>
                                        {lastMessage.author}: {lastMessage.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        const isDetail = this.state.detail;
        const loaded = this.state.loaded;
        const targetDev = this.state.targetDev;
        const hasChannels = this.state.allChannels.length > 0;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-content-center m-0 dash-title">
                    <div className="col-12 p-0 text-right f-dark-grey">
                        <div className="spacer-2 mb-2 d-none d-lg-block" />
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="dash.chat.title"/></span>
                        <i className="fas fa-fw fa-comments fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className={"row justify-content-start align-content-center py-lg-2 p-0 m-0 no-scrollbar "+(isDetail?"":"d-none")}>
                    <div className={"col-5 col-lg-6 p-2 py-2 px-3 px-lg-2 text-left cp hvr-primary"}
                         onClick={() => this.leaveChannel()}>
                        <i className="fas fa-fw fa-angle-double-left fa-lg flh-1 mr-2"/>
                        <span className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="dash.chat.return"/></span>
                    </div>
                    <div className={"col-7 col-lg-6 p-2 py-2 px-3 px-lg-2 text-right "} >
                        <span className="fs-md fw-4 flh-1 mb-0 f-primary">
                            <FormattedMessage id="dash.chat.targetwith"/>
                            {targetDev.name}
                        </span>
                    </div>
                </div>
                <div className={"row justify-content-center align-content-start m-0 dash-content"}>
                    <div className="col-12 p-0">
                        <div className={"spacer-4 "+(isDetail?"d-none":"")} />
                        {loaded ? "":
                            <div className={"row justify-content-center align-content-center vh-40"}>
                                <div className={"col-12 p-0 text-center f-grey"}>
                                    <i className="fas fa-fw fa-circle-notch fa-spin fa-3x mb-3" />
                                    <p className="fs-md fw-4 flh-1 mb-0"><FormattedMessage id="forms.loading"/></p>
                                </div>
                            </div>}
                        {!isDetail && loaded ?
                            <div className={"row justify-content-center align-content-center m-0"}>
                                <div className="col-12 text-center p-0 dash-team-list">
                                    <Fade bottom cascade>
                                        <p className={"fs-xxs fw-4 flh-1 mb-3 f-dark-grey "+(hasChannels?"":"d-none")}>
                                            <FormattedMessage id="dash.chat.disclaimer"/>
                                        </p>
                                        <div className={"card-columns "+(hasChannels?"":"d-none")} >
                                            { this.allChannels() }
                                        </div>
                                        <div className={"f-dark-grey "+(!hasChannels?"":"d-none")} >
                                            <i className="fas fa-fw fa-comment-slash fa-2x mb-3" />
                                            <p className="fs-md fw-4 flh-1 mb-3"><FormattedMessage id="dash.chat.empty1"/></p>
                                            <p className="fs-xs fw-4 flh-1 mb-2"><FormattedMessage id="dash.chat.empty2"/></p>
                                            <p className="fs-xs fw-4 flh-1 mb-0"><FormattedMessage id="dash.chat.empty3"/></p>
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        :""}
                        {isDetail && loaded ?
                            <Chat {...this.props} channel={this.state.channel} target={this.state.targetDev} onSent={this.sentMessage} update={this.updateChannel}/>
                        :""}
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Chats;
