import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Logo from "./Logo.png";
import axios from "axios";
import "./LoginForm.css";

function LoginForm({ setValidUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.data.user_type === "student") {
          setValidUser(true);
          history.push(`/students/${response.data.id}`);
        } else {
          setValidUser(true);
          history.push(`/cohorts?mentorId=${response.data.id}`);
        }
      })
      .catch(function (error) {
        if (error) {
          console.log(error);
          window.location.reload(false);
          setEmail("");
          setPassword("");
          alert("Invalid email or password!");
        }
      });
  };

  return (
    <div id="login-container">
      <div id="heading">
        <img id="logo" src={Logo} width="400" />
      </div>
      <div className="container">
        <h2 className="welcom-form">Welcome to </h2>
        <h4>CYF feedback tracker</h4>
        <h2>Sign In</h2>
        <form>
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
          <button className="btn" type="submit" onClick={handleSubmit}>
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
