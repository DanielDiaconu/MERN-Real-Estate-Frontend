import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";

function PropertyAddQuestions({ handleQuestionCancel, postQuestion }) {
  const [question, setQuestion] = useState({ questionBody: "" });

  return (
    <div className="mt-3">
      <label className="form-label" htmlFor="ap-description">
        Question
      </label>
      <textarea
        name="overview"
        value={question.questionBody}
        className="form-control"
        id="ap-description"
        rows="3"
        placeholder="Enter your question here"
        onChange={(e) =>
          setQuestion({ ...question, questionBody: e.target.value })
        }
      ></textarea>
      <div className="mt-3">
        <button
          className="btn btn-primary p-2 me-2"
          onClick={() => postQuestion(question.questionBody)}
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
