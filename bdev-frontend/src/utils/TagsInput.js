import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import Idea from "../components/staffDash/ideas/idea";

class TagsInput extends Component {
    constructor(props) {
        super(props);
        let oldTags = [];
        if ( props.data[0] !== "" )  oldTags=props.data;
        this.state = {
            tags: oldTags,
            newTag: "",
        };
        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
        this.lookupTag(event.target.value);
    };
    fieldHasValue = field => {return ( this.state[field] !== "" ? "form-alt-input-hasvalue" : "");};

    lookupTag(string){ if (string.indexOf(",") > -1 ) this.addTag(); }
    toTitleCase(phrase){ return phrase.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');}

    addTag(){
        let state = this.state;
        state.newTag = this.toTitleCase((state.newTag));
        if ( state.newTag !== "" && state.tags.indexOf(state.newTag) === -1 && state.newTag.replace(/\s/g, '').length && state.newTag.length < 128)
            state.tags.push(state.newTag);
        state.newTag = "";
        this.setState(state);
        this.props.update(this.state.tags);
    }

    removeTag(index){
        let newTags = this.state.tags;
        newTags.splice(index, 1);
        this.setState({tags:newTags});
        this.props.update(this.state.tags);
        console.log(this.state.tags);
    }

    allTags() {
        if ( this.state.tags.length === 0)
            return <p className="fs-xs fw-4 flh-1 mt-2 pr-lg-2"><FormattedMessage id="forms.skills.empty"/></p>;
        else
            return (
                this.state.tags.map((tag, index) => {
                    return(
                        <div className="tag px-2 py-0 m-1">
                            <span key={index} className="fs-xs fw-4 flh-1 my-1">{tag}</span>
                            <i onClick={() => this.removeTag(index)} className="fas fa-minus-circle fa-sm f-primary flh-1 ml-2 my-1 cp" />
                        </div>
                    )
                })
            );
    };

    render() {
        //const profile = this.props.profile;
        const { intl } = this.props;

        return(
            <div className="row justify-content-center align-items-start m-0 my-2">
                <div className="col-12 col-lg-2 p-0 pr-2 pb-1">
                        <input type="text"
                               className={"form-control form-alt-input " + this.fieldHasValue("newTag")}
                               name="newTag"
                               placeholder={intl.formatMessage({id: 'forms.skills.placeholder'})}
                               onChange={this.handleInputChange}
                               value={this.state.newTag}
                        />
                </div>
                {/*
                <div className="col-1 p-0">
                    <i onClick={this.addTag} className="fas fa-plus fa-md f-primary" />
                </div>
                */}
                <div className="col-12 col-lg-10 p-0 pt-1">
                    {this.allTags()}
                </div>
            </div>
        );

    }
}

export default TagsInput;


{/*
this.props.onSuccess(res.data);

<div className="form-group">
    <div className={validation.bio.isInvalid && 'has-error'}>
        <input type="text"
               className={"form-control form-alt-input " + this.fieldHasValue("skills")}
               name="skills"
               placeholder={intl.formatMessage({id: 'forms.skills.placeholder'})}
               onChange={this.handleInputTagChange}
               value={this.state.skills}
        />
        <span className="help-block fs-xs"><FormattedMessage id={validation.bio.message}/></span>
    </div>
</div>

 this.state.ideas.map((idea, index) => { return <Idea idea={idea} key={idea.number} methods={{
                    hideIdea: (number) => this.hideIdea(number),
                    showIdea: (number) => this.showIdea(number),
                    approveIdea: (number) => this.approveIdea(number),
                    disapproveIdea: (number) => this.disapproveIdea(number),
                }} /> })
*/}
