import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../../slices/userSlice";
import displayStarsRating from "../../shared/components/StarsRating";
import StarsRating from "../../shared/components/StarsRating";

function UserProfileReviewCard({ review, handleReviewDelete, isHighlighted }) {
  const user = useSelector(selectUser);
  console.log(review);
  const parseTime = () => {
    return moment(review?.createdAt).format(" DD MMM, YYYY");
  };

  const onReviewDelete = () => {
    handleReviewDelete(review._id);
  };

  return (
    <>
      <div
        className={`mb-4 pb-4 border-bottom ${
          isHighlighted ? "highlighted-notification" : ""
        }`}
      >
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex align-items-center pe-2">
            <Link to={`/profile/${review?.userId?._id}`}>
              <img
                className="rounded-circle me-1"
                src={`http://localhost:8080/images/avatars/${review?.userId?.avatar}`}
                width="48"
                alt="Avatar"
              />
            </Link>
            <div className="ps-2">
              <div className="d-flex position-relative">
                <Link
                  className="text-decoration-hover"
                  to={`/profile/${review?.userId?._id}`}
                >
                  <h6 className="fs-base mb-0">{review?.userId?.fullName}</h6>
                </Link>
                {isHighlighted && (
                  <div className="pinned-question ms-2">
                    <i className="fas fa-thumbtack"></i>
                    <span className="pinned-question-text">Highlighted</span>
                  </div>
                )}
              </div>
              <span className="star-rating">
                {displayStarsRating(review?.rating)}
              </span>
            </div>
          </div>
          <div>
            <span className="text-muted fs-sm">{parseTime()}</span>
            {review?.userId?._id === user?._id && (
              <i className="fas fa-trash-alt ms-4" onClick={onReviewDelete}></i>
            )}
          </div>
        </div>
        <p>{review?.description}</p>
      </div>
    </>
  );
}

export default UserProfileReviewCard;
