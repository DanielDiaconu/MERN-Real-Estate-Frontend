import React from "react";
import { Link, useLocation } from "react-router-dom";

function UserPropertyCard({ property, canPromote, isPromoted }) {
  let location = useLocation();
  return (
    <>
      {property && (
        <div
          className={`card  card-horizontal border-0 ${
            property?.pro && isPromoted ? "golden-border" : ""
          } shadow-sm mb-4 p-0`}
        >
          <img
            className="card-img-top"
            style={{ objectFit: "cover" }}
            src={`https://mern-online-properties.herokuapp.com/images/property/${property?.thumbnail}`}
          />
          {isPromoted && (
            <div className="position-absolute  top-0 pt-3 ps-3">
              {property?.premium && (
                <span className="d-table badge bg-success mb-1">Sticky</span>
              )}
              {property?.standard && (
                <span className="d-table badge bg-danger">Featured</span>
              )}
            </div>
          )}

          <div className="card-body position-relative pb-3">
            <div className="dropdown position-absolute zindex-5 top-0 end-0 mt-3 me-3">
              {canPromote && (
                <>
                  {!(
                    property?.standard &&
                    property.premium &&
                    property.pro
                  ) && (
                    <Link
                      className="text-decoration-none"
                      to={`/user/dashboard/promote/${property._id}`}
                    >
                      <button className="dropdown-item" type="button">
                        <i className="fi-flame opacity-60 me-2"></i>Promote
                      </button>
                    </Link>
                  )}{" "}
                </>
              )}
            </div>
            <h3 className="h6 mb-2 fs-base">
              <Link
                className="nav-link stretched-link"
                to={`/property/${property._id}`}
              >
                {property?.name}| {property?.area} sq.m
              </Link>
            </h3>

            <p className="mb-2 fs-sm text-muted">
              {property.address}, {property?.cityId?.name}
            </p>
            <div className="fw-bold">
              <i className="fi-cash mt-n1 me-2 lead align-middle opacity-70"></i>
              ${property.price}
            </div>
            <div className="d-flex align-items-center justify-content-center justify-content-sm-start border-top pt-3 pb-2 mt-3 text-nowrap">
              <span className="d-inline-block me-4 fs-sm">
                {property?.bedrooms}
                <i className="fi-bed ms-1 mt-n1 fs-lg text-muted"></i>
              </span>
              <span className="d-inline-block me-4 fs-sm">
                {property?.bathrooms}
                <i className="fi-bath ms-1 mt-n1 fs-lg text-muted"></i>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserPropertyCard;
