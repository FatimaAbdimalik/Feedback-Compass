import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "./Logo.png"
import axios from "axios";
import "./LandingPage.css";

const LandingPage = () => {

    const[isStudent, setIsStudent] = useState(false)
    const[isMentor, setIsMentor] = useState(false)
    const history = useHistory();


    const handleClickMentor = () =>{
        setIsMentor(true)
        history.push("/login");
    }

    
    const handleClickStudent = () =>{
        setIsStudent(true)
        history.push("/login");

    }
    return (
        <div id = "container">
          <div id = "heading">
              <img id = "logo" src= {Logo} width="210" height="150"/>
              <h1 className='welcom'>Welcome to CYF feedback tracker</h1>
          </div>

          <h2 id = "login-question">Log in as?</h2>

          <div id = "options">
              <button id = "student" onClick={handleClickStudent}>STUDENT</button>
              <button id = "mentor" onClick={handleClickMentor}>MENTOR</button>
          </div>
        </div>
    )
}










export default LandingPage;