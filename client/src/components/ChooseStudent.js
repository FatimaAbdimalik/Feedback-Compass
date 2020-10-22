import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";


function ChooseStudents({ selectCohort }) {
  const [studentList, setStudentList] = useState([]);
  const [select, setSelect] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/students?cohort=${selectCohort}`)
      .then((data) => {
        console.log(data.data);
        setStudentList(data.data);
      })
      .catch((error) => {
        if (error) console.log(error);
      });
  }, [selectCohort]);

  return (

    <div>
      <ul>

        {/* <select onChange={(e) => history.push(`/feedback/${e.target.value}`)}> */}

        {/* <op>select a student</option> */}
        {studentList.map((student, index) => (
          <li value={student.id} key={index}>

            <Link to={`/feedback/${student.id}`}>{`${student.name} ${student.surname}`}</Link>
          </li>
        ))}
        {/* </select> */}
      </ul>
    </div>
  );
}

export default ChooseStudents;
