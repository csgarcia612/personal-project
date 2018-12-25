import React, { Component } from "react";
import axios from "axios";
import MiniAnimalProfile from "./MiniAnimalProfile";
// import fetchJsonp from "fetch-jsonp";
import { Link } from "react-router-dom";

export default class Adopt extends Component {
  constructor() {
    super();
    this.state = {
      animalList: []
    };
    this.retrieveAnimals = this.retrieveAnimals.bind(this);
  }

  componentDidMount() {
    // fetchJsonp(
    //   "http://api.petfinder.com/pet.find?key=b4f9f4ecaf592e9a731a3bbce5174b9c&location=85028&animal=dog&count=25&output=basic&format=json&offset=100"
    // ).then(response => {
    //   return response.json().then(data => {
    //     // console.log(data);
    //     axios.post("/api/animals", data.petfinder.pets.pet).then(response => {
    //       console.log(response);
    //     });
    //   });
    // });

    this.retrieveAnimals();
  }

  retrieveAnimals = () => {
    axios.get("/api/animals").then(res => {
      this.setState({
        animalList: res.data
      });
    });
  };

  render() {
    const { animalList } = this.state;
    return (
      <div className="adoptionPage">
        <div className="animalsContainer">
          {animalList.map(animal => {
            return (
              <Link to="/AnimalProfile">
                <div key={animal.id}>
                  <MiniAnimalProfile animal={animal} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
