import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "./ChooseCohort.css";
import "./ChooseStudentStyling.css";

import axios from "axios";

function ChooseCohort() {
  const [cohort, setCohort] = useState();
  const [selectCohort, setSelectCohort] = useState();

  useEffect(() => {
    axios
      .get("/api/cohorts")
      .then((data) => {
        setCohort(data.data);
      })
      .catch((error) => {
        if (error) console.log(error);
      });
  }, []);

  return !cohort ? (
    <div style={{ marginLeft: "32rem" }}>
      <Loader
        type="ThreeDots"
        color="red"
        height={500}
        width={100}
        timeout={3000}
      />
    </div>
  ) : (
    <div id="cohort-container">
      <section id="search-cohort">
        <h2>Select cohort and student</h2>
        <select onChange={(e) => setSelectCohort(e.target.value)}>
          <option id="cohort-option">Select a cohort</option>
          {cohort.map((cohort, index) => (
            <option id="cohort-option" value={cohort.cohort_name} key={index}>
              {cohort.cohort_name}
            </option>
          ))}
        </select>

        {selectCohort && <ChooseStudent selectCohort={selectCohort} />}
      </section>
    </div>
  );
}

export default ChooseCohort;
