import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Switch, NavLink, Route } from "react-router-dom";
import { connect } from "react-redux";
import Adopt from "./components/Adopt";
import Contact from "./components/Contact";
import Donate from "./components/Donate";
import Homepage from "./components/Homepage";
import UserProfile from "./components/UserProfile";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    let redirectUri = encodeURIComponent(window.location.origin + "/callback");
    window.location = `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/authorize?client_id=${
      process.env.REACT_APP_AUTH0_CLIENT_ID
    }&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  }

  logout() {
    axios.post("/api/logout").then(response => {
      this.setState({
        user: ""
      });
    });
  }
  // HOW TO REDIRECT BACK TO HOMEPAGE ONCE LOGGED OUT???

  render() {
    const { user } = this.props;
    return (
      <div className="App">
        <header>
          <div className="siteNameContainer">
            <h1 className="siteName">PAWS FUR LOVE</h1>
          </div>
          <div className="menu">
            <NavLink to="/" className="navLinks" activeClassName="active">
              Home
            </NavLink>
            <NavLink to="/adopt" className="navLinks" activeClassName="active">
              Adopt
            </NavLink>
            <NavLink to="/donate" className="navLinks" activeClassName="active">
              Donate
            </NavLink>
            <NavLink
              to="/contact"
              className="navLinks"
              activeClassName="active"
            >
              Contact
            </NavLink>
            <div className="loginLogoutBtnContainer">
              {user ? (
                <div>
                  <NavLink
                    to="/user"
                    className="navLinks"
                    activeClassName="active"
                  >
                    {user.username}
                  </NavLink>
                  <button className="logoutButton" onClick={this.logout}>
                    LOGOUT
                  </button>
                </div>
              ) : (
                <button className="loginButton" onClick={this.login}>
                  LOGIN
                </button>
              )}
            </div>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/user" component={UserProfile} />
          <Route path="/adopt" component={Adopt} />
          <Route path="/contact" component={Contact} />
          <Route path="/donate" component={Donate} />
        </Switch>
      </div>
    );
  }
}

export default App;
