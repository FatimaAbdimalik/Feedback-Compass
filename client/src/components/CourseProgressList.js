import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./StudentProfile.css";
import axios from "axios";
import CourseProgressItem from "./CourseProgressItem";

const CourseProgressList = ({ id }) => {
  // let student_id = useParams();

  const [module, setModule] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3100/api/syllabus?student_id=${id}`)
      .then((res) => res)
      .then((data) => setModule(data.data));
  }, []);

  return (
    <div id="checkbox-container">
      <h2 id="Course-Progress">Course Progress</h2>
      {!module ? (
        <div id="Course-Progress">Loading...</div>
      ) : (
        module.map((subject, index) => {
          return (
            <div id="course-progress" key={index}>
              <CourseProgressItem
                date={subject.start_date}
                course={subject.modules}
                completed={subject.completed}
                id={subject.syllabus_id}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default CourseProgressList;
