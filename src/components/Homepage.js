import React, { Component } from "react";

export default class Homepage extends Component {
  render() {
    return (
      <div className="homepageContainer">
        <div className="welcomeBannerContainer">
          <div className="gifContainer">
            <svg viewBox="0 0 500 500">
              <path
                id="curve"
                // d="M50,250 a1,1 0 1,1 400,0"
                // d="M25,250 a1,1 0 1,1 450,0"
                // d="M40,250 a1,1 0 1,1 425,0"
                d="M45,250 a1,1 0 1,1 410,0"
              />
              <text className="curvedText" width="500">
                <textPath href="#curve">
                  * Please Don't Shop . . . Just Adopt *
                </textPath>
              </text>
            </svg>
            <img
              className="dogGif"
              src="../images/smiling-dog.gif"
              alt="Smiling dog reads text rendered above"
            />
          </div>
        </div>
      </div>
    );
  }
}
