import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Utility/axiosConfig";
import { AppState } from "../App";
const AskQuestion = () => {
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  console.log(token)
  const navigate = useNavigate();
  const titleDom = useRef();
  const descriptionDom = useRef();
  const tagDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    const tagValue = tagDom.current.value;
    if (!titleValue || !descriptionValue) {
      alert("Please provide all required information");
      return;
    }
    console.log(titleValue, descriptionValue, tagValue);
    try {
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
      alert("question added successful.");
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }
  return (
    <div>
      <div>
        <h4>Steps to write a good question</h4>
        <ul>
          <li>Summerize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Ask a public question</h3>
        <Link to="/">Go to Question page</Link>
        <br />
        <br />
        <input
          type="text"
          name="title"
          ref={titleDom}
          placeholder="Enter title.."
        />
        <br />
        <br />
        <br />
        <textarea
          name="description"
          ref={descriptionDom}
          placeholder="Question Details"
        ></textarea>
        <br />
        <br />
        <br />
        <input type="text" name="tag" ref={tagDom} placeholder="Enter tag.." />
        <br />
        <br />
        <br />
        <button>Post Your Question</button>
      </form>
    </div>
  );
};

export default AskQuestion;
