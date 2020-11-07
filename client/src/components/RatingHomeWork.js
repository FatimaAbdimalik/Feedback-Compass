import React, { useState } from "react";
import "./RatingHomeWork";
const RatingHomeWork = () => {
  const [choosen, setChoosen] = useState("easy");
  console.log(choosen);

  // let greenRadioButton = document.getElementById("green");

  // if (greenRadioButton) {
  //   greenRadioButton.style.color = "green";
  //   console.log(greenRadioButton);
  // }

  const handleClick = (e) => {
    setChoosen(e.target.value);
  };

  return (
    <div className="radio-button">
      <div>
        <label> How did you find your homework? </label>
      </div>
      <div className="radio-set">
        <label className="title">Easy</label>

        <input
          type="radio"
          id="green"
          checked={choosen === "easy"}
          value="easy"
          style={{
            marginLeft: "1rem",
            width: "50px",
            height: "50px",
            background: "green",
            cursor: "pointer",
            border: "1px solid #00FF00",
          }}
          onClick={handleClick}
        />

        <label className="title">averge</label>

        <input
          type="radio"
          checked={choosen === "medium"}
          value="medium"
          style={{
            marginLeft: "1rem",
            width: "50px",
            height: "50px",
            cursor: "pointer",
          }}
          onClick={handleClick}
        />

        <label className="title">Hard</label>

        <input
          type="radio"
          checked={choosen === "hard"}
          value="hard"
          style={{
            marginLeft: "1rem",
            width: "50px",
            height: "50px",
            cursor: "pointer",
          }}
          onClick={handleClick}
          className="show"
        />
      </div>
    </div>
  );
};

export default RatingHomeWork;
