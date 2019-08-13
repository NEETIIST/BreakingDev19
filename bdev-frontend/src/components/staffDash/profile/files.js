import React, { Component } from "react";
import {FormattedMessage} from "react-intl";
import Fade from 'react-reveal/Fade';
import axios from "axios";
import URL from "../../../utils/requestsURL";

class Files extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            picture: props.profile.picture,
            newPicture: null,
            pictureStatus: null,
            cv:  props.profile.cv,
            newCV: null,
        }

        this.openPictureDialog = this.openPictureDialog.bind(this);
        this.uploadPicture = this.uploadPicture.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.removePicture = this.removePicture.bind(this);
    }

    handlePictureChange(ev) { ev.preventDefault(); this.setState({ newPicture: this.pictureInput.files[0] }, () => { this.uploadPicture() });};
    openPictureDialog(){ this.pictureInput.click(); }
    uploadPicture(){

        // Validation, under 3MB and PNG or JPEG
        let picture = this.state.newPicture;
        if ( picture === undefined ) return;
        if (picture.size > 3000000) { this.setState({pictureStatus:"toobig"}); return; }
        let extension = picture.type.split("/")[1];
        if (! (extension === "png" || extension === "jpg" || extension === "jpeg" ) )
            { this.setState({pictureStatus:"notimage"}); return; }

        this.setState({pictureStatus:""});

        const data = new FormData();
        data.append('file', picture);

        axios
            .post(URL+"/api/staff/me/upload/picture", data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                },
            })
            .then(res => { this.setState({pictureStatus:"success", newPicture:null, picture:res.data.picture}); this.props.onSuccess(res.data); })
            .catch(err => { console.log(err); });
    }

    removePicture(){
        this.setState({pictureStatus:""});
        axios
            .put(URL+"/api/staff/me/upload/picture/remove", {}, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                },
            })
            .then(res => { this.setState({pictureStatus:"removed", newPicture:null, picture:""}); this.props.onSuccess(res.data); })
            .catch(err => { console.log(err); });
    }

    render() {
        const { intl } = this.props;
        let hasPicture = (this.state.picture !== "");


        let newPictureName;
        if ( this.state.newPicture !== null && this.state.newPicture !== undefined ) newPictureName = this.state.newPicture.name;
        let picStatus = this.state.pictureStatus;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-items-center m-0 vh-30">
                    <div className="col-12 col-lg-3 p-0 text-center">
                        <img src={"/profile/"+this.state.picture} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"":"d-none")}/>
                        <img src={"/profile/profile_default.png"} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"d-none":"")}/>
                    </div>
                    <div className="col-12 col-lg-9 p-0 text-left f-grey">
                        <p className={"fs-md fw-4 flh-1 mb-2 "+(hasPicture?"d-none":"")}><FormattedMessage id="staffdash.profile.files.photo.empty"/></p>
                        <p className={"fs-md fw-4 flh-1 mb-2 "+(hasPicture?"":"d-none")}><FormattedMessage id="staffdash.profile.files.photo.notempty"/></p>
                        <div className={"alert alert-success py-2 "+(picStatus==="success"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.profile.files.photo.add.success"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(picStatus==="toobig"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.profile.files.photo.toobig"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(picStatus==="notimage"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.profile.files.photo.notimage"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(picStatus==="removed"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="staffdash.profile.files.photo.remove.success"/></p>
                        </div>
                        <br />
                        <button onClick={() => this.openPictureDialog()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasPicture?"d-none":"d-inline-flex")}>
                            <p className="fs-sm fw-7 flh-1 mb-0"><FormattedMessage id="staffdash.profile.files.photo.add"/></p>
                        </button>
                        <button onClick={() => this.openPictureDialog()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasPicture?"d-inline-flex":"d-none")}>
                            <p className="fs-sm fw-7 flh-1 mb-0 mx"><FormattedMessage id="staffdash.profile.files.photo.addnew"/></p>
                        </button>
                        <button onClick={() => this.removePicture()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasPicture?"d-inline-flex":"d-none")}>
                            <p className="fs-sm fw-7 flh-1 mb-0"><FormattedMessage id="staffdash.profile.files.photo.delete"/></p>
                        </button>
                        <p className="fs-xs fw-4 flh-1 mt-1"><FormattedMessage id="staffdash.profile.files.photo2"/></p>
                        {/* <span className={"fs-xs fw-4 flh-3 mb-0 ml-2 mt-1 "+(newPictureName!==undefined?"d-inline":"d-none")}>{newPictureName}</span> */}
                        <input
                            type="file"
                            name="newPicture"
                            ref={(ref) => this.pictureInput = ref}
                            onChange={this.handlePictureChange}
                            className={"d-none"}/>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center align-items-center m-0 vh-30">
                    <div className="col-12 col-lg-4 p-0 text-center">

                    </div>
                    <div className="col-12 col-lg-8 p-0 text-center">

                    </div>
                </div>
                <div className={"spacer-2"} />
            </Fade>
        );

    }
}

export default Files;
