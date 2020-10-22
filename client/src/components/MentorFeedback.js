import React, { useState, useEffect } from "react";
import Logo from "./Logo.png"
import axios from "axios";
import avatar from "./Avatar.png"
import "./StudentProfile.css";
import moment from "moment";
import { useParams } from "react-router-dom";
import { ListGroupItem } from "reactstrap";





function StudentProfile() {

    const [profilePhoto, setProfilePhto] = useState(avatar)
    const [studentDetails, setStudetDetails] = useState('')
    console.log(studentDetails);
    let mentor_id = 2


    let { student_id } = useParams();
    // let { mentor_id } = useParams();



    ////-----------Biography Section------------------>
    const [bio, setBio] = useState('about you...')
    const [submitBio, setSubmiBio] = useState('')

    const handleBioSubmit = (e) => {
        e.preventDefault();

        setBio(submitBio)
        document.getElementById('student-bio').value = ''
    }



    console.log(JSON.stringify({
        postDate: moment()
    }));
    //------------ Modules list  handling -------->
    const [moduleTitle, setModuleTitle] = useState('')
    // const [comment, setComment] = useState('')
    // const [isCommented, setIsCommented] = useState('')
    console.log(moduleTitle);
    let comment = "Great job"

    const handleComentBtn = (e) => {
        e.preventDefault();
        // setIsCommented(comment)
        document.getElementById('comment-input').value = ''



        axios
            .post(`/feedback/${mentor_id}/${student_id}`, {
                title: moduleTitle,
                body: comment,
                sent_date: JSON.stringify({
                    postDate: moment()
                })
            })
            .then(function (response, err) {
                if (response) {
                    response.status(200)
                }

            })
            .catch((err) => {
                console.log(err)
            })


    }

    return (
        <div>
            <div id="student-container">
                <div id="student-heading">
                    <img id="logo" src={Logo} width="210" height="150" />
                    <h1 className='welcom' >Track Your Feedback</h1>
                </div>
                <div id='student-body'>
                    <div id='student-profile'>
                        <img src={profilePhoto} id='avatar' />
                        {/* <h4>{studentDetails.name} {studentDetails.surname}</h4> */}
                        <h5 >{bio}</h5>
                        <input id='student-bio'
                            placeholder='add your biography'
                            type="text"
                            name="bio"
                            onChange={(e) => { setSubmiBio(e.target.value) }}
                        />
                        <button id='modules' onClick={handleBioSubmit}>save</button>
                        <div id='modules-container'>
                            <h2>Modules</h2>
                            <select id='modules' name='HTML' onChange={(e) => setModuleTitle(e.target.value + ' ' + e.target.name)}>
                                <option>HTML</option>
                                <option>WEEK-1</option>
                                <option>WEEK-2</option>
                                <option>WEEK-3</option>
                            </select>

                            <select id='modules' name='CSS' onChange={(e) => setModuleTitle(e.target.value + ' ' + e.target.name)}>
                                <option>CSS</option>
                                <option>WEEK-1</option>
                                <option>WEEK-2</option>
                                <option>WEEK-3</option>
                            </select>


                            <select id='modules' name='Javascript' onChange={(e) => setModuleTitle(e.target.value + ' ' + e.target.name)}>
                                <option>Javascript</option>
                                <option>WEEK-1</option>
                                <option>WEEK-2</option>
                                <option>WEEK-3</option>
                            </select>



                            <select id='modules' name='React' onChange={(e) => setModuleTitle(e.target.value + ' ' + e.target.name)}>
                                <option>React</option>
                                <option>WEEK-1</option>
                                <option>WEEK-2</option>
                                <option>WEEK-3</option>
                            </select>



                            <select id='modules' name='Node.js' onChange={(e) => setModuleTitle(e.target.value + ' ' + e.target.name)} >
                                <option>Node.js</option>
                                <option>WEEK-1</option>
                                <option>WEEK-2</option>
                                <option>WEEK-3</option>
                            </select>


                            <select id='modules' name='SQL' onChange={(e) => setModuleTitle(e.target.value + ' ' + e.target.name)}>
                                <option>SQL</option>
                                <option>WEEK-1</option>
                                <option>WEEK-2</option>
                                <option>WEEK-3</option>
                            </select>
                        </div>
                    </div>

                    <div id='feedback'>
                        <div>
                            <h1>{moduleTitle} Feedback</h1>
                            <p>background and height as shown in the GitHub gist above. Since our list has a background of white we changed the Main background so that we could clearly see our selection.
              </p>
                            <div id='comment'>
                                <p>{comment}</p>
                                <input id='comment-input'
                                    placeholder='write a comment'
                                    type="text"
                                    name="comment"
                                // onChange={(e) => { setComment(e.target.value) }}
                                />
                                <div id='buttons'>
                                    <button id='comment-btn' onClick={handleComentBtn}>Comment</button>
                                    <button id='comment-btn'>Edit comment</button>
                                    <button id='comment-btn'>Delete comment</button>
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