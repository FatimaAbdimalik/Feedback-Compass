import React from "react";
import { useHistory } from "react-router-dom";
import "./Logout.css";

const Logout = ({ setUser }) => {
  const history = useHistory();

  const handleLogout2 = () => {
    setUser(false);

    history.push("/");
  };
  return (
    <div id="logout">
      <button id="logout-btn" onClick={handleLogout2}>
        Log out
      </button>
    </div>
  );
};

export default Logout;
