import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCount, setCount } from "../../../slices/notificationCountSlice";
import { selectUser } from "../../../slices/userSlice";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleDisplayNotifications = async () => {
    let res = await axios.get(
      `http://localhost:8080/notifications/${user._id}`
    );
    setNotifications(res.data.results);
    dispatch(setCount(0));
  };

  const formatDate = (time) => {
    return moment(time).format("DD MMM, H:mm");
  };

  return (
    <>
      <div class="dropdown ms-3 notification-bell">
        {count !== 0 && <span className="notification-count">{count}</span>}
        <span
          onClick={handleDisplayNotifications}
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
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
              className="d-flex align-items-center justify-content-between"
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
        </ul>
      </div>
    </>
  );
}

export default NotificationBell;
