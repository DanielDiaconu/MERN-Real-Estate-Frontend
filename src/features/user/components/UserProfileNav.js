import React from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

function UserProfileNav() {
  let { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  return (
    <div>
      <ul
        className="nav nav-tabs flex-column flex-sm-row align-items-stretch align-items-sm-start border-bottom mb-4"
        role="tablist"
      >
        <li className="nav-item me-sm-3 mb-3">
          <Link
            className={
              location.pathname === `${url}/reviews`
                ? "nav-link text-center active"
                : "nav-link text-center"
            }
            to={`${url}/reviews`}
          >
            Reviews
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link
            className={
              location.pathname === `${url}/properties`
                ? "nav-link text-center active"
                : "nav-link text-center"
            }
            to={`${url}/properties`}
          >
            Properties
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default UserProfileNav;
