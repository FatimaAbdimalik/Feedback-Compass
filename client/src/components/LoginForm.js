import React, { useState } from "react";
import "./LoginForm.css";


function LoginForm() {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("data from: ", email, password)
  };

 console.log("I am rendering!!")
  return (
    <div className="box">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
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



