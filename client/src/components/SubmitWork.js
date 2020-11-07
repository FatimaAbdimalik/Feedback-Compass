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
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <input
          id="submission"
          type="text"
          placeholder="Add you work here"
          onChange={(e) => setSubmission(e.target.value)}
          style={{ width: "29rem", border: "1px solid black" }}
        />
      </div>
      <div>
        <button
          id="edit-profile-btn"
          type="submit"
          onClick={handleSubmit}
          style={{ marginLeft: "4rem" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SubmitWork;
