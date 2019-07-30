import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage, injectIntl} from "react-intl";
import ReactDOM from "react-dom";

class Idea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAll: false,
        };
        this.toggleInfo = this.toggleInfo.bind(this);
    }

    toggleInfo(){
        this.setState(state => ({ showAll: !state.showAll }));
    };

    render() {
        var timeago = require("timeago.js");
        const { intl } = this.props;
        let idea = this.props.idea;
        let methods = this.props.methods;
        let showAll = (this.state.showAll ? "":"nowrap")

        return(
            <div className="col-12 col-lg-6">
                <div className="row justify-content-center align-items-center sd-idea m-1 px-3 py-2">
                    <div className="col-7 col-lg-8 p-0 text-left f-light-grey no-scrollbar " style={{overflowX: "scroll", whiteSpace:"nowrap"}}>
                        <span className="fs-xs fw-4 mr-2">#{idea.number}</span>
                        <span className="fs-xs fw-4 mr-2">
                            <i className={"fas fa-fw fa-sm mr-1 mb-2 fa-user"}/>
                            {idea.name}
                        </span>
                        <span className="fs-xs fw-4 mr-2">
                            <i className={"fas fa-fw fa-sm mr-1 fa-at"}/>
                            {idea.email}
                        </span>
                        <span className="fs-xs fw-4 mr-2">
                            <i className={"far fa-fw fa-sm mr-1 fa-calendar"}/>
                            {timeago.format(idea.date)}
                        </span>
                    </div>
                    <div className="col-5 col-lg-4 p-0 text-right f-grey">
                        <i onClick={() => methods.test1(idea.number)}
                            className={"fas fa-fw fa-md mx-1 fa-check f-green "+(idea.approved?"d-inline":"d-none")}
                           title={intl.formatMessage({ id: 'staffdash.ideas.approved' })} />
                        <i className={"fas fa-fw fa-md mx-1 fa-times f-red "+(idea.approved?"d-none":"d-inline")}
                           title={intl.formatMessage({ id: 'staffdash.ideas.disapproved' })} />
                        <i className={"fas fa-fw fa-md mx-1 fa-eye f-green "+(!idea.hidden?"d-inline":"d-none")}
                           title={intl.formatMessage({ id: 'staffdash.ideas.isvisible' })} />
                        <i className={"fas fa-fw fa-md mx-1 fa-eye-slash f-red "+(!idea.hidden?"d-none":"d-inline")}
                           title={intl.formatMessage({ id: 'staffdash.ideas.hidden' })} />
                        <i className={"fas fa-fw fa-md mx-1 fa-star f-yellow "+(idea.highlighted?"d-inline":"d-none")}
                           title={intl.formatMessage({ id: 'staffdash.ideas.ishighlighted' })} />
                        <i className={"far fa-fw fa-md mx-1 fa-star "+(idea.highlighted?"d-none":"d-inline")}
                           title={intl.formatMessage({ id: 'staffdash.ideas.nothighlighted' })} />
                        <i onClick={this.toggleInfo} className={"fas fa-fw fa-md ml-3 "+(showAll?"fa-chevron-down":"fa-chevron-up")} />
                    </div>
                    <div className="col-12 p-0 text-left">
                        <p className="fs-sm fw-7 flh-2 mb-0">{idea.title}</p>
                    </div>
                    <div className="col-12 p-0 text-left" style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: showAll}}>
                        <p className="fs-sm fw-4 flh-2 mb-0 f-dark-grey">{idea.description}</p>
                    </div>
                </div>
                {/*
                <p className="fs-md fw-7 flh-2 mb-1">
                    {idea.title}
                    <span className="fs-sm fw-4 f-light-grey ml-2">#{idea.number}</span>
                </p>
                <p className="fs-sm fw-4 flh-2 mb-1 f-dark-grey">{idea.description}</p>
                <p className="fs-xxs fw-2 flh-2 mb-0 f-grey text-right">
                    <FormattedMessage id="ideas.origin" values={{
                        name: idea.name,
                        //date: idea.date
                    }}/>
                </p>
                */}
            </div>
        );

    }
}

export default injectIntl(Idea);
