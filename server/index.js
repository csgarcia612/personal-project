const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const connect = require("connect-pg-simple");
const animalsController = require("./controllers/animalsController");
const usersController = require("./controllers/usersController");
const sheltersController = require("./controllers/sheltersController");
const nodemailer = require("nodemailer");

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(error => {
    console.log("Error connecting to db", error);
  });

const app = express();
app.use(bodyParser.json());
app.use(
  session({
    store: new (connect(session))({
      conString: process.env.CONNECTION_STRING
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30
    }
  })
);

// Used for retrieving animals data from 3rd party api and posting to my table db
// app.post("/api/animals", animalsController.postApiDataToDb);

// Used for retrieving shelters data from 3rd party api and posting to my table db
// app.post("/api/shelters", sheltersController.postApiDataToDb);

app.get("/api/animals", animalsController.getAnimals);

app.get("/callback", (req, res) => {
  console.log("/callback");
  const payload = {
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: `http://${req.headers.host}/callback`
  };

  function tradeCodeForAccessToken() {
    return axios.post(
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
      payload
    );
  }

  function tradeAccessTokenForUserInfo(response) {
    return axios.get(
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${
        response.data.access_token
      }`
    );
  }

  function storeUserInfoInDataBase(response) {
    // console.log("user info", response.data);
    const user = response.data;
    return req.app
      .get("db")
      .find_user_by_auth0_id([user.sub])
      .then(singleUser => {
        if (singleUser.length) {
          req.session.user = {
            auth0_id: singleUser[0].auth0_id,
            username: singleUser[0].username,
            first_name: singleUser[0].first_name,
            last_name: singleUser[0].last_name,
            email: singleUser[0].email,
            image_url: singleUser[0].image_url,
            bio: singleUser[0].bio
          };
          // console.log(req.session);
          res.redirect("/");
        } else {
          // console.log(user.name.split(" "));
          let splitName = user.name.split(" ");
          return req.app
            .get("db")
            .create_user([
              user.sub,
              user.nickname,
              splitName[0],
              splitName[1],
              user.email,
              user.picture,
              null
            ])
            .then(newlyCreatedUsers => {
              req.session.user = newlyCreatedUsers[0];
              // console.log(req.session);
              res.redirect("/");
            });
        }
      });
  }

  tradeCodeForAccessToken()
    .then(tradeAccessTokenForUserInfo)
    .then(storeUserInfoInDataBase)
    .catch(error => {
      console.log("error in /callback", error);
      res.status(500).send("Something went wrong on the server.");
    });
});

app.get("/api/user-data", (req, res) => {
  res.json({ user: req.session.user });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged Out Successfully");
});

app.put("/api/updateUser/:auth0_id", usersController.update);

app.delete("/api/deleteUser/:auth0_id", usersController.delete);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
