import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [validUser, setValidUser] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response) {
         
          setValidUser(true);
          history.push("/regions");
        }
      })
      .catch(function (error) {
        if (error) {
          setEmail("");
          setPassword("");
          setMessage("Invalid email or password!");
        }
      });
  };

  return (
    <div className="container">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <a className="message">{message}</a>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
          required
        />

        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
          required
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginForm;
