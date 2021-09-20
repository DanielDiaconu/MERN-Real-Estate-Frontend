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
        <div className="content-overlay start-0 top-0 d-flex align-items-center justify-content-center w-100 h-100 p-3">
          <div className="w-100 p-1">
            <div className="mb-2">
              <h4 className="mb-2 fs-xs fw-normal text-light">
                <i className="fi-wallet mt-n1 me-2 fs-sm align-middle"></i>
                Property for sale
              </h4>
              <div className="d-flex align-items-center">
                <div className="progress progress-light w-100">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <span className="text-light fs-sm ps-1 ms-2">2750</span>
              </div>
            </div>
            <div className="pt-1">
              <h4 className="mb-2 fs-xs fw-normal text-light">
                <i className="fi-home mt-n1 me-2 fs-sm align-middle"></i>
                Property for rent
              </h4>
              <div className="d-flex align-items-center">
                <div className="progress progress-light w-100">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "40%" }}
                    aria-valuenow="40"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <span className="text-light fs-sm ps-1 ms-2">692</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body text-center">
        <h3 className="mb-0 fs-base text-nav">{city?.name}</h3>
      </div>
    </Link>
  );
}

export default CitiesCard;
