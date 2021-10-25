import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../../../slices/userSlice";
import Loader from "../../shared/components/Loader";
import Pagination from "../../shared/components/Pagination";
import SmallLoader from "../../shared/components/SmallLoader";

function UserNotifications() {
  const user = useSelector(selectUser);
  const [notifications, setNotifications] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const history = useHistory();

  const getNotifications = async () => {
    SetLoading(true);
    let res = await axios.get(
      `https://mern-online-properties.herokuapp.com/notifications/user/${user?._id}?page=${page}`
    );
    setNotifications(res.data.results);
    setTotal(res.data.total);
    SetLoading(false);
  };

  const handlePageChange = (data) => {
    setPage(data);
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
      return <h6 className="mb-1">{`You have a new ${notificationType}`}</h6>;
    } else if (notificationType === "thumbs-up") {
      return <h6 className="mb-1">{`You received a like!`}</h6>;
    } else if (notificationType === "thumbs-down") {
      return <h6 className="mb-1">{`You received a dislike!`}</h6>;
    } else {
      return <h6 className="mb-1">{`You have a new review!`}</h6>;
    }
  };

  useEffect(() => {
    getNotifications();
  }, [page, user]);

  return (
    <div>
      <div className="col-lg-8 col-md-7 mb-5">
        <h1 className="h2">Notifications</h1>
        <p className="pt-1 mb-4">
          Get real-time updates on your favorite homes, neighborhoods, and more.
        </p>
        <div>
          {notifications?.map((notification, i) => (
            <div className="d-flex justify-content-between mb-4" key={i}>
              <div className="me-2">
                {/* <h6 className="mb-1">{notification?.notificationType}</h6>
                 */}
                <div className="d-flex align-items-center">
                  <i
                    className={`fas fa-${notification?.notificationType} notification-types`}
                  ></i>
                  {renderNotificationType(notification?.notificationType)}
                </div>
                <p className="fs-sm mb-0 ms-2">{notification?.body}</p>
              </div>
              <div
                onClick={() => handleNotificationRedirect(notification)}
                className="form-check form-switch text-center d-flex flex-column"
              >
                <i className="fas fa-link cursor-pointer"></i>
                <span className="redirect-text">Visit</span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="d-flex align-items-center justify-content-center mb-2 mt-2">
              {" "}
              <SmallLoader />{" "}
            </div>
          )}
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
