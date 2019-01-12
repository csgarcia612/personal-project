import React, { Component } from "react";
import axios from "axios";
import MiniAnimalProfile from "./MiniAnimalProfile";
// import fetchJsonp from "fetch-jsonp";
import { Link, withRouter } from "react-router-dom";

class Adopt extends Component {
  constructor() {
    super();
    this.state = {
      animalList: [],
      currentPageList: [],
      currentPage: 1,
      numberOfPages: 0,
      limitPerPage: 25,
      offset: 0
    };
    this.retrieveAnimals = this.retrieveAnimals.bind(this);
    this.getNumberOfPages = this.getNumberOfPages.bind(this);
    this.createPage = this.createPage.bind(this);
  }

  componentDidMount() {
    // fetchJsonp(
    //   "http://api.petfinder.com/pet.find?key=b4f9f4ecaf592e9a731a3bbce5174b9c&location=85028&animal=dog&count=25&output=basic&format=json&offset=100"
    // ).then(response => {
    //   return response.json().then(data => {
    //     console.log(data);
    //     axios.post("/api/animals", data.petfinder.pets.pet).then(response => {
    //       console.log(response);
    //     });
    //   });
    // });
    // fetchJsonp(
    //   "http://api.petfinder.com/shelter.find?key=b4f9f4ecaf592e9a731a3bbce5174b9c&location=85028&count=25&format=json&offset=100"
    // ).then(response => {
    //   return response.json().then(data => {
    //     // console.log(data);
    //     axios
    //       .post("/api/shelters", data.petfinder.shelters.shelter)
    //       .then(response => {
    //         console.log(response);
    //       });
    //   });
    // });
    // fetchJsonp(
    //   "http://api.petfinder.com/shelter.get?key=b4f9f4ecaf592e9a731a3bbce5174b9c&id=AZ531&format=json"
    // ).then(response => {
    //   return response.json().then(data => {
    //     console.log(data);
    //     axios.post("/api/shelters", data.petfinder.shelter).then(response => {
    //       console.log(response);
    //     });
    //   });
    // });
    this.retrieveAnimals();
  }
  retrieveAnimals = () => {
    axios
      .get(`/api/animals`)
      .then(res => {
        // console.log("res.data:", res.data);
        this.setState({
          animalList: res.data
        });
        this.getNumberOfPages();
      })
      .then(() => {
        this.props.history.push(`/adopt/${this.state.currentPage}`);
        this.createCurrentPage();
      });
  };

  retrieveNextAnimals = () => {
    axios.get(`/api/animals/${this.state.offset}`).then(res => {
      // console.log("res.data:", res.data);
      this.setState({
        currentPageList: res.data
      });
    });
  };

  getNumberOfPages() {
    // console.log("Animal List:", this.state.animalList);
    const { animalList, limitPerPage } = this.state;
    let pageCount = Math.ceil(animalList.length / limitPerPage);
    this.setState({
      numberOfPages: pageCount
    });
    console.log("Number Of Pages:", this.state.numberOfPages);
  }

  createPage(action) {
    if (action === "next") {
      let prevState = this.state;
      this.setState({
        currentPage: prevState.currentPage + 1,
        offset: prevState.offset + 25
      });
      setTimeout(() => {
        this.createCurrentPage();
        this.props.history.push(`/adopt/${this.state.currentPage}`);
      }, 0);
    } else if (action === "prev") {
      let prevState = this.state;
      this.setState({
        currentPage: prevState.currentPage - 1,
        offset: prevState.offset - 25
      });
      setTimeout(() => {
        this.createCurrentPage();
        this.props.history.push(`/adopt/${this.state.currentPage}`);
      }, 0);
    }
  }

  createCurrentPage() {
    const { animalList, currentPage, limitPerPage } = this.state;
    let start = (currentPage - 1) * limitPerPage;
    let end = start + limitPerPage;
    let updatedList = animalList.slice(start, end);
    // console.log(start, end, updatedList);
    this.setState({
      currentPageList: updatedList
    });
  }

  render() {
    const { currentPageList, currentPage, numberOfPages } = this.state;
    const splitAnimals = currentPageList.map((animal, i) => {
      return (
        <div key={animal.id}>
          <Link
            to={{
              pathname: `/adopt/animalprofile/${animal.id}/${
                animal.animal_name
              }`,
              state: animal
            }}
            className="animalProfileLink"
          >
            <MiniAnimalProfile animal={animal} />
          </Link>
        </div>
      );
    });
    // console.log("Current Page:", currentPage);
    return (
      <div className="adoptionPage">
        <div className="adoptBtnsContainer1">
          <button
            className="adoptBtns"
            disabled={currentPage === 1 ? true : false}
            onClick={() => this.createPage("prev")}
          >
            Previous
          </button>
          <button
            className="adoptBtns"
            disabled={currentPage === numberOfPages ? true : false}
            onClick={() => this.createPage("next")}
          >
            Next
          </button>
        </div>
        <div className="animalsContainer">{splitAnimals}</div>
        <div className="adoptBtnsContainer2">
          <button
            className="adoptBtns"
            disabled={currentPage === 1 ? true : false}
            onClick={() => this.createPage("prev")}
          >
            Previous
          </button>
          <button
            className="adoptBtns"
            disabled={currentPage === numberOfPages ? true : false}
            onClick={() => this.createPage("next")}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Adopt);
