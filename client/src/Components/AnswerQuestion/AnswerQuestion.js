import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./answerquestion.css";
import { AppState } from "../../App";
import axios from "../../Utility/axiosConfig";

const AnswerQuestion = ({ questionid }) => {
 const { user } = useContext(AppState);
 const token = localStorage.getItem("token");
 const answerDom = useRef();
  // const { questionid } = useParams();
  // console.log(questionid);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const answerValue = answerDom.current.value;
     if (!answerValue) {
       alert("please fill the answer field");
       return;
     }
     console.log(user?.userid, questionid, answerValue);
    try {
      await axios.post(
        `/answers/addanswer`,
        {
          userid: user?.userid,
          questionid: questionid,
          answer: answerValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("answer added successful.");
      window.location.reload(false);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  };

  return (
    <div className="container my-5">
      <form
        onSubmit={handleSubmit}
        className="answer-wrapper d-flex flex-column p-5 justify-content-between"
      >
        <h3 className="ask_title">Answer The Top Question</h3>
        <Link to="/" className="goto ">
          Go To Question Page
        </Link>
        <textarea
          className="answer-field"
          placeholder="Your answer..."
          name="answer"
          ref={answerDom}
        ></textarea>

        <button className="answer-btn" type="submit">
          Post Your answer
        </button>
      </form>
    </div>
  );
};

export default AnswerQuestion;
