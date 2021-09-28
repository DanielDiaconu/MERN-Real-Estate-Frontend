import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import PropertyAddAnswer from "../../property/components/PropertyAddAnswer";
import PropertyAnswer from "../../property/components/PropertyAnswer";

function PropertyQuestionAndAnswer({
  property,
  question,
  handlePostReply,
  handleQuestionLike,
  handleQuestionDislike,
  handleReplyLike,
  handleReplyDislike,
}) {
  const [replyState, setReplyState] = useState(false);
  const user = useSelector(selectUser);

  const parseTime = () => {
    return moment(question?.createdAt).format("MMM DD,YYYY");
  };

  const onPostReply = async (data) => {
    setReplyState(false);
    handlePostReply(data, question);
  };

  const onQuestionLike = async () => {
    handleQuestionLike(question);
  };

  const onQuestionDislike = async () => {
    handleQuestionDislike(question);
  };

  const handleReply = () => {
    setReplyState((prev) => !prev);
  };

  const hasLiked = () => {
    return question?.likes.userIds?.includes(user?._id) ? "active" : "";
  };

  const hasDisliked = () => {
    return question?.dislikes?.userIds?.includes(user?._id) ? "active" : "";
  };

  const onReplyLike = (replyId) => {
    console.log(replyId);
    handleReplyLike(replyId, question);
  };

  const onReplyDislike = (replyId) => {
    handleReplyDislike(replyId, question);
  };

  return (
    <>
      <div className="mb-4 pb-4 border-bottom">
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex align-items-center pe-2">
            <img
              className="rounded-circle me-1"
              src={`http://localhost:8080/images/avatars/${question?.userId?.avatar}`}
              width="48"
              alt="Avatar"
            />
            <div className="ps-2">
              <h6 className="fs-base mb-0">{question?.userId?.fullName}</h6>
            </div>
          </div>
          <span className="text-muted fs-sm">{parseTime()}</span>
        </div>
        <p>{question?.questionBody}</p>
        {!replyState ? (
          <div className="d-flex align-items-center">
            <button
              className={`btn-like ${hasLiked()}`}
              type="button"
              onClick={onQuestionLike}
            >
              <i className="fi-like"></i>
              <span>({question?.likes?.count})</span>
            </button>
            <div className="border-end me-1">&nbsp;</div>
            <button
              className={`btn-dislike ${hasDisliked()}`}
              type="button"
              onClick={onQuestionDislike}
            >
              <i className="fi-dislike"></i>
              <span>({question?.dislikes?.count})</span>
            </button>
            {user?.myProperties?.includes(property?._id) && (
              <span className="ms-2 cursor-pointer" onClick={handleReply}>
                <i className="fi-reply mb-1"></i>
                <span className="ms-1 ">Reply </span>
              </span>
            )}
          </div>
        ) : (
          <PropertyAddAnswer
            cancelReply={() => setReplyState(false)}
            postReply={onPostReply}
          />
        )}
        {question?.replies?.map((reply, i) => (
          <PropertyAnswer
            key={i}
            reply={reply}
            handleReplyLike={onReplyLike}
            handleReplyDislike={onReplyDislike}
            user={user}
          />
        ))}
      </div>
    </>
  );
}

export default PropertyQuestionAndAnswer;
