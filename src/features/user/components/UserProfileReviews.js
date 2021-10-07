import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import Pagination from "../../shared/components/Pagination";
import ReviewsRatingProgressBar from "../../shared/components/ReviewsRatingProgressBar";
import SmallLoader from "../../shared/components/SmallLoader";
import UserProfileAddReview from "./UserProfileAddReview";
import UserProfileReviewCard from "./UserProfileReviewCard";

function UserProfileReviews({
  onReviewPost,
  reviews,
  count,
  onPageChange,
  handleReviewDelete,
  total,
  loading,
  handleSorting,
  profileUser,
}) {
  const [toggleAddReview, setToggleAddReview] = useState(false);
  const user = useSelector(selectUser);

  const onSortChange = (e) => {
    handleSorting(e.target.value);
  };

  const handleReviewPost = (data) => {
    onReviewPost(data);
    setToggleAddReview(false);
  };
  return (
    <div>
      <div className="col-lg-9 col-md-8">
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2">
          <h1 className="h2 text-center text-sm-start mb-0">
            Reviews ({total})
          </h1>
        </div>
        <ReviewsRatingProgressBar rating={5} reviews={reviews} />
        <ReviewsRatingProgressBar rating={4} reviews={reviews} />
        <ReviewsRatingProgressBar rating={3} reviews={reviews} />
        <ReviewsRatingProgressBar rating={2} reviews={reviews} />
        <ReviewsRatingProgressBar rating={1} reviews={reviews} />
        <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch justify-content-between border-bottom py-4 mt-3 mb-4">
          {reviews?.length > 0 && (
            <div className="d-flex align-items-center me-sm-4 mb-sm-0 mb-3">
              <label className="me-2 pe-1 text-nowrap" htmlFor="review-sorting">
                <i className="fi-arrows-sort text-muted mt-n1 me-2"></i>Sort by:
              </label>
              <select
                className="form-select"
                id="review-sorting"
                name="sort"
                onChange={onSortChange}
              >
                <option selected disabled>
                  Select a sorting option
                </option>
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
                <option value="-rating">High rating</option>
                <option value="rating">Low rating</option>
              </select>
            </div>
          )}
          {/* {profileUser?._id !== user?._id && ( */}
          <a
            className="btn btn-outline-primary"
            onClick={() => setToggleAddReview((prev) => !prev)}
          >
            <i className="fi-edit me-1"></i>Add review
          </a>
          {/* )} */}
        </div>
        {toggleAddReview ? (
          <>
            <UserProfileAddReview handleReviewPost={handleReviewPost} /> )
          </>
        ) : (
          <>
            {reviews?.map((review, i) => (
              <UserProfileReviewCard
                key={i}
                review={review}
                handleReviewDelete={handleReviewDelete}
              />
            ))}
            {loading && (
              <div className="d-flex align-items-center justify-content-center mb-2 mt-2">
                <SmallLoader />
              </div>
            )}
            {reviews?.length > 0 && (
              <Pagination
                limit={4}
                count={count}
                handlePageChange={onPageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfileReviews;