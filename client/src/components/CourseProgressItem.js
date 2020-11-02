import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./StudentProfile.css";
const CourseProgressItem = ({ date, course, completed, id }) => {
  const [isChecked, setIsChecked] = useState(completed);

  let student_id = useParams();

  const handleChange = (e) => {
    setIsChecked(e.target.checked);

    axios
      .put(`http://localhost:3100/api/syllabus?student_id=${student_id.id}`, {
        completed: e.target.checked,
        syllabus_id: id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="modules">
      <div id="modules-title">
        {date} {course}
      </div>
      <input
        type="checkbox"
        id="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
    </div>
  );
};

export default CourseProgressItem;
