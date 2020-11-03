import React from "react";
import LoginForm from "./LoginForm";

function Homepage({ setValidUser }) {
  return (
    <div>
      <LoginForm setValidUser={setValidUser} />
    </div>
  );
}

export default Homepage;
