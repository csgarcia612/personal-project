module.exports = {
  update: (req, res, next) => {
    const db = req.app.get("db");
    const { params } = req;
    // console.log(params);

    db.update_user({
      auth0_id: params.auth0_id,
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      image_url: req.body.image_url,
      bio: req.body.bio
    })
      .then(() => res.sendStatus(200))
      .then(
        (req.session.user = {
          auth0_id: req.body.auth0_id,
          username: req.body.username,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          image_url: req.body.image_url,
          bio: req.body.bio
        })
      )
      .catch(error => {
        res.sendStatus(500).send(console.log("Error with update_user", error));
      });
    // console.log(req.body, req.params);
  },
  delete: (req, res, next) => {
    const db = req.app.get("db");
    const { params } = req;

    db.delete_user({ auth0_id: params.auth0_id })
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.sendStatus(500).send(console.log("Error with delete_user", error));
      });
  }
};
