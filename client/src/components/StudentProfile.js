import React, { useState, useEffect } from "react";
import Logo from "./Logo.png";
import axios from "axios";
import avatar from "./Avatar.png";
import "./StudentProfile.css";
// import { Row } from "react-bootstrap";

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
  // axios
  // .get("/api/users", {
  // })
  // .then(function (response) {
  //   if (response) {

  //   }
  // })
  // .catch(function (error) {
  //   if (error) {

  //   }
  // });

  //------------ Modules list  handling -------->
  const [moduleTitle, setModuleTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isCommented, setIsCommented] = useState("");
  const [module, setModule] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  console.log(module);
  const handleTickBox = (e) => {
    e.stopPropagation();
    setIsChecked(e.target.checked);
  };
  console.log(isChecked);
  const handleComentBtn = (e) => {
    e.preventDefault();
    setIsCommented(comment);
    document.getElementById("comment-input").value = "";
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/syllabus")
      .then((res) => res)
      .then((data) => setModule(data.data));
  }, []);
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
            <div id="modules-container">
              <h2>Course Progress</h2>
              {!module ? (
                <div>Loading</div>
              ) : (
                module.map((subject, index) => {
                  return (
                    <div id="courses_table">
                      <p>{subject.start_date}</p>
                      <p>{subject.modules}</p>
                      <input
                        type="checkbox"
                        id="checkid"
                        checked={isChecked}
                        onChange={handleTickBox}
                      />
                    </div>
                  );
                })
              )}

              {/* <select
                id="modules"
                name="HTML"
                onChange={(e) =>
                  setModuleTitle(e.target.value + " " + e.target.name)
                }
              >
                <option>HTML</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>

              <select
                id="modules"
                name="CSS"
                onChange={(e) =>
                  setModuleTitle(e.target.value + " " + e.target.name)
                }
              >
                <option>CSS</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>

              <select
                id="modules"
                name="Javascript"
                onChange={(e) =>
                  setModuleTitle(e.target.value + " " + e.target.name)
                }
              >
                <option>Javascript</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>

              <select
                id="modules"
                name="React"
                onChange={(e) =>
                  setModuleTitle(e.target.value + " " + e.target.name)
                }
              >
                <option>React</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>

              <select
                id="modules"
                name="Node.js"
                onChange={(e) =>
                  setModuleTitle(e.target.value + " " + e.target.name)
                }
              >
                <option>Node.js</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>

              <select
                id="modules"
                name="SQL"
                onChange={(e) =>
                  setModuleTitle(e.target.value + " " + e.target.name)
                }
              >
                <option>SQL</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select> */}
            </div>
          </div>

          <div id="feedback">
            <div>
              <h1>{moduleTitle} Feedback</h1>
              <p>
                background and height as shown in the GitHub gist above. Since
                our list has a background of white we changed the Main
                background so that we could clearly see our selection.
              </p>
              <div id="comment">
                <p>{isCommented}</p>
                <input
                  id="comment-input"
                  placeholder="write a comment"
                  type="text"
                  name="comment"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <div id="buttons">
                  <button id="comment-btn" onClick={handleComentBtn}>
                    Comment
                  </button>
                  <button id="comment-btn">Edit comment</button>
                  <button id="comment-btn">Delete comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
