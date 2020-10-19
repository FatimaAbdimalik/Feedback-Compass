import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./components/Homepage";
import Regions from "./components/Regions";
import StudentProfile from "./components/StudentProfile";

export function App() {
  return (
    <Router>
      <Route exact path="/" component={Homepage} />
      <Route path="/student" component={StudentProfile} />
      <Route path="/regions" component={Regions} />
      <PrivateRoute exact path="/regions" component={() => <Regions />} />
    </Router>
  );
}

export default App;
