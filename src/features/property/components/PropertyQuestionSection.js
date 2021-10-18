import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast, setSuccessToast } from "../../../slices/toastSlice";
import { selectUser } from "../../../slices/userSlice";
import Pagination from "../../shared/components/Pagination";
import SmallLoader from "../../shared/components/SmallLoader";
import PropertyAddQuestions from "./PropertyAddQuestions";
import PropertyQuestion from "./PropertyQuestion";
import { socket } from "../../../sockets";
import { useLocation } from "react-router";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PropertyQuestionSection({ property, propRef }) {
  const [toggleAddQuestion, setToggleAddQuestion] = useState(false);
  const [propertyClone, setPropertyClone] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [highlightedQuestion, setHighlightedQuestion] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const questionRef = useRef();
  let queryParams = useQuery();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const getQuestions = async () => {
    setQuestionLoading(true);
    let endpoint = `http://localhost:8080/questions/${property?._id}?page=${currentPage}`;

    if (queryParams.has("notification")) {
      endpoint += `&highlight=${queryParams.get("notification")}`;
    }

    try {
      let res = await axios.get(endpoint);
      if (queryParams.has("notification")) {
        let highlightRes = await axios.get(
          `http://localhost:8080/highlighted-question/${queryParams.get(
            "notification"
          )}`
        );
        setHighlightedQuestion(highlightRes.data[0]);
      }
      setQuestions(res.data.results);
      setTotalPages(res.data.total);
      setQuestionLoading(false);
    } catch (error) {
      dispatch(setErrorToast(error.message));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onSortChange = async (e) => {
    let sortUrl = `?sort=${encodeURIComponent(e.target.value)}`;

    if (queryParams.has("notification")) {
      sortUrl += `&highlight=${queryParams.get("notification")}`;
    }

    let res = await axios.get(
      `http://localhost:8080/questions/${property?._id}${sortUrl}`
    );
    setQuestions(res.data.results);
  };

  const handlePostQuestion = async (data) => {
    setQuestionLoading(true);
    try {
      const payload = {
        questionBody: data,
        userId: user._id,
        propertyId: propertyClone._id,
      };
      let res = await axios.post("http://localhost:8080/question", payload);
      setQuestions([...questions, res.data]);
      setToggleAddQuestion(false);
      setQuestionLoading(false);
      await socket.emit("question-post", {
        ...payload,
        ownerId: propertyClone.ownerId._id,
        username: user.fullName,
        propertyId: propertyClone._id,
        questionId: res.data._id,
      });
    } catch (error) {
      dispatch(setErrorToast(error.message));
    }
  };

  const handleQuestionAnsweredStatus = async (question, answeredState) => {
    try {
      await axios.patch(
        `http://localhost:8080/question-answered/${question._id}`,
        {
          answeredState,
        }
      );
      const updatedQuestions = questions.map((qst) => {
        if (qst._id === question._id) {
          return { ...qst, isAnswered: answeredState };
        }
        return qst;
      });
      await socket.emit("question-answered", {
        ownerId: propertyClone.ownerId._id,
        username: user.fullName,
        targetId: propertyClone._id,
      });
      setQuestions(updatedQuestions);
      dispatch(
        setSuccessToast(
          `${
            answeredState
              ? "Question marked as answered."
              : "Question unmarked as answered by user."
          }`
        )
      );
    } catch (error) {}
  };

  const handleQuestionDelete = async (question) => {
    try {
      await axios.delete(`http://localhost:8080/question/${question._id}`);
      const filteredQuestions = questions.filter(
        (qst) => qst._id !== question._id
      );
      setQuestions(filteredQuestions);
      dispatch(setSuccessToast("Question successfully deleted!"));
    } catch (error) {
      dispatch(setErrorToast("An error occured, please try again!"));
    }
  };

  const postReply = async (data, question) => {
    try {
      questionRef.current.enableLoading();
      let res = await axios.post("http://localhost:8080/replies", {
        replyBody: data,
        userId: user._id,
        questionId: question._id,
      });
      const updatedQuestions = questions.map((qst) => {
        if (qst._id === question._id) {
          return { ...qst, replies: [...qst.replies, res.data] };
        }
        return qst;
      });
      questionRef.current.disableLoading();
      setQuestions(updatedQuestions);
    } catch (error) {}
  };

  const handleReplyDelete = async (replyId, questionId) => {
    try {
      await axios.delete(`http://localhost:8080/replies/${replyId}`, {
        questionId,
      });
      const updatedQuestions = questions.map((qst) => {
        if (qst._id === questionId) {
          return {
            ...qst,
            replies: qst.replies.filter((item) => item._id !== replyId),
          };
        }
        return qst;
      });
      setQuestions(updatedQuestions);
      dispatch(setSuccessToast("Reply deleted successfully!"));
    } catch (error) {
      dispatch(setErrorToast("An error occured, please try again!"));
    }
  };

  const handleQuestionLike = async (question) => {
    try {
      await axios.patch(`http://localhost:8080/question-like/${question._id}`, {
        userId: user._id,
      });
      if (!question.likes.userIds.includes(user._id)) {
        await socket.emit("question-like", {
          ownerId: question.userId._id,
          username: user.fullName,
          propertyId: propertyClone._id,
          questionId: question._id,
        });
        const updatedQuestions = questions.map((qst) => {
          if (qst._id === question._id) {
            const updatedQuestion = {
              ...qst,
              likes: {
                count: qst.likes.count + 1,
                userIds: [...qst.likes.userIds, user._id],
              },
            };
            if (qst.dislikes.userIds.includes(user._id)) {
              updatedQuestion.dislikes.count = qst.dislikes.count - 1;
              updatedQuestion.dislikes.userIds = qst.dislikes.userIds.filter(
                (item) => item !== user._id
              );
            }
            return updatedQuestion;
          }

          return qst;
        });
        setQuestions(updatedQuestions);
      } else {
        const updatedQuestions = questions.map((qst) => {
          if (qst._id === question._id) {
            return {
              ...qst,
              likes: {
                count: qst.likes.count - 1,
                userIds: qst.likes.userIds.filter((item) => item !== user._id),
              },
            };
          }
          return qst;
        });
        setQuestions(updatedQuestions);
      }
      dispatch(setSuccessToast("Successfully reacted to question!"));
    } catch (error) {}
  };

  const handleQuestionDislike = async (question) => {
    try {
      await axios.patch(
        `http://localhost:8080/question-dislikes/${question._id}`,
        {
          userId: user?._id,
        }
      );

      if (!question.dislikes.userIds.includes(user._id)) {
        await socket.emit("question-dislike", {
          ownerId: question.userId._id,
          username: user.fullName,
          propertyId: propertyClone._id,
          questionId: question._id,
        });
        const updatedQuestions = questions.map((qst) => {
          if (qst._id === question._id) {
            const updatedQuestion = {
              ...qst,
              dislikes: {
                count: qst.dislikes.count + 1,
                userIds: [...qst.dislikes.userIds, user._id],
              },
            };
            if (qst.likes.userIds.includes(user._id)) {
              updatedQuestion.likes.count = qst.likes.count - 1;
              updatedQuestion.likes.userIds = qst.dislikes.userIds.filter(
                (item) => item !== user._id
              );
            }
            return updatedQuestion;
          }
          return qst;
        });
        setQuestions(updatedQuestions);
      } else {
        const updatedQuestions = questions.map((qst) => {
          if (qst._id === question._id) {
            return {
              ...qst,
              dislikes: {
                count: qst.dislikes.count - 1,
                userIds: qst.dislikes.userIds.filter(
                  (item) => item !== user._id
                ),
              },
            };
          }
          return qst;
        });
        setQuestions(updatedQuestions);
      }
      dispatch(setSuccessToast("Succesfully reacted to question !"));
    } catch (error) {}
  };

  const handleReplyLike = async (replyId, question) => {
    try {
      await axios.patch(`http://localhost:8080/reply-like/${replyId}`, {
        userId: user._id,
      });
      await socket.emit("reply-like", {
        ownerId: propertyClone.ownerId._id,
        username: user.fullName,
        propertyId: propertyClone._id,
        questionId: question._id,
      });
      const updatedQuestions = questions.map((qst) => {
        if (qst._id === question._id) {
          const updatedReplies = qst.replies.map((reply) => {
            if (reply._id === replyId) {
              if (!reply.likes.userIds.includes(user._id)) {
                const updateReply = {
                  ...reply,
                  likes: {
                    count: reply.likes.count + 1,
                    userIds: [...reply.likes.userIds, user._id],
                  },
                };
                if (reply.dislikes.userIds.includes(user._id)) {
                  updateReply.dislikes.count = reply.dislikes.count - 1;
                  updateReply.dislikes.userIds = reply.dislikes.userIds.filter(
                    (item) => item !== user._id
                  );
                }
                return updateReply;
              } else {
                const updateReply = {
                  ...reply,
                  likes: {
                    count: reply.likes.count - 1,
                    userIds: reply.likes.userIds.filter(
                      (item) => item !== user._id
                    ),
                  },
                };
                return updateReply;
              }
            }
            return reply;
          });
          return { ...qst, replies: updatedReplies };
        }
        return qst;
      });
      setQuestions(updatedQuestions);
      dispatch(setSuccessToast("Successfully reacted to reply!"));
    } catch (error) {
      dispatch(setErrorToast("Something went wrong while reacting!"));
    }
  };

  const handleReplyDislike = async (replyId, question) => {
    try {
      await axios.patch(`http://localhost:8080/reply-dislike/${replyId}`, {
        userId: user._id,
      });
      await socket.emit("reply-dislike", {
        ownerId: propertyClone.ownerId._id,
        username: user.fullName,
        propertyId: propertyClone._id,
        questionId: question._id,
      });
      const updatedQuestions = questions.map((qst) => {
        if (qst._id === question._id) {
          const updatedReplies = qst.replies.map((reply) => {
            if (reply._id === replyId) {
              if (!reply.dislikes.userIds.includes(user._id)) {
                const updatedReply = {
                  ...reply,
                  dislikes: {
                    count: reply.dislikes.count + 1,
                    userIds: [...reply.dislikes.userIds, user._id],
                  },
                };
                if (reply.likes.userIds.includes(user._id)) {
                  updatedReply.likes.count = reply.likes.count - 1;
                  updatedReply.likes.userIds = reply.likes.userIds.filter(
                    (item) => item !== user._id
                  );
                }
                return updatedReply;
              }
              return {
                ...reply,
                dislikes: {
                  count: reply.dislikes.count - 1,
                  userIds: reply.dislikes.userIds.filter(
                    (item) => item !== user._id
                  ),
                },
              };
            }
            return reply;
          });
          return { ...qst, replies: updatedReplies };
        }
        return qst;
      });
      setQuestions(updatedQuestions);
      dispatch(setSuccessToast("Successfully reacted to reply!"));
    } catch (error) {
      dispatch(setErrorToast("Something went wrong while reacting!"));
    }
  };

  useEffect(() => {
    setPropertyClone(property);
  }, [property]);

  useEffect(() => {
    getQuestions();
  }, [currentPage]);

  return (
    <>
      <div className="mb-4 pb-4 border-bottom" ref={propRef}>
        <h3 className="h4 pb-3">Questions ({totalPages})</h3>
        <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch justify-content-between">
          {!toggleAddQuestion && (
            <>
              {property?.ownerId._id !== user._id && (
                <button
                  className="btn btn-outline-primary mb-sm-0 mb-3"
                  onClick={() => setToggleAddQuestion((prev) => !prev)}
                  disabled={!user}
                >
                  <i className="fi-edit me-1"></i>Add question
                </button>
              )}{" "}
            </>
          )}{" "}
          <div className="d-flex align-items-center ms-sm-4">
            <label className="me-2 pe-1 text-nowrap" htmlFor="reviews-sorting">
              <i className="fi-arrows-sort text-muted mt-n1 me-2"></i>Sort by:
            </label>
            <select
              className="form-select"
              id="reviews-sorting"
              onChange={onSortChange}
            >
              <option disabled selected>
                Select a sorting option
              </option>
              <option value="-createdAt">Newest</option>
              <option value="createdAt">Oldest</option>
              <option value="likes.count">Popular</option>
              <option value="isAnswered">Answered</option>
            </select>
          </div>
        </div>
        {toggleAddQuestion && (
          <PropertyAddQuestions
            handleQuestionCancel={() => setToggleAddQuestion(false)}
            postQuestion={handlePostQuestion}
          />
        )}
      </div>
      {questionLoading ? (
        <div className="d-flex align-items-center justify-content-center mb-2 mt-2">
          <SmallLoader />
        </div>
      ) : (
        <>
          {queryParams.has("notification") && (
            <PropertyQuestion
              question={highlightedQuestion}
              property={propertyClone}
              handlePostReply={postReply}
              handleQuestionLike={handleQuestionLike}
              handleQuestionDislike={handleQuestionDislike}
              handleReplyLike={handleReplyLike}
              handleReplyDislike={handleReplyDislike}
              handleQuestionDelete={handleQuestionDelete}
              ref={questionRef}
              onReplyDelete={handleReplyDelete}
              onQuestionAnsweredStatus={handleQuestionAnsweredStatus}
              isHighlighted={true}
            />
          )}
          {questions?.map((question, i) => (
            <PropertyQuestion
              key={i}
              question={question}
              property={propertyClone}
              handlePostReply={postReply}
              handleQuestionLike={handleQuestionLike}
              handleQuestionDislike={handleQuestionDislike}
              handleReplyLike={handleReplyLike}
              handleReplyDislike={handleReplyDislike}
              handleQuestionDelete={handleQuestionDelete}
              ref={questionRef}
              onReplyDelete={handleReplyDelete}
              onQuestionAnsweredStatus={handleQuestionAnsweredStatus}
            />
          ))}
        </>
      )}
      <Pagination handlePageChange={handlePageChange} count={totalPages} />
    </>
  );
}

export default PropertyQuestionSection;
