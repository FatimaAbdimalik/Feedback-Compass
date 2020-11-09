import React, { useState, useEffect } from "react";
import Logo from "./images/cyf_brand.png";
import axios from "axios";
import avatar from "./Avatar.png";
import { useParams, useHistory } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import CourseProgressList from "./CourseProgressList";
import StudentSubmission from "./StudentSubmission";
import SubmissionCard from "./SubmissionCard";
import Filter from "./Filter";
import Logout from "./Logout";
import "./StudentProfile.css";

function StudentProfile({ setUser }) {
  const [profilePhoto, setProfilePhoto] = useState(avatar);
  const [studentDetails, setStudentDetails] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/students/${id}`)
      .then(function (response) {
        if (response.data) {
          setStudentDetails(response.data);
        }
      })
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
      });
  }, [id]);

  ////-----------Biography Section------------------>
  const history = useHistory();
  const handleEditProfile = (e) => {
    e.preventDefault();
    history.push(`/students/${id}/edit`);
  };

  return (
    <div id="student-container">
      <div>
        <div id="profile-heading">
          <a href="/">
            <img id="logo" src={Logo} width="400" />
          </a>

          <h1 className="welcom-mentor">
            Hello {studentDetails ? studentDetails.name : null}
          </h1>

          <Logout setUser={setUser} />
        </div>

        <div id="student-body">
          <div id="student-profile">
            <div id="student-details">
              <img src={profilePhoto} id="avatar" />
              <div id="student-name-container">
                <h4 id="student-name">
                  {studentDetails
                    ? `${studentDetails.name} ${studentDetails.surname}`
                    : null}
                </h4>
                <h5 className="bio">
                  {studentDetails ? studentDetails.biography : null}
                </h5>
                <h4>
                  {studentDetails ? (
                    <UpdateProfile
                      studentDetails={studentDetails}
                      setStudentDetails={setStudentDetails}
                    />
                  ) : null}
                </h4>
              </div>
            </div>

            <CourseProgressList id={id} />
          </div>
          <div id="feedback">
            {/* <Filter id={id} /> */}
            <StudentSubmission id={id} />
            <SubmissionCard id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
