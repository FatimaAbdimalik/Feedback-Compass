import axios from "axios";
import React, { useState, useEffect } from "react";
import SubmitWork from "./SubmitWork";

const LessonsDropDown = ({ module, id }) => {
  const [lesson, setLesson] = useState();
  const [lessonValue, setLessonValue] = useState();
  useEffect(() => {
    axios.get("/api/syllabus/lessons").then((response) => {
      setLesson(response.data);
    });
  }, []);

  return !lesson ? (
    <div>Loading</div>
  ) : (
    <div>
      <select
        className="dropdown"
        onChange={(e) => setLessonValue(e.target.value)}
      >
        <option>Select A Lesson</option>
        {lesson.map((item, index) => {
          return (
            <option key={index}>
              {module}/{item.description}
            </option>
          );
        })}
      </select>
      {lessonValue && lessonValue !== "Select A Lesson" ? (
        <SubmitWork id={id} lessonValue={lessonValue} />
      ) : null}
    </div>
  );
};

export default LessonsDropDown;
