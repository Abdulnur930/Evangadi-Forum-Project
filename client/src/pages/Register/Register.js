import React, { useRef, useState } from "react";
import axios from "../../Utility/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "./Register.css";
const Register = () => {
   const [input, setInput] = useState({});
   const [icon, setIcon] = useState(eyeOff);
   const [type, setType] = useState("password");
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("Please provide all required information");
      return;
    }
    // console.log(usernameValue, firstValue, lastValue, emailValue, passValue);
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("register successfull. please login");
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }
    const handleShowHide = () => {
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
      {/* <section>
        <form onSubmit={handleSubmit}>
          <div>
            <span>username:---</span>
            <input ref={usernameDom} type="text" placeholder="username" />
          </div>
          <br />

          <div>
            <span>First name:---</span>
            <input ref={firstnameDom} type="text" placeholder="first name" />
          </div>
          <br />

          <div>
            <span>last name:---</span>
            <input ref={lastnameDom} type="text" placeholder="last name" />
          </div>
          <br />

          <div>
            <span>email:---</span>
            <input ref={emailDom} type="email" placeholder="email" />
          </div>
          <br />

          <div>
            <span>password:---</span>
            <input ref={passwordDom} type="password" placeholder="password" />
          </div>
          <br />
          <button type="submit">Register</button>
        </form>{" "}
        <Link to={"/login"}>login</Link>
      </section>
 */}
      <div className=" container-fluid signup-page">
        <div className="container d-md-flex mx-auto py-5 align-items-center">
          <div className="form-wrapper col-10 col-md-6 me-md-2 p-5 d-flex flex-column">
            <p className="p11">Join the network</p>
            <p className="p22 lorem">
              Already have an account?
              <Link to="/login" className="a11">
                Login
              </Link>
            </p>

            <form onSubmit={handleSubmit}>
              <input
                className="in11 mr-1"
                type="text"
                name="username"
                ref={usernameDom}
             
                placeholder="username"
              />
              <div className="first-last d-flex">
                <input
                  className="in11 me-1"
                  type="text"
                  name="firstname"
                  ref={firstnameDom}
               
                  placeholder="Firstname"
                />
                <input
                  className="in11 ms-1"
                  type="text"
                  name="lastname"
                  ref={lastnameDom}
               
                  placeholder="Lastname"
                />
              </div>
              <input
                className="in11"
                type="email"
                name="email"
                ref={emailDom}
                placeholder="Email address"
             
                required
              />
              <input
                className="in11"
                type={type}
                name="password"
                ref={passwordDom}
                placeholder="password"
              />
              {/* show and hide put here */}
              <span>
                <Icon
                  icon={icon}
                  size={20}
                  className="show-hide field-icon"
                  onClick={handleShowHide}
                />
              </span>

              <button className="signupBtn">Agree and Join</button>
            </form>
            <p className="mt-md-5 mt-sm-5 text-center texttag">
              I agree to the{" "}
              <Link to="" className="a22">
                Privacy Policy
              </Link>
              and
              <Link to="" className="a22">
                {" "}
                terms of service.
              </Link>
            </p>
            <Link to="/login" className="a33 text-center">
              Already have an account?
            </Link>
          </div>
          <div className="signup-right container  col-12 col-md-6 ms-md-2 mt-sm-5">
            <p className="forTitle">About</p>
            <h1 className="right-title">Evangadi Networks</h1>
            <p className="right-p">
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p className="right-p">
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

export default Register;
