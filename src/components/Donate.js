import React, { Component } from "react";

export default class Donate extends Component {
  render() {
    return (
      <div className="donationFormContainer">
        <div className="donatorInfoContainer">
          <div>
            <p className="contactP1">Name: </p>
            <input className="contactInput" placeholder="First and Last Name" />
          </div>
          <div>
            <p className="contactP1">Email: </p>
            <input className="contactInput" placeholder="Email@Website.com" />
          </div>
          <div>
            <p className="contactP2">Message: </p>
            <input
              className="contactInput"
              maxLength="75"
              placeholder="Message"
            />
          </div>
        </div>
        <div className="donationContainer">PUT DONATION STRIPE HERE</div>
      </div>
    );
  }
}
