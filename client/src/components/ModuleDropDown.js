import React, { useState, useEffect } from "react";
import axios from "axios";
import LessonsDropDown from "./LessonsDropDown";
const ModuleDropDown = ({ id }) => {
  const [subject, setSubject] = useState();
  const [select, setSelect] = useState();
  const handleChange = (e) => {
    setSelect(e.target.value);
  };
  useEffect(() => {
    axios
      .get("/api/get-syllabus")

      .then((response) => {
        setSubject(response.data);
      });
  }, []);

  return !subject ? (
    <div>Loading</div>
  ) : (
    <div>
      <select onChange={handleChange} style={{ backgroundColor: "gray" }}>
        <option>Select A Module</option>
        {subject.map((sub, i) => {
          return <option key={i}>{sub.modules}</option>;
        })}
      </select>
      {select ? <LessonsDropDown module={select} id={id} /> : null}
    </div>
  );
};

export default ModuleDropDown;
