import React, { useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";
const CourseProgressItem = ({ date, course, completed }) => {
  const [isChecked, setIsChecked] = useState(completed);
  console.log(isChecked);
  const handleChange = (e) => {
    setIsChecked(e.target.checked);

    axios
      .put("http://localhost:3100/api/syllabus?student_id=5", {
        completed: e.target.checked,
        syllabus_id: 7,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Row>
        {" "}
        {date} {course}{" "}
        <input type="checkbox" checked={isChecked} onChange={handleChange} />{" "}
      </Row>
    </div>
  );
};

export default CourseProgressItem;
