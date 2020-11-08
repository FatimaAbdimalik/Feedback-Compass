import React, { useState } from "react";
import axios from "axios";
import "draft-js/dist/Draft.css";
import "./StudentProfile.css";
import moment from "moment";

const SubmitWork = ({ lessonValue, id }) => {
  const [submission, setSubmission] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/submission", {
        student_id: id,
        title: lessonValue,
        submission: submission,
        submission_date: new Date(),
      })
      .then(function (response, err) {
        if (response) {
          window.location.reload(false);
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
