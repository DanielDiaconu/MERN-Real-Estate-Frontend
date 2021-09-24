import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";

function PropertyAddAnswer({ cancelReply, postReply }) {
  const user = useSelector(selectUser);
  const [answer, setAnswer] = useState("");

  const handlePostReply = () => {
    postReply(answer);
  };

  return (
    <>
      <label className="form-label" htmlFor="ap-description">
        Reply
      </label>
      <textarea
        name="overview"
        value={answer}
        className="form-control"
        id="ap-description"
        onChange={(e) => setAnswer(e.target.value)}
        rows="3"
        placeholder="Enter your reply here"
      ></textarea>
      <div className="mt-3">
        <button className="btn btn-primary p-2 me-2" onClick={handlePostReply}>
          Answer
        </button>
        <button
          className="btn btn-outline-danger p-2 ms-2"
          onClick={cancelReply}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default PropertyAddAnswer;
