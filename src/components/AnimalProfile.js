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
      selectedAnimal: this.props.animal
    });
  }

  render() {
    const { animal } = this.props;
    return (
      <div className="animalProfileContainer">
        <div className="animalProfilePicContainer">Animal Image</div>
        <div className="animalProfileInfoContainer">Animal Info</div>
        <div className="animalProfileShelterContainer">
          Animal Shelter Location
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
