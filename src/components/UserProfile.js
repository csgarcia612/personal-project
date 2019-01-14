import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setUser } from "../dux/reducer";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      bio: "",
      image_url: "",
      allowEdit: false
    };
    this.fillUserData = this.fillUserData.bind(this);
    this.updateEditStatus = this.updateEditStatus.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.cancelProfileEdit = this.cancelProfileEdit.bind(this);
    this.saveProfileChanges = this.saveProfileChanges.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fillUserData();
  }

  fillUserData() {
    const { user } = this.props;
    user &&
      this.setState({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        bio: user.bio,
        image_url: user.image_url
      });
  }

  updateEditStatus() {
    this.setState({
      allowEdit: true
    });
  }

  handleChange(event) {
    // console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value
    });
    // console.log(this.state);
  }

  deleteUser() {
    const { user } = this.props;
    axios.delete(`/api/deleteUser/${user.auth0_id}`).then(res => {
      this.props.setUser(null);
      this.props.history.push("/");
    });
  }

  cancelProfileEdit() {
    this.setState({
      allowEdit: false
    });
  }

  saveProfileChanges() {
    const { user } = this.props;
    axios
      .put(`/api/updateUser/${user.auth0_id}`, this.state)
      .then(res => {
        axios.get("/api/user-data").then(res => {
          // console.log(res);
          this.props.setUser(res.data.user);
        });
      })
      .then(
        this.setState({
          allowEdit: false
        }),
        this.props.history.push(`/user/${this.state.username}`)
      );
  }

  render() {
    const {
      username,
      first_name,
      last_name,
      email,
      bio,
      image_url,
      allowEdit
    } = this.state;
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
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src =
                          "http://profilepicturesdp.com/wp-content/uploads/2018/06/default-profile-picture-5.jpg";
                      }}
                      alt="User Profile Imagery"
                    />
                  </div>
                  <div className="userProfileInfoContainer">
                    <div className="userInfoContainer">
                      <div className="usernameContainer">
                        <p className="userP1">USERNAME: {user.username}</p>
                      </div>
                      <div className="firstNameContainer">
                        <p className="userP2">FIRST NAME: {user.first_name}</p>
                      </div>
                      <div className="lastNameContainer">
                        <p className="userP2">LAST NAME: {user.last_name}</p>
                      </div>
                      <div className="emailContainer">
                        <p className="userP1">EMAIL: {user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="userBioContainer">
                  <div className="BioContainer">
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
              <div className="deleteBtnContainer">
                <button className="deleteUserBtn" onClick={this.deleteUser}>
                  DELETE USER
                </button>
              </div>
              <div className="cancelEditBtnContainer">
                <button
                  className="cancelEditBtn"
                  onClick={this.cancelProfileEdit}
                >
                  CANCEL
                </button>
              </div>
              <div className="saveProfileBtnContainer">
                <button
                  className="saveProfileBtn"
                  onClick={this.saveProfileChanges}
                >
                  SAVE CHANGES
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
                      <div className="usernameContainer">
                        <p className="editUserP1">USERNAME: </p>
                        <input
                          className="editUserInput1"
                          value={username}
                          onChange={this.handleChange}
                          name="username"
                        />
                      </div>
                      <div className="firstNameContainer">
                        <p className="editUserP1">FIRST NAME: </p>
                        <input
                          className="editUserInput1"
                          value={first_name}
                          onChange={this.handleChange}
                          name="first_name"
                        />
                      </div>
                      <div className="lastNameContainer">
                        <p className="editUserP1">LAST NAME: </p>
                        <input
                          className="editUserInput1"
                          value={last_name}
                          onChange={this.handleChange}
                          name="last_name"
                        />
                      </div>
                      <div className="emailContainer">
                        <p className="editUserP1">EMAIL: </p>
                        <input
                          className="editUserInput1"
                          value={email}
                          onChange={this.handleChange}
                          name="email"
                        />
                      </div>
                      <div className="imageUrlContainer">
                        <p className="editUserP1">IMAGE URL: </p>
                        <input
                          className="editUserInput1"
                          value={image_url}
                          onChange={this.handleChange}
                          name="image_url"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="userBioContainer1">
                  <div className="userBioContainer2">
                    <div className="bioContainer">
                      <p className="editUserP2">BIO: </p>
                      <textarea
                        className="editUserInput2"
                        maxLength="750"
                        value={bio ? bio : "No Bio Saved"}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
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
