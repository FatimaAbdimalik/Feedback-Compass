import React, { useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import Logo from "./images/cyf_brand.png";

import axios from "axios";
import "./LoginForm.css";

function LoginForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  let location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (
          response.data.user_type === "student" &&
          location.pathname.slice(7) == "student"
        ) {
          setUser(true);
          history.push(`/students/${response.data.id}`);
        } else if (
          response.data.user_type === "mentor" &&
          location.pathname.slice(7) == "student"
        ) {
          setMessage("Invalid STUDENT account!");
        } else if (
          response.data.user_type === "mentor" &&
          location.pathname.slice(7) == "mentor"
        ) {
          setUser(true);
          history.push(`/cohorts?mentorId=${response.data.id}`);
        } else if (
          response.data.user_type === "student" &&
          location.pathname.slice(7) == "mentor"
        ) {
          setMessage("Invalid MENTOR account!");
        }
      })
      .catch(function (error) {
        if (error) {
          document.getElementById("password-input").value = "";
          document.getElementById("email-input").value = "";
          setMessage("Invalid email or password!");
        }
      });
  };

  return (
    <div id="login-container">
      <div id="heading">
        <a href="/">
          <img id="logo" src={Logo} width="400" />
        </a>
      </div>
      <div className="container">
        <h2 className="sign-in">Sign In</h2>

        <form id="form">
          <h5 className="invalid">{message}</h5>
          <label className="login-lable">Login With Your Email</label>
          <input
            className="form-inputs"
            id="email-input"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="login-lable">Password</label>
          <input
            className="form-inputs"
            id="password-input"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="buttons">
            <button className="btn" type="submit" onClick={handleSubmit}>
              login
            </button>
            <h5>Or</h5>
            <Link to={`/signup/${location.pathname.slice(7)}`}>
              <button className="btn" type="submit">
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
