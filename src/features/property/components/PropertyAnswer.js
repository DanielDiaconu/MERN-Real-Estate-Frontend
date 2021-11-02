import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

function PropertyAnswer({
  reply,
  handleReplyLike,
  handleReplyDislike,
  user,
  isLast,
  isFirst,
  handleReplyDelete,
}) {
  const parseTime = () => {
    return moment(reply?.createdAt).format("MMM DD,YYYY");
  };

  const hasLiked = () => {
    return reply?.likes.userIds?.includes(user?._id) ? "active" : "";
  };

  const hasDisliked = () => {
    return reply?.dislikes?.userIds?.includes(user?._id) ? "active" : "";
  };

  const onReplyLike = () => {
    handleReplyLike(reply._id);
  };

  const onReplyDislike = () => {
    handleReplyDislike(reply._id);
  };

  const deleteReply = () => {
    handleReplyDelete(reply._id);
  };

  return (
    <>
      <div
        className={`mt-3  ms-5  ${isFirst ? "mt-4" : ""} ${
          !isLast ? "border-bottom pb-3  mb-2" : ""
        }  `}
      >
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex align-items-center pe-2">
            <Link to={`/profile/${reply?.userId?._id}`}>
              <img
                className="rounded-circle me-1 user-avatar-thumbnail"
                src={`https://mern-online-properties.herokuapp.com/images/avatars/${reply?.userId?.avatar}`}
                alt="Avatar"
              />
            </Link>
            <div className="ps-2 d-flex align-items-center">
              <Link
                className="text-decoration-hover"
                to={`/profile/${reply?.userId?._id}`}
              >
                <h6 className="fs-base mb-0">{reply?.userId?.fullName} </h6>
              </Link>
              <span className="owner-reply-pill">owner</span>
            </div>
          </div>
          <span className="text-muted fs-sm">{parseTime()}</span>
        </div>
        <p>{reply?.replyBody}</p>
        <div className="d-flex align-items-center">
          <button
            className={`btn-like ${hasLiked()}`}
            type="button"
            onClick={onReplyLike}
          >
            <i className="fi-like"></i>
            <span>({reply?.likes?.count})</span>
          </button>

          <div className="border-end me-1">&nbsp;</div>
          <button
            className={`btn-dislike ${hasDisliked()}`}
            type="button"
            onClick={onReplyDislike}
          >
            <i className="fi-dislike"></i>
            <span>({reply?.dislikes?.count})</span>
          </button>
          {user?._id === reply?.userId?._id && (
            <div className="ms-3 cursor-pointer" onClick={deleteReply}>
              <i className="fas fa-trash-alt"></i>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PropertyAnswer;
