import React from "react";
import StudentSubmission from "./StudentSubmission";
import SubmissionCard from "./SubmissionCard";

const Filter = ({ id }) => {
  return (
    <div>
      <input
        type="search"
        value=""
        placeholder="Search for submission title here"
        style={{
          width: "20rem",
          backgroundColor: "white",
          marginLeft: "12rem",
        }}
      />
      <StudentSubmission id={id} />
      <SubmissionCard id={id} />
    </div>
  );
};

export default Filter;
