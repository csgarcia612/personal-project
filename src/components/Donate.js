import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const dotenv = require("dotenv");
dotenv.config();

class Donate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      amount: 0
    };
    this.onToken = this.onToken.bind(this);
    this.fillUserData = this.fillUserData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fillUserData();
  }

  fillUserData() {
    const { user } = this.props;
    user &&
      this.setState({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
      });
    // console.log(user);
  }

  handleChange(event) {
    // console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value
    });
    // console.log(this.state);
  }

  onToken(token) {
    const creditCharge = {
      token,
      state: this.state
    };
    console.log("creditCharge", creditCharge);
    axios
      .post("/api/stripe", creditCharge)
      .then(res => console.log(res))
      .catch(error => {
        console.log("Error with credit processing", error);
      });
  }

  render() {
    const { name, email, amount } = this.state;
    return (
      <div className="donationFormContainer">
        <div className="donatorInfoContainer">
          <div>
            <p className="donateP1">Name: </p>
            <input
              className="donateInput"
              value={name}
              onChange={this.handleChange}
              name="name"
            />
          </div>
          <div>
            <p className="donateP1">Email: </p>
            <input
              className="donateInput"
              value={email}
              onChange={this.handleChange}
              name="email"
            />
          </div>
          <div>
            <p className="donateP1">Amount: </p>
            <input
              className="donateInput"
              value={amount}
              onChange={this.handleChange}
              type="number"
              name="amount"
            />
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
        <div className="donationContainer">
          {console.log(".env.STRIPE_SECRET", process.env.REACT_APP_STRIPE_KEY)}
          <StripeCheckout
            token={this.onToken}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            image="https://i.imgur.com/Q6Z4mdts.png"
            name="Donate To PawsFurLove"
            description="Thank you for your support"
            email={email}
            amount={amount * 100}
            allowRememberMe={false}
          />
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

export default withRouter(connect(mapStateToProps)(Donate));
