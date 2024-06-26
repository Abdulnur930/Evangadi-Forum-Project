import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "./Login-Regis.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../Utility/axiosConfig";
import { ClipLoader } from "react-spinners";
const Login = () => {
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!emailValue || !passValue) {
      setError("please provide all required fields");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });

      localStorage.setItem("token", data.token);
      // console.log(data)
      setLoading(false);
      navigate("/");
      window.location.reload(false);
    } catch (error) {
      setError(error?.response?.data?.msg);
      console.log(error.response.data);
      setLoading(false);
    }
  }
  const handleIcon = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  return (
    <div className="logSign_page container-fluid ">
      <div className="login-wrapper container py-5 d-md-flex justify-content-between ">
        <div className="form-wrapper  col-12 col-md-6 me-md-2 p-5 d-flex flex-column justify-content-center">
          <p className="mb-3 fs-6 text-center fw-bold">Login to your account</p>
          <p className="mb-3  text-center">
            Don't have an account?
            <Link to="/register" className="a3 text-center mt-5 p-1">
              Create a new account
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            {error && (
              <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
            )}
            <input
              className="input-field"
              name="email"
              type="email"
              ref={emailDom}
              placeholder="enter your email"
            />
            <input
              className="input-field"
              name="password"
              type={type}
              ref={passwordDom}
              placeholder="enter your password"
            />
            <span className="" onClick={handleIcon}>
              <Icon className="field-icon" icon={icon} size={20} />
            </span>
            <button className="logSign">
              {loading ? (
                <div className="loading">
                  <ClipLoader color="gray" size={25} />
                  <p className="wait">Please Wait ...</p>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <Link to="/register" className="a3 text-center mt-3">
            Create an account?
          </Link>
        </div>
        <div className="login-right-side container col-12 col-md-6 ms-md-2 mt-sm-5">
          <h4 className="forTitle">About</h4>
          <h1 className="right_title">Evangadi Networks Q & A</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p>
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button className="right-btn">HOW IT WORKS</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
