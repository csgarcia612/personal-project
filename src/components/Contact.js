import React, { Component } from "react";

export default class contact extends Component {
  render() {
    return (
      <div className="contactFormContainer">
        <div className="messageContainer">
          <input placeholder="First and Last Name">Name</input>
          <input placeholder="email@website.com">Email</input>
          <input placeholder="Message Subject">Subject</input>
          <input placeholder="Message">Message</input>
        </div>
        <div className="submitBtnContainer">
          <button>Submit</button>
        </div>
      </div>
    );
  }
}
