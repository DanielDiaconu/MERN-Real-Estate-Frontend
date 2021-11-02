import React from "react";
import { Link } from "react-router-dom";

function PropertyUser({ user }) {
  return (
    <aside className="col-lg-4 col-md-5 ms-lg-auto pb-1">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex align-items-start justify-content-between">
            <a className="text-decoration-none">
              <img
                className="rounded-circle mb-2 user-avatar-thumbnail"
                src={`https://mern-online-properties.herokuapp.com/images/avatars/${user?.avatar}`}
                alt="Avatar"
              />
              <h5 className="mb-1">{user?.fullName}</h5>
            </a>
          </div>
          <ul className="list-unstyled border-bottom mb-4 pb-4">
            <li>
              <a
                href={`tel:${user?.phone}`}
                className="nav-link fw-normal p-0 cursor-pointer"
              >
                <i className="fi-phone mt-n1 me-2 align-middle opacity-60"></i>
                {user?.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto: ${user?.email}`}
                className="nav-link fw-normal p-0 cursor-pointer"
              >
                <i className="fi-mail mt-n1 me-2 align-middle opacity-60"></i>
                {user?.email}
              </a>
            </li>
          </ul>
          <Link
            to={`/profile/${user?._id}`}
            className="btn btn-lg btn-primary d-block w-100"
            type="submit"
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default PropertyUser;
