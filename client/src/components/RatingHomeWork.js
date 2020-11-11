import React, { useState } from "react";
import { Form, radio } from "react-bootstrap";
import "./RatingHomeWork";

const RatingHomeWork = ({ studentEvaluation }) => {
  const [choosen, setChoosen] = useState("easy");

  studentEvaluation(choosen);

  const handleChange = (e) => {
    setChoosen(e.target.value);
  };

  return (
    <div className="radio-button">
      <div>
        <label> How did you find your homework? </label>
      </div>
      <div className="radio-set">
        {/* <label className="title">Easy</label> */}
        <label className="radio-section" htmlFor="green-radio-button">
          <input
            type="radio"
            checked={choosen === "easy"}
            value="easy"
            onClick={handleChange}
            style={{
              height: "50px",
              width: "50px",
              marginLeft: "1rem",
              cursor: "pointer",
              backgroundColor: "green",
            }}
            id="green-radio-button"
            className="radio-style"
            variant="danger"
          />
          {/* <span className="green"></span> */}
        </label>

        {/* <label className="title">averge</label> */}
        <label className="radio-section">
          <input
            type="radio"
            checked={choosen === "medium"}
            value="medium"
            onClick={handleChange}
            style={{
              height: "50px",
              width: "50px",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
            className="radio-style"
            id="red-radio-button"
          />
        </label>
        {/* <label className="title">Hard</label> */}
        <label>
          <input
            type="radio"
            className="radio-style"
            checked={choosen === "hard"}
            value="hard"
            onClick={handleChange}
            className="show"
            style={{
              height: "50px",
              width: "50px",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
            className="radio-style"
          />
        </label>
      </div>
    </div>
  );
};

export default RatingHomeWork;
