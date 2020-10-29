import React, { useState, useEffect } from "react";
import Logo from "./Logo.png";
import axios from "axios";
import avatar from "./Avatar.png";
import { useParams, useHistory } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import CourseProgressList from "./CourseProgressList";
import StudentSubmission from "./StudentSubmission";
import SubmissionCard from "./SubmissionCard";
import "./StudentProfile.css";

function StudentProfile() {
  const [profilePhoto, setProfilePhoto] = useState(avatar);
  const [studentDetails, setStudentDetails] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [comment, setComment] = useState("");
  const [isCommented, setIsCommented] = useState("");

  console.log(studentDetails);

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

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/api/feedback`, {
  //       params: {
  //         student_id: id,
  //         title: moduleTitle,
  //       },
  //     })
  //     .then(function (response) {
  //       if (response) {
  //         setFeedback(response.data);
  //       }
  //     })
  //     .catch(function (error) {
  //       if (error) {
  //         console.log(error);
  //       }
  //     });
  // }, [moduleTitle]);

  ////-----------Biography Section------------------>
  const history = useHistory();
  const handleEditProfile = (e) => {
    e.preventDefault();
    history.push(`/students/${id}/edit`);
  };

  //------------ Modules list  handling -------->

  // const handleComentBtn = (e) => {
  //   e.preventDefault();
  //   document.getElementById("comment-input").value = "";

  //   setIsCommented(comment);

  //   axios
  //     .put("api/students/comments/3/2", {
  //       response: comment,
  //     })
  //     .then(function (response) {
  //       if (response) {
  //         alert("comment posted");
  //       }
  //     })
  //     .catch(function (error) {
  //       if (error) {
  //       }
  //     })}

  return (
    <div>
      <div id="student-container">
        <div id="student-heading">
          <a href="/">
            <img id="logo" src={Logo} width="400" />
          </a>
          <h1 className="welcom">Track Your Feedback</h1>
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

                {/* <button id="modules" onClick={handleEditProfile}>
                          Save
                      </button> */}
              </div>
            </div>

            <CourseProgressList />

            <div id="feedback-panel">
              <div id="single-feedback">
                {/* <div>
                    {feedback.map((singleFeedback, i) => {
                      return <p key={i}>{singleFeedback.body}</p>;
                    })}
                  </div> */}
              </div>
            </div>
          </div>
          <div id="feedback">
            <h1>Latest Feedback</h1>
            <StudentSubmission id={id} />
            <SubmissionCard id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
