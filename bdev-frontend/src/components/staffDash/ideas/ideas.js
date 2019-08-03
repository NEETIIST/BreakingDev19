import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import {FormattedMessage} from "react-intl";
import ReactDOM from "react-dom";
import axios from "axios";
import Idea from "./idea";
import URL from "../../../utils/requestsURL";

class Ideas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ideas:[],
            content: "pending"
        };

        this.hideIdea = this.hideIdea.bind(this);
        this.showIdea = this.showIdea.bind(this);
        this.approveIdea = this.approveIdea.bind(this);
        this.disapproveIdea = this.disapproveIdea.bind(this);
        this.favoriteIdea = this.favoriteIdea.bind(this);
        this.unfavoriteIdea = this.unfavoriteIdea.bind(this);
    }

    componentDidMount() {
        //ReactDOM.findDOMNode(this).scrollIntoView();
        this.getIdeas();
    }

    getIdeas(){
        axios.get(URL+'/api/ideas/all',
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1],
                }
            })
            .then(response => {
                this.setState({ ideas: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    navigation = (content) => {
        this.setState(state => ({ content: content }));
    };

    hideIdea(number){
        axios.post(URL+'/api/ideas/hide/'+number,{},
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1],
                }
            })
            .then(response => {
                if ( response.status === 200 )
                {
                    let ideas = this.state.ideas;
                    ideas.find(idea => idea.number === number).hidden = true;
                    this.setState({ ideas: ideas });
                }
            })
            .catch(function (error){console.log(error);})
    };

    showIdea(number){
        axios.post(URL+'/api/ideas/show/'+number,{},
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1],
                }
            })
            .then(response => {
                if ( response.status === 200 )
                {
                    let ideas = this.state.ideas;
                    ideas.find(idea => idea.number === number).hidden = false;
                    this.setState({ ideas: ideas });
                }
            })
            .catch(function (error){console.log(error);})
    };

    approveIdea(number){
        axios.post(URL+'/api/ideas/approve/'+number,{},
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1],
                }
            })
            .then(response => {
                if ( response.status === 200 )
                {
                    let ideas = this.state.ideas;
                    ideas.find(idea => idea.number === number).approved = true;
                    this.setState({ ideas: ideas });
                }
            })
            .catch(function (error){console.log(error);})
    };

    disapproveIdea(number){
        axios.post(URL+'/api/ideas/disapprove/'+number,{},
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1],
                }
            })
            .then(response => {
                if ( response.status === 200 )
                {
                    let ideas = this.state.ideas;
                    ideas.find(idea => idea.number === number).approved = false;
                    this.setState({ ideas: ideas });
                }
            })
            .catch(function (error){console.log(error);})
    };

    favoriteIdea(number){
        axios.post(URL+'/api/ideas/favorite/'+number,{},
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1],
                }
            })
            .then(response => {
                if ( response.status === 200 )
                {
                    let ideas = this.state.ideas;
                    ideas.find(idea => idea.number === number).highlighted = true;
                    this.setState({ ideas: ideas });
                }
            })
            .catch(function (error){console.log(error);})
    };

    unfavoriteIdea(number){
        axios.post(URL+'/api/ideas/unfavorite/'+number,{},
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1],
                }
            })
            .then(response => {
                if ( response.status === 200 )
                {
                    let ideas = this.state.ideas;
                    ideas.find(idea => idea.number === number).highlighted = false;
                    this.setState({ ideas: ideas });
                }
            })
            .catch(function (error){console.log(error);})
    };



    allIdeas() {
        if ( this.state.ideas.length === 0)
            return <p className="fs-md fw-4 flh-1 my-3"><FormattedMessage id="staffdash.ideas.empty"/></p>;
        else
            return (
                this.state.ideas.map((idea, index) => { return <Idea idea={idea} key={idea.number} methods={{
                    hideIdea: (number) => this.hideIdea(number),
                    showIdea: (number) => this.showIdea(number),
                    approveIdea: (number) => this.approveIdea(number),
                    disapproveIdea: (number) => this.disapproveIdea(number),
                    favoriteIdea: (number) => this.favoriteIdea(number),
                    unfavoriteIdea: (number) => this.unfavoriteIdea(number),
                }} /> })

            );
    };
    visibleIdeas() {
        let filteredData = this.state.ideas.filter( (idea) => { return( idea.hidden===false ? idea : null) });
        if ( filteredData.length === 0)
            return <p className="fs-md fw-4 flh-1 my-3"><FormattedMessage id="staffdash.ideas.empty"/></p>;
        else
            return filteredData.map((idea, index) => { return <Idea idea={idea} key={idea.number} methods={{
                hideIdea: (number) => this.hideIdea(number),
                showIdea: (number) => this.showIdea(number),
                approveIdea: (number) => this.approveIdea(number),
                disapproveIdea: (number) => this.disapproveIdea(number),
                favoriteIdea: (number) => this.favoriteIdea(number),
                unfavoriteIdea: (number) => this.unfavoriteIdea(number),
            }} /> });
    };
    pendingIdeas() {
        let filteredData = this.state.ideas.filter( (idea) => { return( idea.approved===false && idea.hidden===false ? idea : null) });
        if ( filteredData.length === 0)
            return <p className="fs-md fw-4 flh-1 my-3"><FormattedMessage id="staffdash.ideas.empty"/></p>;
        else
            return filteredData.map((idea, index) => { return <Idea idea={idea} key={idea.number} methods={{
                hideIdea: (number) => this.hideIdea(number),
                showIdea: (number) => this.showIdea(number),
                approveIdea: (number) => this.approveIdea(number),
                disapproveIdea: (number) => this.disapproveIdea(number),
                favoriteIdea: (number) => this.favoriteIdea(number),
                unfavoriteIdea: (number) => this.unfavoriteIdea(number),
            }} /> });
    };


    render() {
        let content = this.state.content;

        return(
            <Fade bottom cascade>
                <div className="row justify-content-center align-content-center m-0 vh-10">
                    <div className="col-11 col-lg-11 p-0 text-right f-primary">
                        <div className="spacer-2 mb-2"></div>
                        <span className="fs-lg fw-7 flh-1"><FormattedMessage id="staffdash.ideas.title"/></span>
                        <i className="fas fa-fw fa-lightbulb fa-lg flh-1 ml-2"></i>
                        <hr className="m-0 mt-3"/>
                    </div>
                </div>
                <div className="row justify-content-center align-content-center m-0 vh-10">
                    <div className="col-11 p-0">
                        <div className="spacer-2"></div>
                        <div className={"row justify-content-center align-content-center m-0 "} >
                            <div className={"col col-lg-3 p-2 text-center cp dash-subopt"+ (content==="all" ? "-active" :"")}
                                 onClick={() => this.navigation("all")}>
                                <i className="fas fa-fw fa-list fa-lg flh-1 mr-2"/>
                                <span className="fs-md fw-4 flh-1 mb-0 d-none d-lg-inline"><FormattedMessage id="staffdash.ideas.all"/></span>
                            </div>
                            <div className={"col col-lg-3 p-2 text-center cp dash-subopt"+ (content==="visible" ? "-active" :"")}
                                 onClick={() => this.navigation("visible")}>
                                <i className="fas fa-fw fa-check fa-lg flh-1 mr-2"/>
                                <span className="fs-md fw-4 flh-1 mb-0 d-none d-lg-inline"><FormattedMessage id="staffdash.ideas.visible"/></span>
                            </div>
                            <div className={"col col-lg-3 p-2 text-center cp dash-subopt"+ (content==="pending" ? "-active" :"")}
                                 onClick={() => this.navigation("pending")}>
                                <i className="fas fa-fw fa-gavel fa-lg flh-1 mr-2"/>
                                <span className="fs-md fw-4 flh-1 mb-0 d-none d-lg-inline"><FormattedMessage id="staffdash.ideas.pending"/></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center align-content-start m-0">
                    <div className="col-11 p-0">
                        <div className="row justify-content-center align-content-start py-3 vh-80 overflow-auto" style={{maxHeight:"80vh"}}>
                            {content === "all" ? this.allIdeas() : ""}
                            {content === "visible" ? this.visibleIdeas() : ""}
                            {content === "pending" ? this.pendingIdeas() : ""}
                        </div>
                    </div>
                </div>
            </Fade>
        );

    }
}

export default Ideas;
