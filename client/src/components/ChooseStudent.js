import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link, useLocation } from "react-router-dom";


function ChooseStudents({ selectCohort }) {
  const [studentList, setStudentList] = useState([]);
  const [select, setSelect] = useState();

  // let query = useQuery();
  // function User({ mentor_id }) {
  //   return <div>{mentor_id}</div>;
  // }
  // function useQuery() {
  //   return new URLSearchParams(useLocation().search);
  // }
  // let query = useQuery();

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
        {studentList.map((student, index) => (
          <li value={student.id} key={index}>
            <Link to={`/feedback?studentId=${student.id}`
              // &mentorId=${}
            }>{`${student.name} ${student.surname}`}</Link>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default ChooseStudents;
