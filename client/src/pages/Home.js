import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Utility/axiosConfig";

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
      const{data} = await axios.get("/questions/allquestions", {
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
    navigate("/ask-question");
  };

  // console.log(allQuestions);

  return (
    <div>
      <div>
        <button onClick={handleClick}>Ask Question</button>

        <h5>
          Well-Come:<span>{user?.username}</span>
        </h5>
      </div>
      <div>
        {allQuestions.map((item) => (
          <div key={item.questionid}>
            <hr />
            <Link to={`questions/${item.questionid}`}>
              <h6>{item.username}</h6>
              <h6>{item.title}</h6>
             
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
