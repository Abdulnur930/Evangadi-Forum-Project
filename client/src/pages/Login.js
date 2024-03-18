import React, { useRef } from "react";
import axios from "../Utility/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
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
      const {data} = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("login successfull.");
      localStorage.setItem('token',data.token)
      // console.log(data)
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
          <span>email:---</span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />

        <div>
          <span>password:---</span>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
      <Link to={"/register"}>register</Link>
    </section>
  );
};

export default Login;
