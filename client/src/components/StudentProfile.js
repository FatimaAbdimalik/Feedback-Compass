import React, { useState, useEffect } from "react";
import Logo from "./Logo.png";
import axios from "axios";
import avatar from "./Avatar.png";
import { useParams, useHistory } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

import "./StudentProfile.css";

function StudentProfile() {
  const [profilePhoto, setProfilePhoto] = useState(avatar);
  const [studentDetails, setStudentDetails] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [moduleTitle, setModuleTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isCommented, setIsCommented] = useState("");
  const [data, setData] = useState("");
  const [bio, setBio] = useState("about you...");
  const [submitBio, setSubmitBio] = useState();
  console.log(studentDetails);

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/students/${id}`)
      .then(function (response) {
        if (response.data) {
          setStudentDetails(response.data);
          setSubmitBio(responde.data.biography);
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/feedback`, {
        params: {
          student_id: id,
          title: moduleTitle,
        },
      })
      .then(function (response) {
        if (response) {
          setFeedback(response.data);
        }
      })
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
      });
  }, [moduleTitle]);

  ////-----------Biography Section------------------>
  const history = useHistory();
  const handleEditProfile = (e) => {
    e.preventDefault();
    history.push(`/students/${id}/edit`);
    // setBio(submitBio);
    // document.getElementById("student-bio").value = "";
  };

  //------------ Modules list  handling -------->

  const handleComentBtn = (e) => {
    e.preventDefault();
    document.getElementById("comment-input").value = "";

    setIsCommented(comment);

    axios
      .put("api/students/comments/3/2", {
        response: comment,
      })
      .then(function (response) {
        if (response) {
          alert("comment posted");
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
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
            {/* <a href="#">Add a profile</a> */}
            {studentDetails ? (
              <UpdateProfile
                studentDetails={studentDetails}
                setStudentDetails={setStudentDetails}
              />
            ) : null}

            <h4>
              {studentDetails
                ? `${studentDetails.name} ${studentDetails.surname}`
                : null}
            </h4>
            <h5>{studentDetails ? studentDetails.biography : null}</h5>
            <input
              id="student-bio"
              placeholder="add your biography"
              type="text"
              name="bio"
              onChange={(e) => {
                setSubmitBio(e.target.value);
              }}
            />
            <button id="modules" onClick={handleEditProfile}>
              Save
            </button>
            <div id="modules-container">
              <h2>Modules</h2>
              <select
                id="modules"
                name="HTML"
                onChange={(e) =>
                  setModuleTitle(e.target.name + "-" + e.target.value)
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
                  setModuleTitle(e.target.name + " " + e.target.value)
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
                onChange={(e) => {
                  setModuleTitle(e.target.name + "-" + e.target.value);
                  console.log(e);
                }}
              >
                <option>JAVASCRIPT</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>

              <select
                id="modules"
                name="React"
                onChange={(e) =>
                  setModuleTitle(e.target.name + " " + e.target.value)
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

          <div id="feedback-panel">
            <div id="single-feedback">
              <h1>{moduleTitle} Feedback</h1>
              <div>
                {feedback.map((singleFeedback, i) => {
                  return <p key={i}>{singleFeedback.body}</p>;
                })}
              </div>

              <div id="comment">
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
