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
                className="rounded-circle mb-2"
                src={`http://localhost:8080/images/avatars/${user?.avatar}`}
                width="60"
                alt="Avatar"
              />
              <h5 className="mb-1">{user?.fullName}</h5>
            </a>
          </div>
          <ul className="list-unstyled border-bottom mb-4 pb-4">
            <li>
              <a className="nav-link fw-normal p-0">
                <i className="fi-phone mt-n1 me-2 align-middle opacity-60"></i>
                {user?.phone}
              </a>
            </li>
            <li>
              <a className="nav-link fw-normal p-0">
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
