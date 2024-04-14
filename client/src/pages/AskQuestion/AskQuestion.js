import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Utility/axiosConfig";
import { AppState } from "../../App";
import { ClipLoader } from "react-spinners";
import "./AskQuestion.css";
const AskQuestion = () => {
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  // console.log(token)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const titleDom = useRef();
  const descriptionDom = useRef();
  const tagDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    const tagValue = tagDom?.current?.value;
    if (!titleValue || !descriptionValue) {
      setError("Please provide all required information");
      // alert("Please provide all required information");
      return;
    }
    console.log(titleValue, descriptionValue, tagValue);
    try {
      setLoading(true);
      await axios.post(
        `/questions/askquestion`,
        {
          userid: user?.userid,
          title: titleValue,
          description: descriptionValue,
          tag: tagValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // alert("question added successful.");
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.msg);
      // alert(error?.response?.data?.msg);
      console.log(error.response.data);
      setLoading(false);
    }
  }
  return (
    <>
      <div className="container my-5">
        <div className="d-flex flex-column align-items-center my-5">
          <h3 className="ask_title">Steps to write a good question</h3>
          <ul className="question-step">
            <li>Summerize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <form
          className="question-container d-flex flex-column p-5 justify-content-between"
          onSubmit={handleSubmit}
        >
          <h3 className="ask_title">Ask a public question</h3>
          <Link to="/" className="goto ">
            Go to Question page
          </Link>
          {error && (
            <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
          )}
          <input
            type="text"
            name="title"
            ref={titleDom}
            className="question-title"
            placeholder="Title..."
          />
          <textarea
            name="description"
            ref={descriptionDom}
            className="question-detail"
            placeholder="Question Description..."
          ></textarea>
          {/* <input
            type="text"
            name="tag"
            ref={tagDom}
            className="question-title"
            placeholder="Enter tag.."
          /> */}
          <button className="ask-question-btn">
            {loading ? (
              <div className="loading">
                <ClipLoader color="gray" size={25} />
                <p>Please Wait ...</p>
              </div>
            ) : (
              "Post Your Question"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AskQuestion;
