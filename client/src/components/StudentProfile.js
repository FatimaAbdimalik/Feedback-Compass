import React, { useState, useEffect } from "react";
import Logo from "./Logo.png";
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
  const [feedback, setFeedback] = useState([]);
  const [comment, setComment] = useState("");
  const [isCommented, setIsCommented] = useState("");

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
    <div>
      <div id="student-container">
        <div id="student-heading">
          <a href="/">
            <img id="logo" src={Logo} width="400" />
          </a>

          <h1 className="welcom">Track Your Feedback</h1>
          <div>
            <Logout setUser={setUser} />
          </div>
        </div>

        <div id="student-body">
          <div id="student-profile">
            <div id="student-details">
              <img src={profilePhoto} id="avatar" />
              <div id="student-name">
                <h4>
                  {studentDetails
                    ? `${studentDetails.name} ${studentDetails.surname}`
                    : null}
                </h4>
                <h4>{studentDetails ? studentDetails.biography : null}</h4>
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

            <div id="feedback-panel">
              <div id="single-feedback"></div>
            </div>
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
