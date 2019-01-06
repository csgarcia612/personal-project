import React, { Component } from "react";

export default class Donate extends Component {
  render() {
    return (
      <div className="donationFormContainer">
        <div className="donatorInfoContainer">
          <div>
            <p className="donateP1">Name: </p>
            <input className="donateInput" placeholder="First and Last Name" />
          </div>
          <div>
            <p className="donateP1">Email: </p>
            <input className="donateInput" placeholder="Email@Website.com" />
          </div>
          <div>
            <p className="donateP2">Message: </p>
            <textarea
              className="donateInputMessage"
              maxLength="250"
              placeholder="Message"
            />
          </div>
        </div>
        <div className="donationContainer">PUT DONATION STRIPE HERE</div>
      </div>
    );
  }
}
