const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const connect = require("connect-pg-simple");
const animalsController = require("./controllers/animalsController");

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

// Used for retrieving data from 3rd party api and posting to my table db
// app.post("/api/animals", animalsController.postApiDataToDb);

app.get("/api/animals", animalsController.getAnimals);

app.post("/api/logout", (req, res) => {
  req.session.destroy();
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
