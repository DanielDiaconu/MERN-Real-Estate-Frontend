import React from "react";

function UserPromotePropertyCard({ property, preview }) {
  return (
    <>
      {property && (
        <div
          className={`card card-hover card-horizontal border-0 ${
            preview?.pro ? "golden-border" : ""
          } shadow-sm mb-4 p-0`}
        >
          <img
            className="card-img-top"
            style={{ objectFit: "cover" }}
            src={`http://localhost:8080/images/property/${property?.thumbnail}`}
          />
          <div class="position-absolute  top-0 pt-3 ps-3">
            {preview?.premium && (
              <span class="d-table badge bg-success mb-1">Sticky</span>
            )}
            {preview?.standard && (
              <span class="d-table badge bg-danger">Featured</span>
            )}
          </div>

          <div className="card-body position-relative pb-3">
            <h3 className="h6 mb-2 fs-base">
              <a
                className="nav-link stretched-link"
                href="real-estate-single.html"
              >
                {property?.name}| {property?.area} sq.m
              </a>
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

export default UserPromotePropertyCard;
