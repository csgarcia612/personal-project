module.exports = {
  // postApiDataToDb: (req, res) => {
  //   const db = req.app.get("db");
  //   console.log(req.body);
  //   for (let i = 0; i < req.body.length; i++) {
  //     db.enter_animals([
  //       req.body[i].name.$t,
  //       req.body[i].breeds.breed.$t,
  //       req.body[i].age.$t,
  //       req.body[i].sex.$t,
  //       req.body[i].size.$t,
  //       req.body[i].shelterId.$t,
  //       req.body[i].media.photos.photo[2].$t
  //     ])
  //       .then(animals => {
  //         res.send(animals);
  //       })
  //       .catch(error => {
  //         console.log("error with postApiDataToDb", error);
  //         res.status(500).send("Something went wrong on the server");
  //       });
  //   }
  // },
  getAnimals: (req, res) => {
    const dbInstance = req.app.get('db');

    dbInstance
      .get_animals_shelters()
      .then((animals) => res.status(200).send(animals))
      .catch((error) => {
        res.status(500).send('Error with get_animals', error);
      });
  },
};
