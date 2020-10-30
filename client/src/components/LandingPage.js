import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.png";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div id="container">
      <div id="heading">
        <img id="logo" src={Logo} width="400" />
        <h1 className="welcom">Welcome to CYF feedback tracker</h1>
      </div>

      <h2 id="login-question">Log in as?</h2>

      <div id="options">
        <a href="/login/student">
          <button id="student">STUDENT</button>
        </a>
        <a href="/login/mentor">
          <button id="mentor">MENTOR</button>
        </a>
      </div>
      <footer>CYF copyright@2020</footer>
    </div>
  );
};

export default LandingPage;
