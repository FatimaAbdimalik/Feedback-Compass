import React, { useState, useEffect } from "react";
import StudentSubmission from "./StudentSubmission";
import SubmissionCard from "./SubmissionCard";

const Filter = ({ foundTitle }) => {
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {}, []);

  const handleChange = (e) => {
    return setSearchItem(e.target.value);
  };
  return (
    <div>
      <input
        type="search"
        value={searchItem}
        placeholder="Search for submission title here"
        style={{
          width: "20rem",
          backgroundColor: "white",
          marginLeft: "12rem",
          color: "black",
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
