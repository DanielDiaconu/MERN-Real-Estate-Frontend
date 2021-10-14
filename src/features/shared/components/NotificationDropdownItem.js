import moment from "moment";
import React from "react";
import { useHistory } from "react-router";

function NotificationDropdownItem({ notification }) {
  const history = useHistory();

  const formatDate = (time) => {
    return moment(time).format("DD MMM, H:mm");
  };

  const onNavigateToNotification = () => {
    if (notification.notificationType === "star") {
      history.push(`/profile/${notification.targetId}`);
    } else {
      history.push(`/property/${notification.targetId}`);
    }
  };

  return (
    <>
      <li
        className={`d-flex align-items-center justify-content-between cursor-pointer notification-item`}
        onClick={onNavigateToNotification}
      >
        <div className="d-flex align-items-center  notification-container">
          <i
            className={`fas fa-${notification?.notificationType} notification-types`}
          ></i>
          <span>{notification?.body}</span>
        </div>
        <span className="me-2">{formatDate(notification?.createdAt)}</span>
      </li>
    </>
  );
}

export default NotificationDropdownItem;
