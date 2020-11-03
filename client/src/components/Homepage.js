import React from "react";
import LoginForm from "./LoginForm";

function Homepage({ setValidUser }) {
  console.log(setValidUser, "homepage component");
  return (
    <div>
      <LoginForm setValidUser={setValidUser} />
    </div>
  );
}

export default Homepage;
