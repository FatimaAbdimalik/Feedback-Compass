import axios from "axios";
import React, { useState, useEffect } from "react";
import SubmitWork from "./SubmitWork";

const LessonsDropDown = ({ module }) => {
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
          return (
            <option>
              {module}/{item.description}
            </option>
          );
        })}
      </select>
      <SubmitWork />
    </div>
  );
};

export default LessonsDropDown;
