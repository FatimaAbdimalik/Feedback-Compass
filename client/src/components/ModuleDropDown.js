import React, { useState, useEffect } from "react";
import axios from "axios";
import LessonsDropDown from "./LessonsDropDown";
const ModuleDropDown = ({ id }) => {
  const [subject, setSubject] = useState();
  const [select, setSelect] = useState();
  console.log(id);
  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3100/api/get-syllabus")

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
        {subject.map((sub) => {
          return <option>{sub.modules}</option>;
        })}
      </select>
      {select ? <LessonsDropDown module={select} id={id} /> : null}
    </div>
  );
};

export default ModuleDropDown;
