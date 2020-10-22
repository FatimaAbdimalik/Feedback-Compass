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

  return (
    <div className="container">
      <h2>Sign In</h2>
    </div>
  );
}
export default LoginForm;
