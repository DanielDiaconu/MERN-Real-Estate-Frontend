import React from "react";

function PropertyAmenities({ amenity }) {
  return (
    <li className="col">
      <i className={`fi-${amenity?.icon} mt-n1 me-2 fs-lg align-middle`}></i>
      {amenity?.name}
    </li>
  );
}

export default PropertyAmenities;
