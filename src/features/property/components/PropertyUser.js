import React from "react";

function PropertyUser({ user }) {
  return (
    <aside class="col-lg-4 col-md-5 ms-lg-auto pb-1">
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex align-items-start justify-content-between">
            <a
              class="text-decoration-none"
              href="real-estate-vendor-properties.html"
            >
              <img
                class="rounded-circle mb-2"
                src="/img/01.jpg"
                width="60"
                alt="Avatar"
              />
              <h5 class="mb-1">{`${user?.firstName} ${user?.lastName}`}</h5>
              <div class="mb-1">
                <span class="star-rating">
                  <i class="star-rating-icon fi-star-filled active"></i>
                  <i class="star-rating-icon fi-star-filled active"></i>
                  <i class="star-rating-icon fi-star-filled active"></i>
                  <i class="star-rating-icon fi-star-filled active"></i>
                  <i class="star-rating-icon fi-star-filled active"></i>
                </span>
                <span class="ms-1 fs-sm text-muted">(45 reviews)</span>
              </div>
              <p class="text-body">Imperial Property Group Agent</p>
            </a>
          </div>
          <ul class="list-unstyled border-bottom mb-4 pb-4">
            <li>
              <a class="nav-link fw-normal p-0" href="tel:3025550107">
                <i class="fi-phone mt-n1 me-2 align-middle opacity-60"></i>(302)
                555-0107
              </a>
            </li>
            <li>
              <a
                class="nav-link fw-normal p-0"
                href="mailto:floyd_miles@email.com"
              >
                <i class="fi-mail mt-n1 me-2 align-middle opacity-60"></i>
                {user?.email}
              </a>
            </li>
          </ul>
          <form class="needs-validation" novalidate="">
            <div class="mb-3">
              <input
                class="form-control"
                type="text"
                placeholder="Your name*"
                required=""
              />
              <div class="invalid-feedback">Please enter your name!</div>
            </div>
            <div class="mb-3">
              <input
                class="form-control"
                type="email"
                placeholder="Email*"
                required=""
              />
              <div class="invalid-feedback">
                Please provide valid email address!
              </div>
            </div>
            <input class="form-control mb-3" type="tel" placeholder="Phone" />
            <div class="input-group mb-3">
              <input
                class="form-control date-picker rounded pe-5 flatpickr-input"
                type="hidden"
                placeholder="Choose date"
                data-datepicker-options='{"altInput": true, "altFormat": "F j, Y", "dateFormat": "Y-m-d"}'
              />
              <input
                class="form-control date-picker rounded pe-5 form-control input"
                placeholder="Choose date"
                tabindex="0"
                type="text"
                readonly="readonly"
              />
              <i class="fi-calendar position-absolute top-50 end-0 translate-middle-y me-3"></i>
            </div>
            <textarea
              class="form-control mb-3"
              rows="3"
              placeholder="Message"
              style={{ resize: "none" }}
            ></textarea>

            <button class="btn btn-lg btn-primary d-block w-100" type="submit">
              Send request
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}

export default PropertyUser;
