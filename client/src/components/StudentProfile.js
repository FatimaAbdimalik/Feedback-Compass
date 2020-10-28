import React, { useState, useEffect } from "react";
import Logo from "./Logo.png";
import avatar from "./Avatar.png";
import "./StudentProfile.css";
import CourseProgressList from "./CourseProgressList";
import StudentSubmission from "./StudentSubmission";

function StudentProfile() {
  const [profilePhoto, setProfilePhto] = useState(avatar);
  const [studentDetails, setStudetDetails] = useState({
    name: "Sulaiman",
    surname: "Alhalabi",
  });

  ////-----------Biography Section------------------>
  const [bio, setBio] = useState("about you...");
  const [submitBio, setSubmiBio] = useState("");

  const handleBioSubmit = (e) => {
    e.preventDefault();
    setBio(submitBio);
    document.getElementById("student-bio").value = "";
  };

  //------------ Modules list  handling -------->
  const [moduleTitle, setModuleTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isCommented, setIsCommented] = useState("");

  const handleComentBtn = (e) => {
    e.preventDefault();
    setIsCommented(comment);
    document.getElementById("comment-input").value = "";
  };

  return (
    <div>
      <div id="student-container">
        <div id="student-heading">
          <img id="logo" src={Logo} width="210" height="150" />
          <h1 className="welcom">Track Your Feedback</h1>
        </div>
        <div id="student-body">
          <div id="student-profile">
            <img src={profilePhoto} id="avatar" />
            <a href="#">Add a profile</a>
            <h4>
              {studentDetails.name} {studentDetails.surname}
            </h4>
            <h5>{bio}</h5>
            <input
              id="student-bio"
              placeholder="add your biography"
              type="text"
              name="bio"
              onChange={(e) => {
                setSubmiBio(e.target.value);
              }}
            />
            <button id="modules" onClick={handleBioSubmit}>
              save
            </button>
            <CourseProgressList />
          </div>
          <div id="feedback">
            <StudentSubmission />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
