import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  getNotifications,
  selectCount,
  selectNotifications,
  updateNotifications,
} from "../../../slices/notificationCountSlice";
import { selectUser } from "../../../slices/userSlice";
import useOnClickOutside from "../hooks/ClickOutside";
import NotificationDropdownItem from "./NotificationDropdownItem";

function NotificationBell() {
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const count = useSelector(selectCount);
  const user = useSelector(selectUser);
  const notifications = useSelector(selectNotifications);
  const ref = useRef();
  const location = useLocation();

  useOnClickOutside(ref, () => {
    setShowNotifications(false);
  });

  const displayNotifications = async () => {
    setShowNotifications((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getNotifications(user?._id));
  }, [count]);

  useEffect(async () => {
    if (showNotifications && count > 0) {
      dispatch(updateNotifications(user._id));
    }
  }, [showNotifications]);

  useEffect(() => {
    setShowNotifications(false);
  }, [location]);

  return (
    <>
      <div
        className="dropdown ms-3 notification-bell"
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        {count !== 0 && <span className="notification-count">{count}</span>}
        <span
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={displayNotifications}
        >
          <i className="fas fa-bell"></i>
        </span>
        <ul
          className={`dropdown-menu ${showNotifications ? "show" : ""}`}
          aria-labelledby="dropdownMenu2"
          style={{ width: "500px" }}
        >
          {notifications?.map((notification, i) => (
            <NotificationDropdownItem key={i} notification={notification} />
          ))}
          {!!notifications.length && (
            <div className="text-center">
              <Link
                to="/user/dashboard/notifications"
                className="text-align-center"
                onClick={() => setShowNotifications(false)}
              >
                View all
              </Link>
            </div>
          )}
          {notifications?.length === 0 && (
            <div className="notification-container">
              You currently have no new notifications.
            </div>
          )}
        </ul>
      </div>
    </>
  );
}

export default NotificationBell;
