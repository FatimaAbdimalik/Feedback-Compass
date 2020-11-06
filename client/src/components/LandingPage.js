import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.png";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div id="container">
      <div id="heading">
        <img id="logo" src={Logo} width="400" />
        <h1 className="heading-title">Welcome to CYF feedback tracker</h1>
      </div>

      <h2 id="login-question">Login or sign up as?</h2>

      <div id="options">
        <Link to={"/login/student"}>
          <button id="student">STUDENT</button>
        </Link>

        <Link to={"/login/mentor"}>
          <button id="mentor">MENTOR</button>
        </Link>
      </div >
      <div id="footer">
       <footer  >CYF copyright@2020</footer>
      </div>
    </div>
   
  );
};

export default LandingPage;
