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
            cvStatus: null,
            teamValidated: false,
            paymentFile:  props.profile.payment.file,
            newPaymentFile: null,
            paymentFileStatus: null,
        }

        this.openPictureDialog = this.openPictureDialog.bind(this);
        this.uploadPicture = this.uploadPicture.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.removePicture = this.removePicture.bind(this);
        this.openCVDialog = this.openCVDialog.bind(this);
        this.uploadCV = this.uploadCV.bind(this);
        this.handleCVChange = this.handleCVChange.bind(this);
        this.removeCV = this.removeCV.bind(this);
        this.openPaymentFileDialog = this.openPaymentFileDialog.bind(this);
        this.uploadPaymentFile = this.uploadPaymentFile.bind(this);
        this.handlePaymentFileChange = this.handlePaymentFileChange.bind(this);
        this.removePaymentFile = this.removePaymentFile.bind(this);
    }

    componentDidMount() {
        if ( this.props.profile.team === 0) return;
        axios
            .get(URL+"/api/teams/own", {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                },
            })
            .then(res => { this.setState({teamValidated:res.data.validated}); })
            .catch(err => { console.log(err); });
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
            .post(URL+"/api/devs/me/files/profile", data, {
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
            .put(URL+"/api/devs/me/files/profile/remove", {}, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                },
            })
            .then(res => { this.setState({pictureStatus:"removed", newPicture:null, picture:""}); this.props.onSuccess(res.data); })
            .catch(err => { console.log(err); });
    }

    handleCVChange(ev) { ev.preventDefault(); this.setState({ newCV: this.cvInput.files[0] }, () => { this.uploadCV() });};
    openCVDialog(){ this.cvInput.click(); }
    uploadCV(){

        // Validation, under 3MB and PNG or JPEG
        let cv = this.state.newCV;
        if ( cv === undefined ) return;
        if (cv.size > 10000000) { this.setState({cvStatus:"toobig"}); return; }
        let extension = cv.type.split("/")[1];
        if (! (extension === "pdf" ) )
        { this.setState({cvStatus:"notimage"}); return; }

        this.setState({cvStatus:""});

        const data = new FormData();
        data.append('file', cv);

        axios
            .post(URL+"/api/devs/me/files/cv", data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                },
            })
            .then(res => { this.setState({cvStatus:"success", newCV:null, cv:res.data.cv}); this.props.onSuccess(res.data); })
            .catch(err => { console.log(err); });
    }
    removeCV(){
        this.setState({cvStatus:""});
        axios
            .put(URL+"/api/devs/me/files/cv/remove", {}, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                },
            })
            .then(res => { this.setState({cvStatus:"removed", newCV:null, cv:""}); this.props.onSuccess(res.data); })
            .catch(err => { console.log(err); });
    }

    handlePaymentFileChange(ev) { ev.preventDefault(); this.setState({ newPaymentFile: this.paymentFileInput.files[0] }, () => { this.uploadPaymentFile() });};
    openPaymentFileDialog(){ this.paymentFileInput.click(); }
    uploadPaymentFile(){

        // Validation, under 3MB and PNG or JPEG
        let payment = this.state.newPaymentFile;
        if ( payment === undefined ) return;
        if (payment.size > 10000000) { this.setState({paymentFileStatus:"toobig"}); return; }
        let extension = payment.type.split("/")[1];
        if (! (extension === "pdf" || extension === "png" || extension === "jpg" || extension === "jpeg") )
        { this.setState({paymentFileStatus:"notimageorpdf"}); return; }

        this.setState({paymentFileStatus:""});

        const data = new FormData();
        data.append('file', payment);

        axios
            .post(URL+"/api/devs/me/files/paymentFile", data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                },
            })
            .then(res => { this.setState({paymentFileStatus:"success", newPaymentFile:null, paymentFile:res.data.paymentFile}); this.props.onSuccess(res.data); })
            .catch(err => { console.log(err); });
    }
    removePaymentFile(){
        this.setState({paymentFileStatus:""});
        axios
            .put(URL+"/api/devs/me/files/paymentFile/remove", {}, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "x-access-token": localStorage.getItem("jwtToken").split(" ")[1]
                },
            })
            .then(res => { this.setState({paymentFileStatus:"removed", newPaymentFile:null, paymentFile:""}); this.props.onSuccess(res.data); })
            .catch(err => { console.log(err); });
    }

    render() {
        const { intl } = this.props;
        let hasPicture = (this.state.picture !== "");
        let picStatus = this.state.pictureStatus;
        //let newPictureName;
        //if ( this.state.newPicture !== null && this.state.newPicture !== undefined ) newPictureName = this.state.newPicture.name;

        let hasCV = (this.state.cv !== "");
        let cvStatus = this.state.cvStatus;

        let teamValidated = (this.state.teamValidated);
        let hasPaymentFile = (this.state.paymentFile !== "");
        let paymentFileStatus = this.state.paymentFileStatus;

        return(
            <Fade right cascade>
                <div className="row justify-content-center align-items-center m-0 vh-30">
                    <div className="col-12 col-lg-3 p-0 text-center">
                        <img src={URL+"/files/profile/"+this.state.picture} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"":"d-none")}/>
                        <img src={URL+"/files/profile/profile_default.png"} className={"profile-pic pic-img mb-3 mb-lg-0 "+(hasPicture?"d-none":"")}/>
                    </div>
                    <div className="col-12 col-lg-9 p-0 text-left f-grey">
                        <p className={"fs-md fw-4 flh-1 mb-2 "+(hasPicture?"d-none":"")}><FormattedMessage id="dash.profile.files.photo.empty"/></p>
                        <p className={"fs-md fw-4 flh-1 mb-2 "+(hasPicture?"":"d-none")}><FormattedMessage id="dash.profile.files.photo.notempty"/></p>
                        <div className={"alert alert-success py-2 "+(picStatus==="success"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.photo.add.success"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(picStatus==="toobig"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.photo.toobig"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(picStatus==="notimage"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.photo.notimage"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(picStatus==="removed"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.photo.remove.success"/></p>
                        </div>
                        <br />
                        <button onClick={() => this.openPictureDialog()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasPicture?"d-none":"d-inline-flex")}>
                            <p className="fs-sm fw-7 flh-1 mb-0"><FormattedMessage id="dash.profile.files.photo.add"/></p>
                        </button>
                        <button onClick={() => this.openPictureDialog()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasPicture?"d-inline-flex":"d-none")}>
                            <p className="fs-sm fw-7 flh-1 mb-0 mx"><FormattedMessage id="dash.profile.files.photo.addnew"/></p>
                        </button>
                        <button onClick={() => this.removePicture()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasPicture?"d-inline-flex":"d-none")}>
                            <p className="fs-sm fw-7 flh-1 mb-0"><FormattedMessage id="dash.profile.files.photo.delete"/></p>
                        </button>
                        <p className="fs-xs fw-4 flh-1 mt-1"><FormattedMessage id="dash.profile.files.photo.helper"/></p>
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
                    <div className="col-12 col-lg-3 p-0 text-center f-primary">
                        <i className={"far fa-fw fa-file f-grey fa-6x flh-1 "+(hasCV?"d-none":"")}/>
                        <a href={URL+"/files/cv/"+this.state.cv} target={"_blank"} >
                            <i className={"fas fa-fw fa-file-pdf hvr-secondary fa-6x flh-1 "+(hasCV?"":"d-none")}/>
                        </a>
                    </div>
                    <div className="col-12 col-lg-9 p-0 text-left f-grey">
                        <p className={"fs-md fw-4 flh-1 mb-2 "+(hasCV?"d-none":"")}><FormattedMessage id="dash.profile.files.cv.empty"/></p>
                        <p className={"fs-md fw-4 flh-1 mb-2 "+(hasCV?"":"d-none")}><FormattedMessage id="dash.profile.files.cv.notempty"/></p>
                        <div className={"alert alert-success py-2 "+(cvStatus==="success"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.cv.add.success"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(cvStatus==="toobig"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.cv.toobig"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(cvStatus==="notimage"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.cv.notimage"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(cvStatus==="removed"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.cv.remove.success"/></p>
                        </div>
                        <br />
                        <button onClick={() => this.openCVDialog()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasCV?"d-none":"d-inline-flex")}>
                            <p className="fs-sm fw-7 flh-1 mb-0"><FormattedMessage id="dash.profile.files.cv.add"/></p>
                        </button>
                        <button onClick={() => this.openCVDialog()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasCV?"d-inline-flex":"d-none")}>
                            <p className="fs-sm fw-7 flh-1 mb-0 mx"><FormattedMessage id="dash.profile.files.cv.addnew"/></p>
                        </button>
                        <button onClick={() => this.removeCV()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasCV?"d-inline-flex":"d-none")}>
                            <p className="fs-sm fw-7 flh-1 mb-0"><FormattedMessage id="dash.profile.files.cv.delete"/></p>
                        </button>
                        <p className="fs-xs fw-4 flh-1 mt-1"><FormattedMessage id="dash.profile.files.cv.helper"/></p>
                        <input
                            type="file"
                            name="newCV"
                            ref={(ref) => this.cvInput = ref}
                            onChange={this.handleCVChange}
                            className={"d-none"}/>
                    </div>
                </div>
                <hr />
                <div className={"row justify-content-center align-items-center m-0 vh-30 "+(teamValidated?"":"d-none")}>
                    <div className="col-12 col-lg-3 p-0 text-center f-primary">
                        <i className={"far fa-fw fa-file f-grey fa-6x flh-1 "+(hasPaymentFile?"d-none":"")}/>
                        <a href={URL+"/files/paymentFile/"+this.state.paymentFile} target={"_blank"} >
                            <i className={"fas fa-fw fa-file-invoice hvr-secondary fa-6x flh-1 "+(hasPaymentFile?"":"d-none")}/>
                        </a>
                    </div>
                    <div className="col-12 col-lg-9 p-0 text-left f-grey">
                        <p className={"fs-md fw-4 flh-1 mb-2 "+(hasPaymentFile?"d-none":"")}><FormattedMessage id="dash.profile.files.payment.empty"/></p>
                        <p className={"fs-md fw-4 flh-1 mb-2 "+(hasPaymentFile?"":"d-none")}><FormattedMessage id="dash.profile.files.payment.notempty"/></p>
                        <div className={"alert alert-success py-2 "+(paymentFileStatus==="success"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.payment.add.success"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(paymentFileStatus==="toobig"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.payment.toobig"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(paymentFileStatus==="notimageorpdf"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.payment.notimageorpdf"/></p>
                        </div>
                        <div className={"alert alert-danger py-2 "+(paymentFileStatus==="removed"?"d-inline-flex":"d-none")} role="alert">
                            <p className="fs-sm fw-4 flh-1 mb-0"><FormattedMessage id="dash.profile.files.payment.remove.success"/></p>
                        </div>
                        <br />
                        <button onClick={() => this.openPaymentFileDialog()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasPaymentFile?"d-none":"d-inline-flex")}>
                            <p className="fs-sm fw-7 flh-1 mb-0"><FormattedMessage id="dash.profile.files.payment.add"/></p>
                        </button>
                        <button onClick={() => this.openPaymentFileDialog()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasPaymentFile?"d-inline-flex":"d-none")}>
                            <p className="fs-sm fw-7 flh-1 mb-0 mx"><FormattedMessage id="dash.profile.files.payment.addnew"/></p>
                        </button>
                        <button onClick={() => this.removePaymentFile()}
                                className={"btn btn-dev-alt mr-3 my-1 "+(hasPaymentFile?"d-inline-flex":"d-none")}>
                            <p className="fs-sm fw-7 flh-1 mb-0"><FormattedMessage id="dash.profile.files.payment.delete"/></p>
                        </button>
                        <p className="fs-xs fw-4 flh-1 mt-1"><FormattedMessage id="dash.profile.files.payment.helper"/></p>
                        <input
                            type="file"
                            name="newPaymentFile"
                            ref={(ref) => this.paymentFileInput = ref}
                            onChange={this.handlePaymentFileChange}
                            className={"d-none"}/>
                    </div>
                </div>
                <div className={"spacer-2"} />
            </Fade>
        );

    }
}

export default Files;
