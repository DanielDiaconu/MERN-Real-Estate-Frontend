import React, { useState } from "react";

function PropertyAddQuestions({ handleQuestionCancel, postQuestion }) {
  const [questionBody, setQuestionBody] = useState("");

  return (
    <div className="mt-3">
      <label className="form-label" htmlFor="ap-description">
        Question
      </label>
      <textarea
        name="overview"
        value={questionBody}
        className="form-control"
        id="ap-description"
        rows="3"
        placeholder="Enter your question here"
        onChange={(e) => setQuestionBody(e.target.value)}
      ></textarea>
      <div className="mt-3">
        <button
          className="btn btn-primary p-2 me-2"
          onClick={() => postQuestion(questionBody)}
        >
          Post
        </button>
        <button
          className="btn btn-outline-danger p-2 ms-2"
          onClick={handleQuestionCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PropertyAddQuestions;
