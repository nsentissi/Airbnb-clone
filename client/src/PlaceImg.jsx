import React from "react";

const PlaceImg = ({ place, className = null }) => {
  if (!place.addedPhotos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      className={className}
      src={"http://localhost:3000/uploads/" + place.addedPhotos[0]}
    />
  );
};

export default PlaceImg;
