const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const connect = require('connect-pg-simple');
const animalsController = require('./controllers/animalsController');
const usersController = require('./controllers/usersController');
// const sheltersController = require("./controllers/sheltersController");
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'owurz2fxwek6bz3w@ethereal.email',
    pass: 'GyFNSnwmxt98uNbcdN',
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

massive({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_SECRET,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((db) => {
    // exports.database = db;
    app.set('db', db);

    console.log('Database Connection : ONLINE');
  })
  .catch((error) => {
    console.log(('😡 Error with Massive DB Connection 😡', error));
  });

// massive(process.env.CONNECTION_STRING)
//   .then((db) => {
//     app.set('db', db);
//   })
//   .catch((error) => {
//     console.log('Error connecting to db', error);
//   });

const app = express();
app.use(bodyParser.json());

// app.use(
//   session({
//     store: new (connect(session))({
//       conString: process.env.CONNECTION_STRING,
//     }),
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 2,
//     },
//   })
// );

app.use(
  session({
    store: new (connect(session))({
      conObject: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_SECRET,
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  })
);

// Used for retrieving animals data from 3rd party api and posting to my table db
// app.post("/api/animals", animalsController.postApiDataToDb);

// Used for retrieving shelters data from 3rd party api and posting to my table db
// app.post("/api/shelters", sheltersController.postApiDataToDb);

app.get('/api/animals', animalsController.getAnimals);

app.get('/callback', (req, res) => {
  // console.log("/callback");
  let redirect_uri =
    process.env.HOST == 'localhost'
      ? `http://${req.headers.host}/callback`
      : `https://${req.headers.host}/callback`;
  const payload = {
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    code: req.query.code,
    grant_type: 'authorization_code',
    redirect_uri,
  };

  function tradeCodeForAccessToken() {
    return axios.post(
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
      payload
    );
  }

  function tradeAccessTokenForUserInfo(response) {
    return axios.get(
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${response.data.access_token}`
    );
  }

  function storeUserInfoInDataBase(response) {
    // console.log("user info", response.data);
    const user = response.data;
    return req.app
      .get('db')
      .find_user_by_auth0_id([user.sub])
      .then((singleUser) => {
        if (singleUser.length) {
          req.session.user = {
            auth0_id: singleUser[0].auth0_id,
            username: singleUser[0].username,
            first_name: singleUser[0].first_name,
            last_name: singleUser[0].last_name,
            email: singleUser[0].email,
            image_url: singleUser[0].image_url,
            bio: singleUser[0].bio,
          };
          // console.log(req.session);
          res.redirect('/');
        } else {
          // console.log(user.name.split(" "));
          // console.log("user info", user);
          let splitName = user.name.split(' ');
          if (splitName.length === 1) {
            splitName.push('Moorehead');
          }
          return req.app
            .get('db')
            .create_user([
              user.sub,
              user.nickname,
              splitName[0],
              splitName[1],
              user.email,
              user.picture,
              null,
            ])
            .then((newlyCreatedUsers) => {
              req.session.user = newlyCreatedUsers[0];
              // console.log(req.session);
              res.redirect('/');
            });
        }
      });
  }

  tradeCodeForAccessToken()
    .then(tradeAccessTokenForUserInfo)
    .then(storeUserInfoInDataBase)
    .catch((error) => {
      console.log('error in /callback', error);
      res.status(500).send('Something went wrong on the server.');
    });
});

app.post('/api/stripe', function (req, res, next) {
  // console.log(req.body);
  const stripeToken = req.body.token.id;
  // console.log(stripeToken);
  stripe.charges.create(
    {
      amount: req.body.state.amount * 100,
      currency: 'usd',
      description: 'Test Stripe Credit Charge',
      source: stripeToken,
    },
    (error, charge) => {
      error ? res.status(500).send(error) : res.status(200).send(charge);
    }
    // asynchronously called
  );
});

app.post('/api/contactEmail', (req, res) => {
  // console.log(req.body);
  const { contactName, contactEmailAddress, contactSubject, contactMessage } =
    req.body;
  const mailOptions = {
    from: 'smtp.ethereal.email',
    to: 'christophergarcia.developer@gmail.com',
    subject: 'Message From PawsFurLove User',
    text: `Message from ${contactName} at ${contactEmailAddress}. The subject of the message is ${contactSubject}. The message is as follows: ${contactMessage}`,
    html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Demystifying Email Design</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body style="margin: 0; padding: 0;">
          <table border="1" cellpadding="0" cellspacing="0" width="100%">
            <table align="center" border="1" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
              <tr style="border-color:"#7FBDDA";">
                <td align="center" bgcolor="#7FBDDA" padding: 10px 0 10px 0 style="border-bottom: 0.5px solid #7FBDDA;">
                  <img src="https://i.imgur.com/Q6Z4mdts.png" alt="Paws Fur Love Logo" style="box-shadow: #FFFFFF 0px 0px 1px, #FFFFFF 0px 0px 2px, #FFFFFF 0px 0px 4px, #FFFFFF 0px 0px 7px, #FFFFFF 0px 0px 10px, #FFFFFF 0px 0px 15px, #FFFFFF 0px 0px 20px, #FFFFFF 0px 0px 32px; border-radius: 3px; margin-top:10px; margin-bottom: 10px;" />  
                </td>
              </tr>
              <tr style="border-color:"#7FBDDA";">
                <td align="center" bgcolor="#7FBDDA" style="padding: 2.5px 0 2.5px 0; color: #000000; font-family: "Comic Sans MS", cursive, sans-serif; font-size: 200px; font-weight: bolder; border-top: 0.5px solid #7FBDDA;">
                  <b><i>PAWS FUR LOVE<i></b>
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" style="padding: 12px 12px 12px 12px;">
                        ${contactSubject}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <hr size="1" width-"100%" color="#000000">
                      </td>
                    </tr>
                    <tr>
                      <td bgcolor="#ffffff" style="padding: 25px 25px 25px 25px; style="color: #000000; font-family: Arial, sans-serif; font-size: 20px;>
                        Dear PawsFurLove,<br>
                        <blockquote>${contactMessage}</blockquote>
                        Sincerely,<br>
                        <i>${contactName}</i>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr bgcolor="#ffffff" style="padding: 15px 0px 15px 0px;">
                <td>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#7FBDDA">
                        <b>PAWS FUR LOVE &copy; <br>
                        &reg; Christopher Garcia, Earth C-137 &infin;</b>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </table>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log('Error occurred with sending email', error);
    else {
      // console.log("message info", info);
    }
  });
});

app.get('/api/user-data', (req, res) => {
  res.json({ user: req.session.user });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send('Logged Out Successfully');
});

app.put('/api/updateUser/:auth0_id', usersController.update);

app.delete('/api/deleteUser/:auth0_id', usersController.delete);

app.use(express.static(`${__dirname}/../build`));

const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
