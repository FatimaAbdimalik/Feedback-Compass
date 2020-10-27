import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
const CourseProgressItem = ({ date, course, completed, id }) => {
  const [isChecked, setIsChecked] = useState(completed);
  console.log(isChecked);

  console.log(id);

  let student_id = useParams();

  console.log("******", student_id.id);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);

    //http://localhost:3100/api/syllabus?student_id=4
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
