import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { selectUser } from "../../../slices/userSlice";
import UserAvatar from "../../user/components/UserAvatar";
import NotificationBell from "./NotificationBell";

export default function Header() {
  const location = useLocation();
  const user = useSelector(selectUser);
  const history = useHistory();
  const [showDropDown, setShowDropdown] = useState(false);

  console.log(location);
  const onSignOut = () => {
    sessionStorage.removeItem("auth-token");
    history.push("/login");
  };

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  return (
    <header
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      data-scroll-header=""
    >
      <div className="container">
        <Link className="navbar-brand me-3 me-xl-4" to="/">
          <img
            className="d-block"
            src="/img/logo-dark.svg"
            width="116"
            alt="Finder"
          />
        </Link>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {!user._id ? (
          <Link
            className="btn btn-sm text-primary d-none d-lg-block order-lg-3"
            to="/login"
          >
            <i className="fi-user me-2"></i>Sign in
          </Link>
        ) : (
          <UserAvatar />
        )}
        {user._id && (
          <Link
            className="btn btn-primary btn-sm ms-2 order-lg-3"
            to="/addproperty"
          >
            <i className="fi-plus me-2"></i>Add
            <span className="d-none d-sm-inline"> property</span>
          </Link>
        )}
        <div
          className={`collapse navbar-collapse order-lg-2 ${
            !showDropDown ? "" : "show"
          }`}
          id="navbarNav"
        >
          <ul
            className="navbar-nav navbar-nav-scroll"
            style={{ maxHeight: "35rem" }}
          >
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/properties" className="nav-link">
                Catalog
              </Link>
            </li>
            {user._id && (
              <div className="my-2">
                <NotificationBell />
              </div>
            )}
            <>
              <li className="nav-item active dropdown-mobile">
                <Link to="/user/dashboard" className="nav-link">
                  Acount
                </Link>
              </li>
              <li className="nav-item active dropdown-mobile">
                <span
                  to="/login"
                  className="nav-link cursor-pointer"
                  onClick={onSignOut}
                >
                  Sign Out
                </span>
              </li>
              {!user._id && (
                <li className="nav-item active dropdown-mobile">
                  <Link to="/login" className="nav-link">
                    Sign In
                  </Link>
                </li>
              )}
            </>
          </ul>
        </div>
      </div>
    </header>
  );
}
