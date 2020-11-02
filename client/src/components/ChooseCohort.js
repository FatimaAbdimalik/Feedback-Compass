import React, { useState, useEffect } from "react";
import ChooseStudent from "./ChooseStudent";
import Loader from "react-loader-spinner";
import "./ChooseCohort.css";

import axios from "axios";

function ChooseCohort() {
  const [cohort, setCohort] = useState();
  const [selectCohort, setSelectCohort] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cohorts")
      .then((data) => {
        setCohort(data.data);
      })
      .catch((error) => {
        if (error) console.log(error);
      });
  }, []);

  return !cohort ? (
    <div style={{ marginLeft: "35rem" }}>
      <Loader
        type="ThreeDots"
        color="red"
        height={500}
        width={100}
        timeout={3000} //3 secs
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
