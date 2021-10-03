import React from "react";

function UserProfileAside({ user, total }) {
  return (
    <>
      <aside className="col-lg-3 col-md-4 mb-5">
        <div className="pe-lg-3">
          <img
            className="d-block rounded-circle mx-auto mx-md-0 mb-3"
            src={`http://localhost:8080/images/avatars/${user?.avatar}`}
            width="120"
            alt="Floyd Miles"
          />
          <h2 className="h4 text-center text-md-start mb-1">
            {user?.fullName}
          </h2>

          <div className="d-flex justify-content-center justify-content-md-start border-bottom pb-4 mb-4 align-items-center">
            <span className="star-rating"></span>
            <div className="text-muted ms-2">
              {user?.rating?.average.toFixed(1)} ({total} reviews)
            </div>
          </div>
          <div className="border-bottom pb-4 mb-4">
            <p className="fs-sm mb-0">{user?.bio}</p>
          </div>
          <ul className="d-table list-unstyled mx-auto mx-md-0 mb-3 mb-md-4">
            <li className="mb-2">
              <a className="nav-link fw-normal p-0" href="tel:3025550107">
                <i className="fi-phone text-primary mt-n1 me-2 align-middle"></i>
                {user?.phone}
              </a>
            </li>
            <li>
              <a
                className="nav-link fw-normal p-0"
                href="mailto:floyd_miles@email.com"
              >
                <i className="fi-mail text-primary mt-n1 me-2 align-middle"></i>
                {user?.email}
              </a>
            </li>
          </ul>

          <div className="text-center text-md-start pt-md-2 mt-4">
            <a
              className="btn btn-primary"
              href="#message-modal"
              data-bs-toggle="modal"
            >
              <i className="fi-chat-left fs-sm me-2"></i>Direct message
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

export default UserProfileAside;
