import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import displayStarsRating from "../../shared/components/StarsRating";
import StarsRating from "../../shared/components/StarsRating";

function UserProfileReviewCard({ review, handleReviewDelete }) {
  const user = useSelector(selectUser);
  const parseTime = () => {
    return moment(review?.createdAt).format(" DD MMM, YYYY");
  };

  const onReviewDelete = () => {
    handleReviewDelete(review._id);
  };

  return (
    <>
      <div className="mb-4 pb-4 border-bottom">
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex align-items-center pe-2">
            <img
              className="rounded-circle me-1"
              src={`http://localhost:8080/images/avatars/${review?.userId?.avatar}`}
              width="48"
              alt="Avatar"
            />
            <div className="ps-2">
              <h6 className="fs-base mb-0">{review?.userId?.fullName}</h6>
              <span className="star-rating">
                {displayStarsRating(review?.rating)}
              </span>
            </div>
          </div>
          <div>
            <span className="text-muted fs-sm">{parseTime()}</span>
            {review?.profileUser === user?._id && (
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
