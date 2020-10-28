import axios from "axios";
import React, { useState, useEffect } from "react";

const LessonsDropDown = () => {
  const [lesson, setLesson] = useState();

  useEffect(() => {
    axios.get("http://localhost:3100/api/syllabus/lessons").then((response) => {
      console.log(response);
      setLesson(response.data);
    });
  }, []);

  console.log(lesson);

  return !lesson ? (
    <div>Loading</div>
  ) : (
    <div>
      <select style={{ backgroundColor: "gray" }}>
        <option>Select A Lesson</option>
        {lesson.map((item) => {
          return <option>{item.description}</option>;
        })}
      </select>
    </div>
  );
};

export default LessonsDropDown;
