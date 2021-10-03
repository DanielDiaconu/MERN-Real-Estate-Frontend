import React, { useState } from "react";
import Pagination from "../../shared/components/Pagination";
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
}) {
  const [toggleAddReview, setToggleAddReview] = useState(false);

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
        <div className="d-flex align-items-center mb-2">
          <div className="text-nowrap fs-sm me-3">
            5<i className="fi-star text-muted ms-1 mt-n1"></i>
          </div>
          <div className="progress w-100">
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: "70%" }}
              aria-valuenow="70"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div
            className="flex-shrink-0 flex-grow-1 fs-sm text-end ps-2"
            style={{ width: "3rem" }}
          >
            70%
          </div>
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="text-nowrap fs-sm me-3">
            4<i className="fi-star text-muted ms-1 mt-n1"></i>
          </div>
          <div className="progress w-100">
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: "15%" }}
              aria-valuenow="15"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div
            className="flex-shrink-0 flex-grow-1 fs-sm text-end ps-2"
            style={{ width: "3rem" }}
          >
            15%
          </div>
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="text-nowrap fs-sm me-3">
            3<i className="fi-star text-muted ms-1 mt-n1"></i>
          </div>
          <div className="progress w-100">
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: "0" }}
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div
            className="flex-shrink-0 flex-grow-1 fs-sm text-end ps-2"
            style={{ width: "3rem" }}
          >
            0%
          </div>
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="text-nowrap fs-sm me-3">
            2<i className="fi-star text-muted ms-1 mt-n1"></i>
          </div>
          <div className="progress w-100">
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: "10%" }}
              aria-valuenow="10"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div
            className="flex-shrink-0 flex-grow-1 fs-sm text-end ps-2"
            style={{ width: "3rem" }}
          >
            10%
          </div>
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="text-nowrap fs-sm me-3">
            1<i className="fi-star text-muted ms-1 mt-n1"></i>
          </div>
          <div className="progress w-100">
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: "5%" }}
              aria-valuenow="5"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div
            className="flex-shrink-0 flex-grow-1 fs-sm text-end ps-2"
            style={{ width: "3rem" }}
          >
            5%
          </div>
        </div>
        <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch justify-content-between border-bottom py-4 mt-3 mb-4">
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
                ...
              </option>
              <option value="-createdAt">Newest</option>
              <option value="createdAt">Oldest</option>
              <option value="-rating">High rating</option>
              <option value="rating">Low rating</option>
            </select>
          </div>
          <a
            className="btn btn-outline-primary"
            onClick={() => setToggleAddReview((prev) => !prev)}
          >
            <i className="fi-edit me-1"></i>Add review
          </a>
        </div>
        {toggleAddReview ? (
          <UserProfileAddReview handleReviewPost={handleReviewPost} />
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
            <Pagination
              limit={4}
              count={count}
              handlePageChange={onPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfileReviews;
