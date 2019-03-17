import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <h4>
                    <b>Hey there,</b> {user.name.split(" ")[0]}
                    <p>
                        You are logged into a full-stack{" "}
                        <span>MERN</span> app 👏
                    </p>
                </h4>
                <button
                    onClick={this.onLogoutClick}
                >
                    Logout
                </button>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
