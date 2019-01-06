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
        <div className="miniInfo1">
          <p className="miniAnimalInfo1">Name:</p>
          <p className="miniAnimalInfo2">{props.animal.animal_name}</p>
        </div>
        <div className="miniInfo1">
          <p className="miniAnimalInfo1">Sex:</p>
          <p className="miniAnimalInfo2">{props.animal.sex}</p>
        </div>
        <div className="miniInfo2">
          <p className="miniAnimalInfo1">Age:</p>
          <p className="miniAnimalInfo2">{props.animal.age}</p>
        </div>
      </div>
    </div>
  );
}
