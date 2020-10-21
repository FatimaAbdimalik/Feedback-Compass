import React, { useState, useEffect } from "react";
import axios from "axios";

function ChooseStudents({ selectCohort }) {
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();

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
  console.log(studentList);
  return (
    <div>
      <form>
        <select onChange={(e) => setSelectedStudent(e.target.value)}>
          {studentList.map((student, index) => (
            <option value={student.name} key={index}>
              {`${student.name} ${student.surname}`}
            </option>
          ))}{" "}
        </select>
      </form>
    </div>
  );
}

export default ChooseStudents;
