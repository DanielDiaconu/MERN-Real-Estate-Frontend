import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../../../slices/userSlice";
import Pagination from "../../shared/components/Pagination";

function UserNotifications() {
  const user = useSelector(selectUser);
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const history = useHistory();

  const getNotifications = async () => {
    let res = await axios.get(
      `http://localhost:8080/notifications/user/${user?._id}?page=${page}`
    );
    setNotifications(res.data.results);
    setTotal(res.data.total);
  };

  console.log(notifications);

  const handlePageChange = (data) => {
    setPage(data);
  };

  const formatDate = (time) => {
    return moment(time).format("DD MMM, H:mm");
  };

  const handleNotificationRedirect = (notification) => {
    if (notification.notificationType === "star") {
      history.push(
        `/profile/${notification.target.parentEntity}?notification=${notification.target.entity}`
      );
    } else {
      history.push(
        `/property/${notification.target.parentEntity}?notification=${notification.target.entity}`
      );
    }
  };

  const renderNotificationType = (notificationType) => {
    if (notificationType === "question") {
      return <h6 class="mb-1">{`You have a new ${notificationType}`}</h6>;
    } else if (notificationType === "thumbs-up") {
      return <h6 class="mb-1">{`You received a like!`}</h6>;
    } else if (notificationType === "thumbs-down") {
      return <h6 class="mb-1">{`You received a dislike!`}</h6>;
    } else {
      return <h6 class="mb-1">{`You have a new review!`}</h6>;
    }
  };

  useEffect(() => {
    getNotifications();
  }, [page, user]);

  return (
    <div>
      <div class="col-lg-8 col-md-7 mb-5">
        <h1 class="h2">Notifications</h1>
        <p class="pt-1 mb-4">
          Get real-time updates on your favorite homes, neighborhoods, and more.
        </p>
        <div>
          {notifications?.map((notification, i) => (
            <div class="d-flex justify-content-between mb-4" key={i}>
              <div class="me-2">
                {/* <h6 class="mb-1">{notification?.notificationType}</h6>
                 */}
                <div className="d-flex align-items-center">
                  <i
                    className={`fas fa-${notification?.notificationType} notification-types`}
                  ></i>
                  {renderNotificationType(notification?.notificationType)}
                </div>
                <p class="fs-sm mb-0 ms-2">{notification?.body}</p>
              </div>
              <div class="form-check form-switch text-center">
                <i
                  onClick={() => handleNotificationRedirect(notification)}
                  class="fas fa-directions cursor-pointer"
                ></i>
              </div>
            </div>
          ))}
          {total > 5 && (
            <Pagination
              handlePageChange={handlePageChange}
              count={total}
              limit={10}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserNotifications;
