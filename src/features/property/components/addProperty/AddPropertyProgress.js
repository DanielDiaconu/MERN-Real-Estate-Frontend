import React, { useEffect, useState } from "react";

function AddPropertyProgress({ property, onProgressChange, progress }) {
  const calculateProgress = () => {
    let sum = 0;
    for (let value of Object.values(property)) {
      if (typeof value === "string" && value) {
        sum += 7.69;
      } else if (Array.isArray(value) && value.length > 0) {
        sum += 7.69;
      } else if (typeof value === "number" && value > 0) {
        sum += 7.69;
      } else if (value instanceof File) {
        sum += 7.69;
      }
    }
    onProgressChange(sum);
  };

  useEffect(() => {
    calculateProgress();
  }, [property]);

  return (
    <>
      <aside className="col-lg-3 offset-lg-1 d-none d-lg-block">
        <div className="sticky-top pt-5">
          <h6 className="pt-5 mt-3 mb-2">
            {Math.ceil(progress)}% content filled
          </h6>
          <div className="progress mb-3">
            <div
              className={`progress-bar progress-bar-striped ${
                progress > 99 ? "bg-success" : "bg-warning"
              } progress-bar-animated`}
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <ul className="list-unstyled">
            <li className="d-flex align-items-center">
              {property?.name && property?.overview && property.categoryId && (
                <i className="fi-check text-primary me-2"></i>
              )}
              <a
                className="nav-link fw-normal p-0 "
                href="#basic-info"
                data-scroll=""
                data-scroll-offset="20"
              >
                Basic info
              </a>
            </li>
            <li className="d-flex align-items-center ">
              <i
                className={`fi-check ${
                  property?.cityId && property?.address
                    ? "text-primary"
                    : "text-muted"
                } me-2`}
              ></i>
              <a
                className="nav-link fw-normal ps-1 p-0"
                href="#location"
                data-scroll=""
                data-scroll-offset="20"
              >
                Location
              </a>
            </li>
            <li className="d-flex align-items-center">
              <i
                className={`fi-check ${
                  property?.area &&
                  property?.built &&
                  property?.bedrooms &&
                  property?.bathrooms &&
                  property?.price
                    ? "text-primary"
                    : "text-muted"
                } me-2`}
              ></i>
              <a
                className="nav-link fw-normal ps-1 p-0"
                href="#details"
                data-scroll=""
                data-scroll-offset="20"
              >
                Property details
              </a>
            </li>
            <li className="d-flex align-items-center">
              <i
                className={`fi-check ${
                  property?.amenities.length > 0 ? "text-primary" : "text-muted"
                } me-2`}
              ></i>
              <a
                className="nav-link fw-normal ps-1 p-0"
                href="#price"
                data-scroll=""
                data-scroll-offset="20"
              >
                Amenities
              </a>
            </li>
            <li className="d-flex align-items-center">
              <i
                className={`fi-check ${
                  property?.gallery.length > 0 && property?.thumbnail
                    ? "text-primary"
                    : "text-muted"
                } me-2`}
              ></i>
              <a
                className="nav-link fw-normal ps-1 p-0"
                href="#photos"
                data-scroll=""
                data-scroll-offset="20"
              >
                Photos / video
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default AddPropertyProgress;
