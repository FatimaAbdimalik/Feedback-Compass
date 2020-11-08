import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./ChooseStudent.css";

function ChooseStudents({ selectCohort }) {
  const [studentList, setStudentList] = useState([]);

  let location = useLocation();

  useEffect(() => {
    axios
      .get(`/api/students?cohort=${selectCohort}`)
      .then((data) => {
        setStudentList(data.data);
      })
      .catch((error) => {
        if (error) console.log(error);
      });
  }, [selectCohort]);

  let removeQmark = (string) => {
    return string.substring(string.indexOf("=") + 1);
  };
  let mentorID = removeQmark(location.search);
  return (
    <div id="studentsList">
      <ul>
        {studentList.map((student, index) => {
          return (
            <li value={student.id} key={index}>
              <Link
                className="student-name"
                to={`/feedback/${student.id}/${mentorID}`}
              >{`${student.name} ${student.surname}`}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ChooseStudents;
