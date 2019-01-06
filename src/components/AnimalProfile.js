import React, { Component } from "react";

export default class AnimalProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnimal: []
    };
  }

  componentDidMount() {
    this.getSingleAnimal();
  }

  getSingleAnimal() {
    this.setState({
      selectedAnimal: this.props.location.state
    });
  }

  render() {
    const { selectedAnimal } = this.state;
    return (
      <div className="animalProfileContainer">
        <div className="animalProfilePicContainer">
          <img
            className="profileAnimalImage"
            src={selectedAnimal.image_url}
            alt="visual of animal"
          />
        </div>
        <div className="animalProfileInfoContainer">
          <p>Name: {selectedAnimal.animal_name}</p>
          <p>Age: {selectedAnimal.age}</p>
          <p>Sex: {selectedAnimal.sex}</p>
          <p>Breed: {selectedAnimal.breed}</p>
          <p>Size (Average Adult): {selectedAnimal.size}</p>
          <div className="animalProfileShelterContainer">
            <p>Located At: </p>
            <p>{selectedAnimal.shelter_name}</p>
            <div className="shelterAddressContainer">
              {/* <p>Street1</p>
            <p>Street2</p> */}
              <p>
                {selectedAnimal.city}, {selectedAnimal.state}
              </p>
              {/* <p>Zipcode</p> */}
            </div>
            {/* <div>
            <p>Phone</p>
            <p>Email</p>
          </div> */}
          </div>
        </div>
      </div>
    );
  }
}

// export default function MiniAnimalProfile(props) {
//     return (
//       <div className="singleAnimalContainer">
//         <div className="animalImageContainer">
//           <img src={props.animal.image_url} alt="Visual of Animal" />
//         </div>
//         <div className="animalInfoContainer">
//           <p>Name: {props.animal.name}</p>
//           <p>Sex: {props.animal.sex}</p>
//           <p>Age: {props.animal.age}</p>
//         </div>
//       </div>
