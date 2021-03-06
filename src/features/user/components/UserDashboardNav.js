import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useRouteMatch, useLocation } from "react-router-dom";

function UserDashboardNav() {
  let { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const onSignOut = () => {
    sessionStorage.removeItem("auth-token");
    history.push("/login");
  };

  return (
    <>
      <div className="collapse d-md-block mt-3" id="account-nav">
        <div className="card-nav">
          <Link
            className={
              location.pathname === `${url}/personal-info`
                ? "card-nav-link active"
                : "card-nav-link"
            }
            to={`${url}/personal-info`}
          >
            <i className="fi-user opacity-60 me-2"></i>Personal Info
          </Link>
          <Link
            className={
              location.pathname === `${url}/password-security`
                ? "card-nav-link active"
                : "card-nav-link"
            }
            to={`${url}/password-security`}
          >
            <i className="fi-lock opacity-60 me-2"></i>Password &amp; Security
          </Link>
          <Link
            className={
              location.pathname === `${url}/my-properties`
                ? "card-nav-link active"
                : "card-nav-link"
            }
            to={`${url}/my-properties`}
          >
            <i className="fi-home opacity-60 me-2"></i>My Properties
          </Link>
          <Link
            className={
              location.pathname === `${url}/wishlist`
                ? "card-nav-link active"
                : "card-nav-link"
            }
            to={`${url}/wishlist`}
          >
            <i className="fi-heart opacity-60 me-2"></i>Wishlist
          </Link>
          <Link
            className={
              location.pathname === `${url}/wallet`
                ? "card-nav-link active"
                : "card-nav-link"
            }
            to={`${url}/wallet`}
          >
            <i className="fi-wallet opacity-60 me-2"></i>Payment & Funds
          </Link>

          <Link
            className={
              location.pathname === `${url}/notifications`
                ? "card-nav-link active"
                : "card-nav-link"
            }
            to={`${url}/notifications`}
          >
            <i className="fi-bell opacity-60 me-2"></i>Notifications
          </Link>
          <span className="card-nav-link cursor-pointer" onClick={onSignOut}>
            <i className="fi-logout opacity-60 me-2"></i>Sign Out
          </span>
        </div>
      </div>
    </>
  );
}

export default UserDashboardNav;
