import React from "react";

export default function MiniAnimalProfile(props) {
  return (
    <div className="singleAnimalContainer">
      <div className="animalImageContainer">
        <img src={props.animal.image_url} alt="Visual of Animal" />
      </div>
      <div className="animalInfoContainer">
        <p>Name: {props.animal.name}</p>
        <p>Sex: {props.animal.sex}</p>
        <p>Age: {props.animal.age}</p>
      </div>
    </div>
  );
}
