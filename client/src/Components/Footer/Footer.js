import React from "react";
import "./footer.css";
import logo from "../../assets/images/evangadi-logo-footer.png";
import "bootstrap/dist/css/bootstrap.min.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
const Footer = () => {
  return (
    <div className="container-fluid">
      <footer className="footer-wrapper d-md-flex justify-content-around row">
        <div className="logo-icon-wrapper col-lg-4 col-md-4">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="footer_icons">
            <FacebookOutlinedIcon className="footer_icons_e" />
            <InstagramIcon className="footer_icons_e" />
            <YouTubeIcon className="footer_icons_e" />
          </div>
        </div>

        <div className="col-lg-4 col-md-4">
          <div className="title">Useful link</div>
          <div className="useful-link">
            <a className="" href="#">
              How it work
            </a>
            <a className="" href="#">
              Terms of services
            </a>
            <a className="" href="#">
              privacy policy
            </a>
          </div>
        </div>

        <div className="col-lg-4 col-md-4">
          <div className="contact-info">
            <div className="title">Contact info</div>
            <p>Evangadi Network</p>
            <p>support@evangadi.com</p>
            <p>+1-202-386-2702</p>
          </div>
        </div>
        <div className="footer-wrapper text-center">
          <h2>Developed by Abdulnur</h2>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
