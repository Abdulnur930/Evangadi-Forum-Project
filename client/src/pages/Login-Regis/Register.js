import React, { useRef, useState } from "react";
import axios from "../../Utility/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { ClipLoader } from "react-spinners";
import "./Login-Regis.css";
const Register = () => {
  const [input, setInput] = useState({});
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      setError("please provide all required fields");
      return;
    }
    // console.log(usernameValue, firstValue, lastValue, emailValue, passValue);
    try {
      setLoading(true);
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      setLoading(false);
      alert("register successfull. please login");
      navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.msg);
      console.log(error.response.data);
      setLoading(false);
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
      <div className=" container-fluid logSign_page">
        <div className="container d-md-flex mx-auto py-5 align-items-center">
          <div className="form-wrapper col-12 col-md-6 me-md-2 p-5 d-flex flex-column justify-content-center">
            <p className="mb-3 text-center fs-6  fw-bold">Join the network</p>
            <p className="mb-3 text-center lorem">
              Already have an account?
              <Link to="/login" className="a3 p-1 ">
                SignIn
              </Link>
            </p>

            <form onSubmit={handleSubmit}>
              {error && (
                <small style={{ paddingTop: "5px", color: "red" }}>
                  {error}
                </small>
              )}
              <input
                className="input-field mr-1"
                type="text"
                name="username"
                ref={usernameDom}
                placeholder="username"
              />
              <div className="first-last d-flex">
                <input
                  className="input-field me-1"
                  type="text"
                  name="firstname"
                  ref={firstnameDom}
                  placeholder="Firstname"
                />
                <input
                  className="input-field ms-1"
                  type="text"
                  name="lastname"
                  ref={lastnameDom}
                  placeholder="Lastname"
                />
              </div>
              <input
                className="input-field"
                type="email"
                name="email"
                ref={emailDom}
                placeholder="Email address"
                required
              />
              <input
                className="input-field"
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
                  className=" field-icon"
                  onClick={handleShowHide}
                />
              </span>

              <button className="logSign">
                {loading ? (
                  <div className="loading">
                    <ClipLoader color="gray" size={25} />
                    <p>Please Wait ...</p>
                  </div>
                ) : (
                  "Agree and Join"
                )}
              </button>
            </form>
            <p className="text-center  mt-3 p_s">
              I agree to the
              <Link to="" className="a22">
                Privacy Policy
              </Link>
              and
              <Link to="" className="a22">
                terms of service.
              </Link>
            </p>
            <Link to="/login" className="a33 text-center">
              Already have an account?
            </Link>
          </div>
          <div className="login-right-side  container  col-12 col-md-6 ms-md-2 mt-sm-5">
            <h4 className="forTitle">About</h4>
            <h1 className="right_title">Evangadi Networks Q & A</h1>
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
            </p>{" "}
            <p>
              If you're ready to engage with a community of individuals
              committed to learning, growing, and supporting each other, we
              encourage you to take the first step by joining our network today
            </p>
            <button className="right-btn">HOW IT WORKS</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
