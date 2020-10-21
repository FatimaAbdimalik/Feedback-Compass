import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";
import StudentProfile from "./components/StudentProfile";
import ChooseCohort from "./components/ChooseCohort";
import "./App.css";

function App() {
  return (
    <Router>
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={Homepage} />
      <Route path="/student" component={StudentProfile} />
      <Route path="/cohorts" component={ChooseCohort} />
    </Router>
  );
}

export default App;
