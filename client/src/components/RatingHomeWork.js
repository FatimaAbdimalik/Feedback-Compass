import React, { useState } from "react";
import "./RatingHomeWork";
const RatingHomeWork = () => {
  const [choosen, setChoosen] = useState();

  const handleClick = (e) => {
    setChoosen(e.target.value);
  };
  return (
    <div className="radio-button">
      <div>
        <label> How did you find your homework? </label>
      </div>
      <div className="radio-set">
        <input
          type="radio"
          checked={choosen === "easy"}
          value="easy"
          style={{ marginLeft: "1rem", width: "50px", height: "50px" }}
          onClick={handleClick}
        />
        <input
          type="radio"
          checked={choosen === "medium"}
          value="medium"
          style={{ marginLeft: "1rem", width: "50px", height: "50px" }}
          onClick={handleClick}
        />
        <input
          type="radio"
          checked={choosen === "hard"}
          value="hard"
          style={{ marginLeft: "1rem", width: "50px", height: "50px" }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default RatingHomeWork;
