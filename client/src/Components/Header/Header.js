import React, { useContext } from "react";
import Logo from "../../assets/images/evangadi-logo-black.png";
import { AppState } from "../../App";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(AppState);
  console.log(user.user);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleSignin = (e) => {
    e.preventDefault();
    if (user) {
      setUser({
        token: undefined,
        user: undefined,
      });
      localStorage.setItem("token", "");
    }
    navigate("/login");
  };

  function drop() {
    var x = document.getElementById("my-links");
    if (x.classList.contains("show")) {
      x.classList.remove("show");
    } else {
      x.classList.add("show");
    }
  }
  return (
    <>
      <div className="header container-fluid">
        <div className="inner-container container d-flex justify-content-around">
          {token ? (
            <Link to="/" className="">
              <img src={Logo} alt="Evangadi logo" />
            </Link>
          ) : (
            <Link to="/login" className="">
              <img src={Logo} alt="Evangadi logo" />
            </Link>
          )}
          <button onClick={drop} className="icon d-md-block d-lg-none">
            ☰
          </button>

          <div className="nav-links d-flex justify-content-between d-none d-lg-block">
            <Link to="/">Home</Link>
            <Link to="/">How it works</Link>
            {token ? (
              <button onClick={handleSignin} className="header-btn">
                LogOut
              </button>
            ) : (
              <button className="header-btn">SIGN IN</button>
            )}
          </div>
        </div>
      </div>

      {/* <div className="d-block justify-content-between d-md-none" id="my-links">
        <div className="d-md-none">
          <Link to="/">Home</Link>
        </div>
        <hr className="d-md-none" />
        <div className="d-md-none">
          <Link to="/">How it works</Link>
        </div>
        <hr className="d-md-none" />
       {token ? (
              <button onClick={handleSignin} className="header-btn">
                LogOut
              </button>
            ) : (
              <button className="header-btn">SIGN IN</button>
            )}
        
      </div> */}
    </>
  );
};

export default Header;
