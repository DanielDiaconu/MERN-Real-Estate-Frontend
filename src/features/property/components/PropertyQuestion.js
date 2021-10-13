import moment from "moment";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import PropertyAddAnswer from "./PropertyAddAnswer";
import PropertyAnswer from "./PropertyAnswer";
import SmallLoader from "../../shared/components/SmallLoader";

const PropertyQuestion = forwardRef(
  (
    {
      property,
      question,
      handlePostReply,
      handleQuestionLike,
      handleQuestionDislike,
      handleReplyLike,
      handleReplyDislike,
      handleQuestionDelete,
      onReplyDelete,
      onQuestionAnsweredStatus,
    },
    ref
  ) => {
    const [replyState, setReplyState] = useState(false);
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(false);
    const [isFaded, setIsFaded] = useState(false);

    const enableLoading = () => {
      setLoading(true);
    };

    const handleQuestionAnsweredStatus = () => {
      onQuestionAnsweredStatus(question, !question?.isAnswered);
    };

    const onHovering = () => {
      if (question?.dislikes?.count > question?.likes?.count) {
        setIsFaded(false);
      }
    };

    const onHoveringOut = () => {
      if (question?.dislikes?.count > question?.likes?.count) {
        setIsFaded(true);
      }
    };
    const disableLoading = () => {
      setLoading(false);
    };

    useImperativeHandle(ref, () => ({
      disableLoading,
      enableLoading,
    }));

    const parseTime = () => {
      return moment(question?.createdAt).format("MMM DD,YYYY");
    };

    const deleteQuestion = () => {
      handleQuestionDelete(question);
    };

    const onPostReply = (data) => {
      setReplyState(false);
      handlePostReply(data, question);
    };

    const onQuestionLike = () => {
      handleQuestionLike(question);
    };

    const onQuestionDislike = () => {
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
      handleReplyLike(replyId, question);
    };

    const onReplyDislike = (replyId) => {
      handleReplyDislike(replyId, question);
    };

    const handleReplyDelete = (replyId) => {
      onReplyDelete(replyId, question._id);
    };

    useEffect(() => {
      setIsFaded(false);
      if (question) {
        if (question?.dislikes?.count > question?.likes?.count) {
          setIsFaded(true);
        }
      }
    }, [question]);

    return (
      <>
        <div
          className={`mb-4 pb-4 ${
            isFaded ? "faded-question" : ""
          } border-bottom property-question`}
          onMouseEnter={onHovering}
          onMouseLeave={onHoveringOut}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
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
            <div className="d-flex align-items-center">
              {question?.userId?._id === user?._id && (
                <i
                  className={`fas fa-check ${
                    question?.isAnswered ? "active" : ""
                  }  me-3`}
                  title={` ${
                    question?.isAnswered
                      ? "Question marked as answered by user."
                      : "Mark this question as answered."
                  }`}
                  onClick={handleQuestionAnsweredStatus}
                ></i>
              )}
              <span className="text-muted fs-sm">{parseTime()}</span>
            </div>
          </div>
          <p>{question?.questionBody}</p>
          {!replyState ? (
            <div className="d-flex single-property-replies align-items-center ">
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
              {question?.userId?._id === user?._id && (
                <div className="ms-3 cursor-pointer" onClick={deleteQuestion}>
                  <i className="fas fa-trash-alt"></i>
                </div>
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
              isLast={i === question?.replies?.length - 1}
              isFirst={i === 0}
              key={i}
              reply={reply}
              handleReplyLike={onReplyLike}
              handleReplyDislike={onReplyDislike}
              user={user}
              handleReplyDelete={handleReplyDelete}
            />
          ))}
          {loading && (
            <div className="d-flex align-items-center justify-content-center mb-2 mt-2">
              <SmallLoader />
            </div>
          )}
        </div>
      </>
    );
  }
);

export default PropertyQuestion;
