import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setUser } from "../dux/reducer";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      allowEdit: false
    };
    this.updateEditStatus = this.updateEditStatus.bind(this);
  }

  updateEditStatus() {
    this.setState({
      allowEdit: true
    });
  }

  deleteUser() {
    axios.delete("/api/user-info").then(res => {
      this.props.setUser(null);
    });
  }

  render() {
    const { allowEdit } = this.state;
    const { user } = this.props;
    return (
      <div className="userProfilePageContainer">
        {allowEdit === false ? (
          <div className="userProfilePageContainer2">
            <div className="buttonsContainer">
              <div className="editBtnContainer">
                <button
                  className="editProfileBtn"
                  onClick={this.updateEditStatus}
                >
                  EDIT PROFILE
                </button>
              </div>
            </div>
            {user && (
              <div className="userProfileContainer">
                <div className="userPicInfoContainer">
                  <div className="userProfilePicContainer">
                    <img
                      className="userProfilePic"
                      src={user && user.image_url}
                      alt="User Profile Imagery"
                    />
                  </div>
                  <div className="userProfileInfoContainer">
                    <div className="userInfoContainer">
                      <p className="userP1">USERNAME: {user.username}</p>
                      <p className="userP2">FIRST NAME: {user.first_name}</p>
                      <p className="userP2">LAST NAME: {user.last_name}</p>
                      <p className="userP3">EMAIL: {user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="userBioContainer1">
                  <div className="userBioContainer2">
                    <p className="userP4">
                      BIO: {user.bio ? user.bio : "No Bio Saved"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="userProfilePageContainer2">
            <div className="buttonsContainer">
              <div className="saveProfileBtnContainer">
                <button
                  className="saveProfileBtn"
                  onClick={this.saveProfileChanges}
                >
                  UPDATE PROFILE
                </button>
                <div className="deleteBtnContainer">
                  <button className="deleteUserBtn" onClick={this.deleteUser}>
                    DELETE USER
                  </button>
                </div>
              </div>
            </div>
            <div className="userProfileContainer">
              USER PROFILE EDIT INPUT FIELDS
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  setUser: setUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserProfile)
);
