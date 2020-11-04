import React from "react";
import { useHistory } from "react-router-dom";
import "./Logout.css";

const Logout = ({ setValidUser }) => {
  const history = useHistory();

  const handleLogout = () => {
    setValidUser(false);
    history.push("/");
  };
  return (
    <div id="logout">
      <button id="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
