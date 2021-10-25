import React from "react";
import { Link } from "react-router-dom";

function CitiesCard({ city, url = "/" }) {
  return (
    <Link
      to={url}
      className="card shadow-sm card-hover border-0 p-0 mr-15 ml-15"
    >
      <div className="card-img-top card-img-hover p-0">
        <span className="img-overlay opacity-65"></span>
        <img src={`img/${city?.cityIcon}`} alt="city location" />
        {/*  */}
      </div>
      <div className="card-body text-center">
        <h3 className="mb-0 fs-base text-nav">{city?.name}</h3>
      </div>
    </Link>
  );
}

export default CitiesCard;
