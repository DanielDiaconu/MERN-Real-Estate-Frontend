import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast, setSuccessToast } from "../../../slices/toastSlice";
import { selectUser } from "../../../slices/userSlice";
import PropertyAddQuestions from "./PropertyAddQuestions";
import PropertyQuestion from "./PropertyQuestion";

function PropertyQuestionSection({ property }) {
  const [toggleAddQuestion, setToggleAddQuestion] = useState(false);
  const [propertyClone, setPropertyClone] = useState(null);
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const getQuestions = async () => {
    let res = await axios.get(
      `http://localhost:8080/questions/${property?._id}`
    );
    setQuestions(res.data);
  };

  const onSortChange = async (e) => {
    let sortUrl = `?sort=${encodeURIComponent(e.target.value)}`;
    let res = await axios.get(
      `http://localhost:8080/questions/${property?._id}${sortUrl}`
    );
    setQuestions(res.data);
  };

  const handlePostQuestion = async (data) => {
    try {
      let res = await axios.post("http://localhost:8080/question", {
        questionBody: data,
        userId: user._id,
        propertyId: propertyClone?._id,
      });
      setQuestions([...questions, res.data]);
      setToggleAddQuestion(false);
    } catch (error) {
      dispatch(setErrorToast(error.message));
    }
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
      setQuestions(updatedQuestions);
    } catch (error) {}
  };

  const handleQuestionLike = async (question) => {
    try {
      await axios.patch(`http://localhost:8080/question-like/${question._id}`, {
        userId: user._id,
      });
      if (!question.likes.userIds.includes(user._id)) {
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
      dispatch(setSuccessToast("Liked!"));
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
      dispatch(setSuccessToast("Disliked!"));
    } catch (error) {}
  };

  const handleReplyLike = async (replyId, question) => {
    try {
      await axios.patch(`http://localhost:8080/reply-like/${replyId}`, {
        userId: user._id,
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
    if (property) {
      getQuestions();
    }
  }, []);

  return (
    <>
      <div className="mb-4 pb-4 border-bottom">
        <h3 className="h4 pb-3">Questions ({questions?.length})</h3>
        <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch justify-content-between">
          {!toggleAddQuestion && (
            <button
              className="btn btn-outline-primary mb-sm-0 mb-3"
              onClick={() => setToggleAddQuestion((prev) => !prev)}
              disabled={!user}
            >
              <i className="fi-edit me-1"></i>Add question
            </button>
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
              <option selected disabled defaultValue>
                ...
              </option>
              <option value="createdAt">Newest</option>
              <option value="-createdAt">Oldest</option>
              <option value="likes.count">Popular</option>
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
        />
      ))}
    </>
  );
}

export default PropertyQuestionSection;
