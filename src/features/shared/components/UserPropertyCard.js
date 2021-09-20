import React from "react";

function UserPropertyCard({ property }) {
  return (
    <>
      {property && (
        <div className="card card-hover card-horizontal border-0 shadow-sm mb-4">
          <img
            className="card-img-top"
            style={{ objectFit: "cover" }}
            src={`http://localhost:8080/images/property/${property?.thumbnail}`}
          />

          <div className="card-body position-relative pb-3">
            <div className="dropdown position-absolute zindex-5 top-0 end-0 mt-3 me-3">
              <button
                className="btn btn-icon btn-light btn-xs rounded-circle shadow-sm"
                type="button"
                id={`contextmenu${property._id}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fi-dots-vertical"></i>
              </button>
              <ul
                className="dropdown-menu my-1"
                aria-labelledby={`contextmenu${property._id}`}
              >
                <li>
                  <button className="dropdown-item" type="button">
                    <i className="fi-edit opacity-60 me-2"></i>Edit
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    <i className="fi-flame opacity-60 me-2"></i>Promote
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    <i className="fi-power opacity-60 me-2"></i>Deactivate
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    <i className="fi-trash opacity-60 me-2"></i>Delete
                  </button>
                </li>
              </ul>
            </div>

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

export default UserPropertyCard;
