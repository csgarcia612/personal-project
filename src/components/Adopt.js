import React, { Component } from "react";
import axios from "axios";
import MiniAnimalProfile from "./MiniAnimalProfile";
// import fetchJsonp from "fetch-jsonp";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import AnimalProfile from "./AnimalProfile";

class Adopt extends Component {
  constructor() {
    super();
    this.state = {
      animalList: [],
      filteredList: [],
      currentPageList: [],
      currentPage: 1,
      numberOfPages: 0,
      limitPerPage: 25,
      offset: 0,
      showModal: [],
      filters: {
        age: ["Baby", "Young", "Adult", "Senior"],
        sex: ["M", "F"],
        size: ["S", "M", "L", "XL"]
      }
    };
    this.retrieveAnimals = this.retrieveAnimals.bind(this);
    this.displayFilteredAnimals = this.displayFilteredAnimals.bind(this);
    this.filterAnimals = this.filterAnimals.bind(this);
    this.getNumberOfPages = this.getNumberOfPages.bind(this);
    this.createPage = this.createPage.bind(this);
    this.createCurrentPage = this.createCurrentPage.bind(this);
    this.updateAge = this.updateAge.bind(this);
    this.updateSex = this.updateSex.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.useFilters = this.useFilters.bind(this);
    // this.resetFilters = this.resetFilters.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    // Search petfinder.com for all dogs in a zipcode:
    // fetchJsonp(
    //   "http://api.petfinder.com/pet.find?key=b4f9f4ecaf592e9a731a3bbce5174b9c&location=85028&animal=dog&count=25&output=basic&format=json&offset=0"
    // ).then(response => {
    //   return response.json().then(data => {
    //     console.log(data);
    //     axios.post("/api/animals", data.petfinder.pets.pet).then(response => {
    //       console.log(response);
    //     });
    //   });
    // });
    // Search Petfinder.com for all shelters in a zipcode:
    // fetchJsonp(
    //   "http://api.petfinder.com/shelter.find?key=b4f9f4ecaf592e9a731a3bbce5174b9c&location=85028&count=25&format=json&offset=0"
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
    // Search petfinder.com for a specific shelter based on an id:
    // fetchJsonp(
    //   "http://api.petfinder.com/shelter.get?key=b4f9f4ecaf592e9a731a3bbce5174b9c&id=AZ570&format=json"
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
      })
      .then(() => {
        this.displayFilteredAnimals();
      });
  };

  displayFilteredAnimals() {
    this.filterAnimals();
    setTimeout(
      this.getNumberOfPages(),
      this.props.history.push(`/adopt/${this.state.currentPage}`),
      this.createCurrentPage(),
      500
    );
  }

  filterAnimals() {
    const { animalList, filters } = this.state;
    // console.log("Animal List:", animalList);
    // console.log("Filters:", filters);
    const filterKeyNames = Object.keys(filters);
    const filteredAnimals = animalList.filter(animal => {
      return filterKeyNames.every(eachKey => {
        if (!filters[eachKey].length) {
          return true;
        }
        return filters[eachKey].includes(animal[eachKey]);
      });
    });
    this.setState({
      filteredList: filteredAnimals,
      currentPage: 1
    });
    // console.log("Filtered List:", this.state.filteredList);
  }

  getNumberOfPages() {
    const { filteredList, limitPerPage } = this.state;
    let pageCount = Math.ceil(filteredList.length / limitPerPage);
    this.setState({
      numberOfPages: pageCount
    });
    // console.log("Number Of Pages:", this.state.numberOfPages);
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
    const { filteredList, currentPage, limitPerPage } = this.state;
    let start = (currentPage - 1) * limitPerPage;
    let end = start + limitPerPage;
    let updatedList = filteredList.slice(start, end);
    // console.log(start, end, updatedList);
    this.setState({
      currentPageList: updatedList
    });
  }

  updateAge(event) {
    let stateCopy = Object.assign({}, this.state);
    if (!event.target.value.length) {
      stateCopy.filters.age = ["Baby", "Young", "Adult", "Senior"];
    } else {
      stateCopy.filters.age = [event.target.value];
    }
    this.setState(stateCopy);
    // console.log("filtersCopy", filtersCopy);
    // console.log("this.state", this.state);
  }

  updateSex(event) {
    let stateCopy = Object.assign({}, this.state);
    if (!event.target.value.length) {
      stateCopy.filters.sex = ["M", "F"];
    } else {
      stateCopy.filters.sex = [event.target.value];
    }
    this.setState(stateCopy);
    // console.log("filtersCopy", filtersCopy);
    // console.log("this.state", this.state);
  }

  updateSize(event) {
    let stateCopy = Object.assign({}, this.state);
    if (!event.target.value.length) {
      stateCopy.filters.size = ["S", "M", "L", "XL"];
    } else {
      stateCopy.filters.size = [event.target.value];
    }
    this.setState(stateCopy);
    // console.log("filtersCopy", filtersCopy);
    // console.log("this.state", this.state);
  }

  useFilters() {
    this.retrieveAnimals();
  }

  // resetFilters() {
  //   this.setState({
  //     filters: {
  //       age: ["Baby", "Young", "Adult", "Senior"],
  //       sex: ["M", "F"],
  //       size: ["S", "M", "L", "XL"]
  //     }
  //   });
  //   this.retrieveAnimals();
  //   // console.log("filtersCopy", filtersCopy);
  //   // console.log("this.state", this.state);
  // }

  toggleModal(i) {
    // console.log("showModal", this.state.showModal);
    // console.log("outsideReturnFuncModal", i);
    let showModal = [...this.state.showModal];
    showModal[i] = !showModal[i];
    this.setState({
      ...this.state,
      showModal
    });
    // console.log("showModal", this.state.showModal);
  }

  render() {
    const { currentPageList, currentPage, numberOfPages } = this.state;
    // const splitAnimals = currentPageList.map((animal, i) => {
    //   return (
    //     <div key={animal.id}>
    //       <Link
    //         to={{
    //           pathname: `/animalprofile/${animal.id}/${animal.animal_name}`,
    //           state: animal
    //         }}
    //         className="animalProfileLink"
    //       >
    //         <MiniAnimalProfile animal={animal} />
    //       </Link>
    //     </div>
    //   );
    // });
    const splitAnimals = currentPageList.map((animal, i) => {
      // console.log("map i", i);
      return (
        <div key={animal.id}>
          {this.state.showModal[i] ? (
            <div
              onClick={() => {
                this.toggleModal(i);
              }}
              className="modalBackdrop"
            >
              <div className="animalProfileModal">
                <AnimalProfile animal={animal} />
              </div>
            </div>
          ) : null}
          <div className="animalModalBtn" onClick={() => this.toggleModal(i)}>
            <MiniAnimalProfile animal={animal} />
          </div>
        </div>
      );
    });

    // console.log("Current Page:", currentPage);
    // console.log("showModalState", this.state.showModal);
    return (
      <div className="adoptionPage">
        <div className="filterMenuContainer">
          <div className="filterContainer">
            <p className="filterP">AGE:</p>
            <select className="dropDownFilter" onChange={this.updateAge}>
              <option value="" className="filterOption1">
                ALL
              </option>
              <option value="Baby" className="filterOption1">
                BABY
              </option>
              <option value="Young" className="filterOption1">
                YOUNG
              </option>
              <option value="Adult" className="filterOption1">
                ADULT
              </option>
              <option value="Senior" className="filterOption2">
                SENIOR
              </option>
            </select>
          </div>
          <div className="filterContainer">
            <p className="filterP">SEX:</p>
            <select className="dropDownFilter" onChange={this.updateSex}>
              <option value="" className="filterOption1">
                ALL
              </option>
              <option value="M" className="filterOption1">
                MALE
              </option>
              <option value="F" className="filterOption2">
                FEMALE
              </option>
            </select>
          </div>
          <div className="filterContainer">
            <p className="filterP">SIZE:</p>
            <select className="dropDownFilter" onChange={this.updateSize}>
              <option value="" className="filterOption1">
                ALL
              </option>
              <option value="S" className="filterOption1">
                SMALL
              </option>
              <option value="M" className="filterOption1">
                MEDIUM
              </option>
              <option value="L" className="filterOption1">
                LARGE
              </option>
              <option value="XL" className="filterOption2">
                EXTRA LARGE
              </option>
            </select>
          </div>
          <div className="filterBtnContainer">
            <button className="adoptFilterBtn" onClick={this.useFilters}>
              Filter
            </button>
          </div>
        </div>
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
