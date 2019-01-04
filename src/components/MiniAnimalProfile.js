import React from "react";

export default function MiniAnimalProfile(props) {
  return (
    <div className="singleAnimalContainer">
      <div className="animalImageContainer">
        <img
          src={props.animal.image_url}
          alt="Visual of Animal"
          className="miniAnimalImage"
        />
      </div>
      <div className="animalInfoContainer">
        <p className="miniAnimalInfo">Name: {props.animal.name}</p>
        <p className="miniAnimalInfo">Sex: {props.animal.sex}</p>
        <p className="miniAnimalInfo">Age: {props.animal.age}</p>
      </div>
    </div>
  );
}
