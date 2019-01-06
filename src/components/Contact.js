import React, { Component } from "react";

export default class Contact extends Component {
  render() {
    return (
      <div className="contactFormContainer">
        <div className="messageContainer">
          <div>
            <p className="contactP1">Name: </p>
            <input className="contactInput" placeholder="First and Last Name" />
          </div>
          <div>
            <p className="contactP1">Email: </p>
            <input className="contactInput" placeholder="Email@Website.com" />
          </div>
          <div>
            <p className="contactP2">Subject: </p>
            <input
              className="contactInputSubject"
              maxLength="50"
              placeholder="Message Subject"
            />
          </div>
          <div>
            <p className="contactP2">Message: </p>
            <textarea
              className="contactInputMessage"
              maxLength="500"
              placeholder="Message"
            />
          </div>
        </div>
        <div className="submitBtnContainer">
          <button className="contactSubmitButton">Submit</button>
        </div>
        <div className="contactContainer">PUT NODEMAILER CONNECT HERE</div>
      </div>
    );
  }
}
