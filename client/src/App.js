import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";
import StudentProfile from "./components/StudentProfile";
import ChooseCohort from "./components/ChooseCohort";
import MentorFeedback from "./components/MentorFeedback";
import "./App.css";

function App() {
  const [validUser, setValidUser] = useState(false);
  console.log(validUser);
  const storageUser = localStorage.getItem("validUser");
  console.log(storageUser);
  return storageUser ? (
    <div>
      <Router>
        <Route
          path="/students/:id"
          component={() => <StudentProfile setValidUser={setValidUser} />}
        />
        <Route path="/cohorts" component={ChooseCohort} />
        <Route
          path="/feedback/:student_id/:mentor_id"
          component={() => <MentorFeedback setValidUser={setValidUser} />}
        />
      </Router>
    </div>
  ) : (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/login/student"
            component={() => <Homepage setValidUser={setValidUser} />}
          />
          <Route
            path="/login/mentor"
            component={() => <Homepage setValidUser={setValidUser} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
