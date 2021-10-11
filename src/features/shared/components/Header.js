import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../../slices/userSlice";
import UserAvatar from "../../user/components/UserAvatar";
import NotificationBell from "./NotificationBell";

export default function Header() {
  const user = useSelector(selectUser);

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

        <Link
          className="btn btn-primary btn-sm ms-2 order-lg-3"
          to="/addproperty"
        >
          <i className="fi-plus me-2"></i>Add
          <span className="d-none d-sm-inline"> property</span>
        </Link>
        <div className="collapse navbar-collapse order-lg-2" id="navbarNav">
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
          </ul>
          <div>
            <NotificationBell />
          </div>
        </div>
      </div>
    </header>
  );
}
