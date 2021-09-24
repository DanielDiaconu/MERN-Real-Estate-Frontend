import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import PropertyAddAnswer from "../../property/components/PropertyAddAnswer";
import PropertyAnswer from "../../property/components/PropertyAnswer";

function PropertyQuestionAndAnswer({ property, question }) {
  const [replyState, setReplyState] = useState(false);
  const [replies, setReplies] = useState(question?.replies);
  const user = useSelector(selectUser);

  const parseTime = () => {
    return moment(question?.createdAt).format("MMM DD,YYYY");
  };

  const handlePostReply = async (data) => {
    try {
      let res = axios.post("http://localhost:8080/replies", {
        replyBody: data,
        userId: user._id,
        questionId: question?._id,
      });
      setReplies([...replies, res.data]);
      setReplyState(false);
    } catch (error) {}
  };

  const handleReply = () => {
    setReplyState((prev) => !prev);
  };

  return (
    <>
      <div class="mb-4 pb-4 border-bottom">
        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex align-items-center pe-2">
            <img
              class="rounded-circle me-1"
              src={`http://localhost:8080/images/avatars/${question?.userId?.avatar}`}
              width="48"
              alt="Avatar"
            />
            <div class="ps-2">
              <h6 class="fs-base mb-0">{question?.userId?.fullName}</h6>
            </div>
          </div>
          <span class="text-muted fs-sm">{parseTime()}</span>
        </div>
        <p>{question?.questionBody}</p>
        {!replyState ? (
          <div class="d-flex align-items-center">
            <button class="btn-like" type="button">
              <i class="fi-like"></i>
              <span>(3)</span>
            </button>
            <div class="border-end me-1">&nbsp;</div>
            <button class="btn-dislike" type="button">
              <i class="fi-dislike"></i>
              <span>(0)</span>
            </button>
            {user.myProperties.includes(property?._id) && (
              <span className="ms-2 cursor-pointer" onClick={handleReply}>
                <i className="fi-reply mb-1"></i>
                <span className="ms-1 ">Reply </span>
              </span>
            )}
          </div>
        ) : (
          <PropertyAddAnswer
            cancelReply={() => setReplyState(false)}
            postReply={handlePostReply}
          />
        )}
        {replies.map((reply, i) => (
          <PropertyAnswer key={i} reply={reply} />
        ))}
      </div>
    </>
  );
}

export default PropertyQuestionAndAnswer;
