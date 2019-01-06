module.exports = {
  postApiDataToDb: (req, res) => {
    const db = req.app.get("db");
    // console.log(req.body);
    // for (let i = 0; i < req.body.length; i++) {
    db.enter_shelters({
      shelter_id: req.body.id.$t ? req.body.id.$t : null,
      name: req.body.name.$t ? req.body.name.$t : null,
      phone: req.body.phone.$t ? req.body.phone.$t : null,
      email: req.body.email.$t ? req.body.email.$t : null,
      address1: req.body.address1.$t ? req.body.address1.$t : null,
      address2: req.body.address2.$t ? req.body.address2.$t : null,
      city: req.body.city.$t ? req.body.city.$t : null,
      state: req.body.state.$t ? req.body.state.$t : null,
      zipcode: req.body.zip.$t ? req.body.zip.$t : null,
      latitude: req.body.latitude.$t ? req.body.latitude.$t : null,
      longitude: req.body.longitude.$t ? req.body.longitude.$t : null
    })
      .then(shelters => {
        res.send(shelters);
      })
      .catch(error => {
        console.log("Error with shelters postApiDataToDb", error);
        res.status(500).send("Something went wrong on the server");
      });
  }
};
// };
