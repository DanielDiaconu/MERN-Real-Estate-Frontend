import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import Pagination from "../../shared/components/Pagination";

function UserNotifications() {
  const user = useSelector(selectUser);
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getNotifications = async () => {
    let res = await axios.get(
      `http://localhost:8080/notifications/user/${user?._id}?page=${page}`
    );
    setNotifications(res.data.results);
    setTotal(res.data.total);
  };

  const handlePageChange = (data) => {
    setPage(data);
  };

  const formatDate = (time) => {
    return moment(time).format("DD MMM, H:mm");
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
            <div
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
