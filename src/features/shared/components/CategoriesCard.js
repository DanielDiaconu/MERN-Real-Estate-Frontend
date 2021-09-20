import React from "react";
import { Link } from "react-router-dom";

function CategoriesCard({ category, url = "/catalog" }) {
  return (
    <div className="col">
      <Link
        to={url}
        className="icon-box card card-body h-100 border-0 shadow-sm card-hover h-100 text-center"
      >
        <div className="icon-box-media bg-faded-primary text-primary rounded-circle mb-3 mx-auto">
          <i className={`fi-${category?.iconName}`}></i>
        </div>
        <h3 className="icon-box-title fs-base mb-0">{category?.name}</h3>
      </Link>
    </div>
  );
}

export default CategoriesCard;
