import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../Utility/axiosConfig";
import AnswerQuestion from "../../Components/AnswerQuestion/AnswerQuestion";
import UserImg from "../../assets/images/User.png";
const SingleQuestion = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let params = useParams();
  // console.log(params)
  // console.log(params.id);
  const [getQuestion, setGetQuestion] = useState();
  const [answers, setAnswers] = useState([]);

  const getQuestionById = async () => {
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
    } catch (error) {
      // navigate("*");
      // alert(error?.response?.data?.msg);
      console.log(error?.response?.data);
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

      console.log(answerResponse);

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
  return (
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

      <AnswerQuestion questionid={getQuestion?.questionid} />
    </div>
  );
};

export default SingleQuestion;
