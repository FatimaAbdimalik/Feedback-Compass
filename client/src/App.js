import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import StudentProfile from "./components/StudentProfile";
import ChooseCohort from "./components/ChooseCohort";
import MentorFeedback from "./components/MentorFeedback";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";

function App() {
  const [validUser, setValidUser] = useState(false);

  return (
    <div>
      {validUser ? (
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
      ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route
              path="/login/student"
              component={() => <LoginForm setValidUser={setValidUser} />}
            />
            <Route
              path="/login/mentor"
              component={() => <LoginForm setValidUser={setValidUser} />}
            />
            <Route
              path="/signup"
              component={() => <SignUp setValidUser={setValidUser} />}
            />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
