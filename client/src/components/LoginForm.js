import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
        console.log(response);
        console.log(response.data.user_type);
        // evalute response.data.user_type
        if (response.data.user_type === "student") {
          setValidUser(true);
          history.push("/student");

        } else {
          history.push(`/cohorts?mentorId=${response.data.id}`);
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
    </div>
  );
}
export default LoginForm;
