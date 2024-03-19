import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../Utility/axiosConfig";
const Login = () => {
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("login successfull.");
      localStorage.setItem("token", data.token);
      // console.log(data)
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
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
    <>
      {/* //   <section>
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <span>email:---</span>
    //         <input ref={emailDom} type="email" placeholder="email" />
    //       </div>
    //       <br />

    //       <div>
    //         <span>password:---</span>
    //         <input ref={passwordDom} type="password" placeholder="password" />
    //       </div>
    //       <br />
    //       <button type="submit">Login</button>
    //     </form>
    //     <Link to={"/register"}>register</Link>
    //   </section> */}
      <div className="login-container container-fluid ">
      <div className="login-wrapper container py-5 d-md-flex justify-content-between ">
        <div className="form-wrapper col-12 col-md-6 me-md-2 p-5 d-flex flex-column justify-content-center">
          <p className="p1">Login to your account</p>
          <p className="p2 text-center">
            Don't have an account?
            <Link to="/register" className="a3">
              Create a new account
            </Link>
            </p>
            <form onSubmit={handleSubmit}>
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
              <span className="login-show-hide" onClick={handleIcon}>
                <Icon className="field-icon" icon={icon} size={20} />
              </span>
              <button className="login-btn">Login</button>
            </form>
            <Link to="/register" className="a3">
              Create an account?
            </Link>
          </div>
          <div className="login-right-side container col-12 col-md-6 ms-md-2 mt-sm-5">
            <p className="title1">About</p>
            <h1>Evangadi network</h1>
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
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
    </>
  );
};

export default Login;
