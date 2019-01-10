import React, { Component } from "react";
import axios from "axios";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      contactName: "",
      contactEmailAddress: "",
      contactSubject: "",
      contactMessage: ""
    };
    this.contactFormChange = this.contactFormChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentDidMount() {
    this.fillUserData();
  }

  fillUserData() {
    const { user } = this.props;
    user &&
      this.setState({
        contactName: `${user.first_name} ${user.last_name}`,
        contactEmailAddress: user.email
      });
    // console.log(user);
  }

  contactFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  sendEmail() {
    axios.post("/api/contactEmail", this.state);
  }

  render() {
    // console.log(this.state);
    const { contactName, contactEmailAddress } = this.state;
    return (
      <div className="contactFormContainer">
        <div className="messageContainer">
          <div>
            <p className="contactP1">Name: </p>
            <input
              className="contactInput"
              value={contactName}
              onChange={this.contactFormChange}
              name="contactName"
            />
          </div>
          <div>
            <p className="contactP1">Email: </p>
            <input
              className="contactInput"
              value={contactEmailAddress}
              onChange={this.contactFormChange}
              name="contactEmailAddress"
            />
          </div>
          <div>
            <p className="contactP2">Subject: </p>
            <input
              className="contactInputSubject"
              maxLength="50"
              placeholder="Message Subject"
              onChange={this.contactFormChange}
              name="contactSubject"
            />
          </div>
          <div>
            <p className="contactP2">Message: </p>
            <textarea
              className="contactInputMessage"
              maxLength="500"
              placeholder="Message"
              onChange={this.contactFormChange}
              name="contactMessage"
            />
          </div>
        </div>
        <div className="submitBtnContainer">
          <NavLink to="/" onClick={this.sendEmail}>
            <button className="contactSubmitButton">Submit</button>
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(Contact));
