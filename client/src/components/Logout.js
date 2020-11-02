import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    history.push("/");
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
