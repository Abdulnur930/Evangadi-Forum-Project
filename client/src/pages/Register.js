import React, { useRef } from "react";
import axios from "../Utility/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Register = () => {
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
  return (
    <section>
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
  );
};

export default Register;
