import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import LandingPage from "./components/LandingPage";
import StudentProfile from "./components/StudentProfile";
import ChooseCohort from "./components/ChooseCohort";
import MentorFeedback from "./components/MentorFeedback";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";

function App() {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("user");
  });

  useEffect(() => {
    console.log(user);
    if (user) {
      localStorage.setItem("user", "true");
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <div>
      {
        <Router>
          <Switch>
            <Route path="/students/:id">
              {user ? (
                <StudentProfile setUser={setUser} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/cohorts">
              {user ? <ChooseCohort setUser={setUser} /> : <Redirect to="/" />}
            </Route>
            <Route path="/feedback/:student_id/:mentor_id">
              {user ? (
                <MentorFeedback setUser={setUser} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/" component={LandingPage} />
            <Route
              path="/login/student"
              component={() => <LoginForm setUser={setUser} />}
            />
            <Route
              path="/login/mentor"
              component={() => <LoginForm setUser={setUser} />}
            />
            <Route path="/signup" component={() => <SignUp />} />
          </Switch>
        </Router>
      }
    </div>
  );
}

export default App;
