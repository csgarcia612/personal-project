import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Switch, NavLink, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Adopt from "./components/Adopt";
import Contact from "./components/Contact";
import Donate from "./components/Donate";
import Homepage from "./components/Homepage";
import UserProfile from "./components/UserProfile";
import AnimalProfile from "./components/AnimalProfile";
import { setUser } from "./dux/reducer";

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios.get("/api/user-data").then(res => {
      // console.log(res);
      this.props.setUser(res.data.user);
    });
  }

  login() {
    let redirectUri = encodeURIComponent(window.location.origin + "/callback");
    window.location = `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/authorize?client_id=${
      process.env.REACT_APP_AUTH0_CLIENT_ID
    }&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    // console.log("redirectUri", redirectUri);
  }

  logout() {
    axios.post("/api/logout").then(res => {
      this.props.setUser(null);
      this.props.history.push("/");
    });
  }

  render() {
    const { user } = this.props;
    // console.log(user);
    return (
      <div className="App">
        <header>
          <div className="siteNameContainer">
            <h1 className="siteName">PAWS FUR LOVE</h1>
          </div>
          <div className="menu">
            <NavLink exact to="/" className="navLinks" activeClassName="active">
              Home
            </NavLink>
            <NavLink
              exact
              to="/adopt"
              className="navLinks"
              activeClassName="active"
            >
              Adopt
            </NavLink>
            <NavLink
              exact
              to="/donate"
              className="navLinks"
              activeClassName="active"
            >
              Donate
            </NavLink>
            <NavLink
              exact
              to="/contact"
              className="navLinks"
              activeClassName="active"
            >
              Contact
            </NavLink>
            <div className="loginLogoutBtnContainer">
              {user ? (
                <div className="menu">
                  <NavLink
                    exact
                    to={`/user/${user.username}`}
                    className="navLinks"
                    activeClassName="active"
                  >
                    {user.first_name}
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
        <div className="mainDisplay">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/user" component={UserProfile} />
            <Route exact path="/adopt" component={Adopt} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/donate" component={Donate} />
            <Route path="/adopt/animalprofile/:id" component={AnimalProfile} />
          </Switch>
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

const mapDispatchToProps = {
  setUser: setUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
