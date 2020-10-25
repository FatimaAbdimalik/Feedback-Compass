import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseProgressItem from "./CourseProgressItem";

const CourseProgressList = () => {
  const [module, setModule] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3100/api/syllabus")
      .then((res) => res)
      .then((data) => setModule(data.data));
  }, []);

  return (
    <div id="modules-container">
      <h2>Course Progress</h2>
      {!module ? (
        <div>Loading</div>
      ) : (
        module.map((subject, index) => {
          return (
            <div>
              <CourseProgressItem
                date={subject.start_date}
                course={subject.modules}
                completed={subject.completed}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default CourseProgressList;
