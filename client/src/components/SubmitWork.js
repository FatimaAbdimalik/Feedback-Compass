import React, { useState } from "react";
import axios from "axios";
import "draft-js/dist/Draft.css";
import "./StudentProfile.css";
import moment from "moment";

const SubmitWork = ({ lessonValue, id }) => {
  const [submission, setSubmission] = useState();

  const currentDate = JSON.stringify(moment());
  const handleDate = (date) => {
    return date.split("T")[0].substring(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/submission", {
        student_id: id,
        title: lessonValue,
        submission: submission,
        submission_date: handleDate(currentDate),
      })
      .then(function (response, err) {
        if (response) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input
        id="submission"
        type="text"
        placeholder="Add your work here"
        onChange={(e) => setSubmission(e.target.value)}
      />
      <button id="edit-profile-btn" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SubmitWork;
