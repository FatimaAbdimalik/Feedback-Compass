import React from "react";
import { Link } from "react-router-dom";
import Logo from "./images/cyf_brand.png";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div id="container">
      <div id="heading">
        <img id="logo" src={Logo} width="400" />
      </div>
      <div className="banar">
        <strong className="heading-title">
          Welcome to CYF feedback tracker
        </strong>
        <h2 id="login-question">Login as?</h2>

        <div id="options">
          <Link to={"/login/student"}>
            <button id="student">STUDENT</button>
          </Link>

          <Link to={"/login/mentor"}>
            <button id="mentor">MENTOR</button>
          </Link>
        </div>
      </div>
      <div id="footer">
        <footer>CYF &copy;2020</footer>
      </div>
    </div>
  );
};

export default LandingPage;
