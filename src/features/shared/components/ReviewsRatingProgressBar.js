import React from "react";

function ReviewsRatingProgressBar({ rating, reviews }) {
  const calculateProggres = () => {
    const filteredReviews = reviews?.filter(
      (review) => review.rating === rating
    );
    return (filteredReviews?.length / reviews?.length) * 100;
  };

  return (
    <>
      <div className="d-flex align-items-center mb-2">
        <div className="text-nowrap fs-sm me-3">
          {rating}
          <i className="fi-star text-muted ms-1 mt-n1"></i>
        </div>
        <div className="progress w-100">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${calculateProggres()}%` }}
            aria-valuenow="70"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div
          className="flex-shrink-0 flex-grow-1 fs-sm text-end ps-2"
          style={{ width: "3rem" }}
        >
          {reviews?.length !== 0 ? Math.round(calculateProggres()) : 0}%
        </div>
      </div>
    </>
  );
}

export default ReviewsRatingProgressBar;
