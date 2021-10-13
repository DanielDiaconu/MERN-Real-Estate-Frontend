import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getNotifications,
  selectCount,
  selectNotifications,
  updateNotifications,
} from "../../../slices/notificationCountSlice";
import { selectUser } from "../../../slices/userSlice";

function NotificationBell() {
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const count = useSelector(selectCount);
  const user = useSelector(selectUser);
  const notifications = useSelector(selectNotifications);

  const displayNotifications = async () => {
    setShowNotifications((prev) => !prev);
    await axios.patch(`http://localhost:8080/notifications/${user._id}`);
  };

  const formatDate = (time) => {
    return moment(time).format("DD MMM, H:mm");
  };

  useEffect(() => {
    dispatch(getNotifications(user?._id));
  }, [count]);

  return (
    <>
      <div class="dropdown ms-3 notification-bell">
        {!showNotifications && count === 0 && (
          <span className="notification-count">{count}</span>
        )}
        <span
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={displayNotifications}
        >
          <i class="fas fa-bell"></i>
        </span>
        <ul
          class="dropdown-menu"
          aria-labelledby="dropdownMenu2"
          style={{ width: "500px" }}
        >
          {notifications?.map((notification, i) => (
            <li
              className={`d-flex align-items-center justify-content-between ${
                !notification?.readStatus ? "read-status" : ""
              }`}
              key={i}
            >
              <div className="d-flex align-items-center  notification-container">
                <i
                  className={`fas ${notification.notificationType} notification-types`}
                ></i>
                <span>{notification.body}</span>
              </div>
              <span className="me-2">{formatDate(notification.createdAt)}</span>
            </li>
          ))}
          {notifications?.length === 0 && (
            <div className="notification-container">
              You currently have no new notifications{" "}
              <Link to="/user/dashboard/notifications">click here</Link> if you
              wish to see all notifications.
            </div>
          )}
        </ul>
      </div>
    </>
  );
}

export default NotificationBell;
