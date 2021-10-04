import React, { useState } from "react";
import StarsSelect from "../../shared/components/StarsSelect";

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
      <form className="needs-validation" noValidate="">
        <div className="mb-3">
          <label className="form-label" htmlFor="review-rating">
            Rating <span className="text-danger">*</span>
          </label>

          <StarsSelect
            onStarsSelect={(rating) => setReview({ ...review, rating })}
          />
          <div className="invalid-feedback">Please rate the property.</div>
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="review-text">
            Review <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            id="review-text"
            rows="5"
            placeholder="Your review message"
            required=""
            name="description"
            value={review.description}
            onChange={onInputChange}
          ></textarea>
          <div className="invalid-feedback">Please write your review.</div>
        </div>
        <button
          className="btn btn-primary d-block w-100 mb-4"
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
