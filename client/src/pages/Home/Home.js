import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Utility/axiosConfig";
import "./Home.css";
import profile from "../../assets/images/User.png";
import "@fortawesome/fontawesome-free/css/all.css";
const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  const [allQuestions, setAllQuestions] = useState([]);
  // console.log(user);

  useEffect(() => {
    AllQuestions();
  }, []);

  const AllQuestions = async () => {
    try {
      const { data } = await axios.get("/questions/allquestions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
      setAllQuestions(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/ask");
  };

  // console.log(allQuestions);

  return (
    <>
      <div className="home-page-container container my-5">
        <div className="d-md-flex justify-content-between">
          <button className="question-btn" onClick={handleClick}>
            Ask Question
          </button>
          <h5>
            Welcome:
            <span> {user?.username}</span>
          </h5>
        </div>
        <h3 className="mt-3 ask_title">Questions </h3>
        <div>
          {allQuestions.map((item) => (
            <div key={item.questionid}>
              <hr />
              <Link
                to={`questions/${item.questionid}`}
                className="text-decoration-none text-reset"
              >
                <div className="d-md-flex align-items-center justify-space-between question-link row">
                  <div className=" d-flex flex-md-column col-12 col-md-2 ">
                    <img src={profile} alt="avatar" className="avatar" />
                    <h6 className="username ms-3 ms-md-0 fs-4">
                      {item?.username}
                    </h6>
                  </div>
                  <div className=" col-10 col-md-9 my-md-4 ">
                    <h6 className="pt-2 pt-md-0 q-fs">{item.title}</h6>
                    {/* <h6>{item.tag}</h6> */}
                  </div>
                  <div className="col-2 col-md-1  ">
                    <i className="fa fa-angle-right  "></i>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
