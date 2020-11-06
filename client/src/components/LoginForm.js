import React, { useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import Logo from "./Logo.png";
import axios from "axios";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [validUser, setValidUser] = useState(false);
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
          setValidUser(true);
          history.push(`/students/${response.data.id}`);
        } else if (
          response.data.user_type === "mentor" &&
          location.pathname.slice(7) == "student"
        ) {
          alert("Invalid student account!!");
          return;
        } else if (
          response.data.user_type === "mentor" &&
          location.pathname.slice(7) == "mentor"
        ) {
          history.push(`/cohorts?mentorId=${response.data.id}`);
        } else if (
          response.data.user_type === "student" &&
          location.pathname.slice(7) == "mentor"
        ) {
          alert("Invalid mentor account!!");
        }
      })
      .catch(function (error) {
        if (error) {
          window.location.reload(true);
          setEmail("");
          setPassword("");
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
        <h2 className="welcom-form">Welcome to </h2>
        <h4>CYF feedback tracker</h4>
        <h2>Sign In</h2>
        <form id="form">
          <h3>{message}</h3>
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="buttons">
            <button className="btn" type="submit" onClick={handleSubmit}>
              login
            </button>

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
