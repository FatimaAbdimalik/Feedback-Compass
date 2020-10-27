import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import CourseProgressItem from "./CourseProgressItem";

const CourseProgressList = () => {
  let student_id = useParams();
  console.log("******", student_id.id);

  const [module, setModule] = useState([]);

  console.log("this is modules", module);

  useEffect(() => {
    axios
      .get(`http://localhost:3100/api/syllabus?student_id=${student_id.id}`)
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
