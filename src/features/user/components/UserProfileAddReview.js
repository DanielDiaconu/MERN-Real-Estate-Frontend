import React, { useState } from "react";

const initObject = {
  description: "",
  rating: 0,
};

function UserProfileAddReview({ handleReviewPost }) {
  const [review, setReview] = useState(initObject);

  const onInputChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const submitReview = (e) => {
    e.preventDefault();
    handleReviewPost(review);
    setReview(initObject);
  };

  return (
    <div>
      <form class="needs-validation" noValidate="">
        <div class="mb-3">
          <label class="form-label" htmlFor="review-rating">
            Rating <span class="text-danger">*</span>
          </label>
          <select
            class="form-select"
            id="review-rating"
            required=""
            name="rating"
            onChange={onInputChange}
          >
            <option defaultValue="" selected disabled>
              Choose rating
            </option>
            <option value={5}>5 stars</option>
            <option value={4}>4 stars</option>
            <option value={3}>3 stars</option>
            <option value={2}>2 stars</option>
            <option value={1}>1 star</option>
          </select>
          <div class="invalid-feedback">Please rate the property.</div>
        </div>
        <div class="mb-4">
          <label class="form-label" htmlFor="review-text">
            Review <span class="text-danger">*</span>
          </label>
          <textarea
            class="form-control"
            id="review-text"
            rows="5"
            placeholder="Your review message"
            required=""
            name="description"
            value={review.description}
            onChange={onInputChange}
          ></textarea>
          <div class="invalid-feedback">Please write your review.</div>
        </div>
        <button
          class="btn btn-primary d-block w-100 mb-4"
          type="submit"
          onClick={submitReview}
          disabled={!review.description || !review.rating}
        >
          Submit a review
        </button>
      </form>
    </div>
  );
}

export default UserProfileAddReview;
