import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

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

  contactFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  sendEmail() {
    axios.post("/api/contactEmail", this.state);
  }

  render() {
    return (
      <div className="contactFormContainer">
        <div className="messageContainer">
          <div>
            <p className="contactP1">Name: </p>
            <input
              className="contactInput"
              placeholder="First and Last Name"
              onChange={this.contactFormChange}
              name="contactName"
            />
          </div>
          <div>
            <p className="contactP1">Email: </p>
            <input
              className="contactInput"
              placeholder="Email@Website.com"
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

export default Contact;
