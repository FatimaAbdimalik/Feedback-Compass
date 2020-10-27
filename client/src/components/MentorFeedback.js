import React, { useState, useEffect } from "react";
import Logo from "./Logo.png";
import axios from "axios";
import avatar from "./Avatar.png";
import "./StudentProfile.css";
import moment from "moment";
import { useParams } from "react-router-dom";

function StudentProfile() {
  const [profilePhoto, setProfilePhoto] = useState(avatar);
  const [studentDetails, setStudentDetails] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");

  let { student_id } = useParams();

  let comment = "Great job";

  const handleComentBtn = (e) => {
    e.preventDefault();
    document.getElementById("comment-input").value = "";

    axios
      .post(`/feedback/${mentor_id}/${student_id}`, {
        title: moduleTitle,
        body: comment,
        sent_date: JSON.stringify({
          postDate: moment(),
        }),
      })
      .then(function (response, err) {
        if (response) {
          response.status(200);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`/api/students/${student_id}`)
      .then(function (response, err) {
        if (response) {
          setStudentDetails(response.data);
          response.status(200);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [student_id]);

  return (
    <div>
      <div id="student-container">
        <div id="student-heading">
          <img id="logo" src={Logo} width="210" height="150" />
          <h1 className="welcom">Students Feedback</h1>
        </div>
        <div id="student-body">
          <div id="student-profile">
            <img src={profilePhoto} id="avatar" />
            <h3>
              {studentDetails.name} {studentDetails.surname}
            </h3>
            <h5>
              {studentDetails.biography !== null
                ? studentDetails.biography
                : ""}
            </h5>

            <div id="modules-container">
              <h2>Modules</h2>
              <select
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
              </select>
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
                <p>{comment}</p>
                <input
                  id="comment-input"
                  placeholder="write a comment"
                  type="text"
                  name="comment"
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
