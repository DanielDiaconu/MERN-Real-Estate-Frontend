import React from "react";

function PropertyUser({ user }) {
  console.log(user);
  return (
    <aside className="col-lg-4 col-md-5 ms-lg-auto pb-1">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex align-items-start justify-content-between">
            <a
              className="text-decoration-none"
              href="real-estate-vendor-properties.html"
            >
              <img
                className="rounded-circle mb-2"
                src={`http://localhost:8080/images/avatars/${user?.avatar}`}
                width="60"
                alt="Avatar"
              />
              <h5 className="mb-1">{user?.fullName}</h5>
              <div className="mb-1">
                <span className="star-rating">
                  <i className="star-rating-icon fi-star-filled active"></i>
                  <i className="star-rating-icon fi-star-filled active"></i>
                  <i className="star-rating-icon fi-star-filled active"></i>
                  <i className="star-rating-icon fi-star-filled active"></i>
                  <i className="star-rating-icon fi-star-filled active"></i>
                </span>
                <span className="ms-1 fs-sm text-muted">(45 reviews)</span>
              </div>
            </a>
          </div>
          <ul className="list-unstyled border-bottom mb-4 pb-4">
            <li>
              <a className="nav-link fw-normal p-0" href="tel:3025550107">
                <i className="fi-phone mt-n1 me-2 align-middle opacity-60"></i>
                {user?.phone}
              </a>
            </li>
            <li>
              <a
                className="nav-link fw-normal p-0"
                href="mailto:floyd_miles@email.com"
              >
                <i className="fi-mail mt-n1 me-2 align-middle opacity-60"></i>
                {user?.email}
              </a>
            </li>
          </ul>
          <form className="needs-validation" noValidate="">
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Your name*"
                required=""
              />
              <div className="invalid-feedback">Please enter your name!</div>
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="email"
                placeholder="Email*"
                required=""
              />
              <div className="invalid-feedback">
                Please provide valid email address!
              </div>
            </div>
            <input
              className="form-control mb-3"
              type="tel"
              placeholder="Phone"
            />
            <div className="input-group mb-3">
              <input
                className="form-control date-picker rounded pe-5 flatpickr-input"
                type="hidden"
                placeholder="Choose date"
                data-datepicker-options='{"altInput": true, "altFormat": "F j, Y", "dateFormat": "Y-m-d"}'
              />
              <input
                className="form-control date-picker rounded pe-5 form-control input"
                placeholder="Choose date"
                tabIndex="0"
                type="text"
                readOnly="readonly"
              />
              <i className="fi-calendar position-absolute top-50 end-0 translate-middle-y me-3"></i>
            </div>
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Message"
              style={{ resize: "none" }}
            ></textarea>

            <button
              className="btn btn-lg btn-primary d-block w-100"
              type="submit"
            >
              Send request
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}

export default PropertyUser;
