import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast } from "../../../slices/toastSlice";
import { selectUser } from "../../../slices/userSlice";
import PropertyQuestionAndAnswer from "../../shared/components/PropertyQuestionAndAnswer";
import PropertyAddQuestions from "./PropertyAddQuestions";

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

  console.log(questions);

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
      <div class="mb-4 pb-4 border-bottom">
        <h3 class="h4 pb-3">
          <i class="fi-star-filled mt-n1 me-2 lead align-middle text-warning"></i>
          4,9 (32 reviews)
        </h3>
        <div class="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch justify-content-between">
          {!toggleAddQuestion && (
            <button
              class="btn btn-outline-primary mb-sm-0 mb-3"
              onClick={() => setToggleAddQuestion((prev) => !prev)}
              disabled={!user}
            >
              <i class="fi-edit me-1"></i>Add question
            </button>
          )}{" "}
          <div class="d-flex align-items-center ms-sm-4">
            <label class="me-2 pe-1 text-nowrap" for="reviews-sorting">
              <i class="fi-arrows-sort text-muted mt-n1 me-2"></i>Sort by:
            </label>
            <select class="form-select" id="reviews-sorting">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Popular</option>
              <option>High rating</option>
              <option>Low rating</option>
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
      {questions.map((question, i) => (
        <PropertyQuestionAndAnswer
          key={i}
          question={question}
          property={propertyClone}
        />
      ))}
    </>
  );
}

export default PropertyQuestionSection;
