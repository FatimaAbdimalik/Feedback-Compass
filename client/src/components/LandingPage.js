import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "./Logo.png";
import axios from "axios";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div id="container">
      <div id="heading">
        <img id="logo" src={Logo} width="210" height="150" />
        <h1 className="welcom">Welcome to CYF feedback tracker</h1>
      </div>

      <h2 id="login-question">Log in as?</h2>

      <div id="options">
        <button id="student">STUDENT</button>
        <button id="mentor">MENTOR</button>
      </div>
    </div>
  );
};

export default LandingPage;
