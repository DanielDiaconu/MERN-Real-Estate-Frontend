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
              {question?.userId !== user?._id && (
                <div className="ms-3" onClick={deleteQuestion}>
                  <i class="fas fa-trash-alt"></i>
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
