import React from "react";
import displayStarsRating from "../../shared/components/StarsRating";

function UserProfileAside({ user, total }) {
  return (
    <>
      <aside className="col-lg-3 col-md-4 mb-5">
        <div className="pe-lg-3">
          <img
            className="d-block rounded-circle mx-auto mx-md-0 mb-3"
            src={`https://mern-online-properties.herokuapp.com/images/avatars/${user?.avatar}`}
            width="120"
            alt="Floyd Miles"
          />
          <h2 className="h4 text-center text-md-start mb-1">
            {user?.fullName}
          </h2>

          <div className="d-flex justify-content-center justify-content-md-start border-bottom pb-4 mb-4 align-items-center">
            <span className="star-rating">
              {displayStarsRating(user?.rating?.average)}
            </span>
            <div className="text-muted ms-2">
              {user?.rating?.average.toFixed(1)} ({total} reviews)
            </div>
          </div>
          <div className="border-bottom pb-4 mb-4">
            <p className="fs-sm mb-0">{user?.bio}</p>
          </div>
          <ul className="d-table list-unstyled mx-auto mx-md-0 mb-3 mb-md-4">
            <li className="mb-2">
              <a className="nav-link fw-normal p-0">
                <i className="fi-phone text-primary mt-n1 me-2 align-middle"></i>
                {user?.phone}
              </a>
            </li>
            <li>
              <a className="nav-link fw-normal p-0">
                <i className="fi-mail text-primary mt-n1 me-2 align-middle"></i>
                {user?.email}
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default UserProfileAside;
