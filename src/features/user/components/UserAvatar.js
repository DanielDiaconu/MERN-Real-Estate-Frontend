import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { selectUser } from "../../../slices/userSlice";
import { socket } from "../../../sockets";
import displayStarsRating from "../../shared/components/StarsRating";

function UserAvatar() {
  const user = useSelector(selectUser);
  const history = useHistory();

  const handleSignOut = () => {
    sessionStorage.removeItem("auth-token");
    socket.disconnect();
    history.push("/login");
  };

  return (
    <>
      <div className="dropdown dropdown-with-hover d-none d-lg-block  order-lg-3 my-n2 me-3">
        <div className="align-items-center d-flex">
          <i className="fi-wallet opacity-60 me-2"></i>
          <span className="me-2">{user?.funds}$</span>

          <div className="d-block py-2">
            <img
              className="rounded-circle"
              src={`https://mern-online-properties.herokuapp.com/images/avatars/${user?.avatar}`}
              width="40"
              height="40"
            />
          </div>
        </div>
        <div className="dropdown-menu dropdown-menu-with-hover dropdown-menu-end">
          <div
            className="d-flex align-items-start border-bottom px-3 py-1 mb-2"
            style={{ width: "16rem" }}
          >
            <img
              className="rounded-circle"
              src={`https://mern-online-properties.herokuapp.com/images/avatars/${user?.avatar}`}
              width="48"
            />
            <div className="ps-2">
              <h6 className="fs-base mb-0">{user?.fullName}</h6>
              <span className="star-rating star-rating-sm">
                {displayStarsRating(user?.rating?.average)}
              </span>
              <div className="fs-xs py-2">
                {user.phone}
                <br />
                {user.email}
              </div>
            </div>
          </div>
          <Link className="dropdown-item" to="/user/dashboard/personal-info">
            <i className="fi-user opacity-60 me-2"></i>Personal Info
          </Link>
          <Link
            className="dropdown-item"
            to="/user/dashboard/password-security"
          >
            <i className="fi-lock opacity-60 me-2"></i>Password &amp; Security
          </Link>
          <Link className="dropdown-item" to="/user/dashboard/my-properties">
            <i className="fi-home opacity-60 me-2"></i>My Properties
          </Link>
          <Link className="dropdown-item" to="/user/dashboard/wishlist">
            <i className="fi-heart opacity-60 me-2"></i>Wishlist
          </Link>
          <Link className="dropdown-item" to="/user/dashboard/wallet">
            <i className="fi-wallet opacity-60 me-2"></i>Payment & Funds
          </Link>

          <Link className="dropdown-item" to="/user/dashboard/notifications">
            <i className="fi-bell opacity-60 me-2"></i>Notifications
          </Link>
          <div className="dropdown-divider"></div>

          <a
            className="dropdown-item"
            onClick={handleSignOut}
            style={{ cursor: "pointer" }}
          >
            Sign Out
          </a>
        </div>
      </div>
    </>
  );
}

export default UserAvatar;
