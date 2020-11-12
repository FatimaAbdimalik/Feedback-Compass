import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentResponse.css";
import LessonsDropDown from "./LessonsDropDown";
const ModuleDropDown = ({ id }) => {
  const [subject, setSubject] = useState();
  const [select, setSelect] = useState();
  const handleChange = (e) => {
    setSelect(e.target.value);
  };
  useEffect(() => {
    axios.get("/api/get-syllabus").then((response) => {
      setSubject(response.data);
    });
  }, []);

  return !subject ? (
    <div>Loading</div>
  ) : (
    <div>
      <select className="dropdown" onChange={handleChange}>
        <option>Select A Module</option>
        {subject.map((sub, i) => {
          return <option key={i}>{sub.modules}</option>;
        })}
      </select>
      {select && select !== "Select A Module" ? (
        <LessonsDropDown module={select} id={id} />
      ) : null}
    </div>
  );
};

export default ModuleDropDown;
