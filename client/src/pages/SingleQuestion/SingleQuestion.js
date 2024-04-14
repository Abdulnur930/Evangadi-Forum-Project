import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../Utility/axiosConfig";
import UserImg from "../../assets/images/User.png";
import { AppState } from "../../App";
import { ClipLoader } from "react-spinners";
import "./SingleQuestion.css";
import Loader from "../../Components/Loader/Loader";
const SingleQuestion = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let params = useParams();
  // console.log(params)
  // console.log(params.id);
  const [getQuestion, setGetQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useContext(AppState);
  const [isLoading, setisLoading] = useState("");
  const answerDom = useRef();
  console.log(isLoading)
  const getQuestionById = async () => {
   setisLoading(true);
    try {
      const question = await axios.get(
        `/questions/singlequestion/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(question?.data);
      setGetQuestion(question?.data);
      setisLoading(false);
    } catch (error) {
      // navigate("*");
      // alert(error?.response?.data?.msg);
      console.log(error?.response?.data);
      setisLoading(false);
    }
  };

  const answerQuestion = async () => {
    try {
      const answerResponse = await axios.get(
        `/answers/allanswers/${getQuestion?.questionid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(answerResponse)
      setAnswers(answerResponse?.data?.answers);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  };
  // console.log(answers);

  useEffect(() => {
    getQuestionById();
    answerQuestion();
  }, [getQuestion?.questionid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answerValue = answerDom.current.value;
    if (!answerValue) {
      setError("please fill the answer field");
      return;
    }
    console.log(user?.userid, getQuestion?.questionid, answerValue);
    try {
      setLoading(true);
      setError("");
      await axios.post(
        `/answers/addanswer`,
        {
          userid: user?.userid,
          questionid: getQuestion?.questionid,
          answer: answerValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // alert("answer added successful.");
      // setLoading(false);
      answerDom.current.value = "";
      // answerQuestion();
    } catch (error) {
      setError(error?.response?.data?.msg);
      // alert(error?.response?.data?.msg);
      console.log(error.response.data);
      // setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container my-5">
          <div>
            <h3 className="ask_title">Question</h3>
            <h5 className="fw-bold">{getQuestion?.title}</h5>
            <div>
              {getQuestion?.description}
              {/* <div dangerouslySetInnerHTML={{ __html: getQuestion?.description }} /> */}
            </div>
          </div>

          <hr />

          <h3 className="ask_title">Answers From The Community </h3>
          {answers.map((item) => (
            <div key={item?.answerid}>
              <hr />
              <div className="d-md-flex align-items-center justify-space-between">
                <div className="d-flex flex-md-column">
                  <img className="avatar" src={UserImg} alt="user image" />
                  <h6 className="align-self-center ms-2 ms-md-0">
                    {item?.username}
                  </h6>
                </div>
                <div className="ms-md-5">
                  <div className="pt-2 pt-md-0">
                    {item?.answer}
                    {/* <div dangerouslySetInnerHTML={{ __html: item?.answer }} /> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="container my-5">
            <form
              onSubmit={handleSubmit}
              className="answer-wrapper d-flex flex-column p-5 justify-content-between"
            >
              <h3 className="ask_title">Answer The Top Question</h3>
              <Link to="/" className="goto ">
                Go To Question Page
              </Link>
              {error && (
                <small style={{ paddingTop: "5px", color: "red" }}>
                  {error}
                </small>
              )}
              <textarea
                className="answer-field"
                placeholder="Your answer..."
                name="answer"
                ref={answerDom}
              ></textarea>

              <button className="answer-btn" type="submit">
                {loading ? (
                  <div className="loading">
                    <ClipLoader color="gray" size={25} />
                    <p>Please Wait ...</p>
                  </div>
                ) : (
                  "Post Your answer"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleQuestion;
