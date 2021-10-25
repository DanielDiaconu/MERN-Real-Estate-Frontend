import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../../slices/userSlice";
import displayStarsRating from "../../shared/components/StarsRating";

function UserDashboardHeader() {
  const user = useSelector(selectUser);

  return (
    <>
      <div className="d-flex d-md-block d-lg-flex align-items-start pt-lg-2 mb-4">
        <img
          className="rounded-circle"
          src={`https://mern-online-properties.herokuapp.com/images/avatars/${user?.avatar}`}
          width="48"
        />
        <div className="pt-md-2 pt-lg-0 ps-3 ps-md-0 ps-lg-3">
          <h2 className="fs-lg mb-0">{user?.fullName}</h2>
          <span className="star-rating">
            {displayStarsRating(user?.rating?.average)}
          </span>
          <ul className="list-unstyled fs-sm mt-3 mb-0">
            <li>
              <a className="nav-link fw-normal p-0" href="tel:3025550107">
                <i className="fi-phone opacity-60 me-2"></i>
                {user?.phone}
              </a>
            </li>
            <li>
              <a
                className="nav-link fw-normal p-0"
                href="mailto:annette_black@email.com"
              >
                <i className="fi-mail opacity-60 me-2"></i>
                {user?.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Link className="btn btn-primary btn-lg w-100 mb-3" to="/addproperty">
        <i className="fi-plus me-2"></i>Add property
      </Link>
    </>
  );
}

export default UserDashboardHeader;
