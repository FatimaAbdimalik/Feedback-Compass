import React, { useState, useEffect } from "react";
import ChooseStudent from "./ChooseStudent";
import Loader from "react-loader-spinner";

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
      {" "}
      <Loader
        type="ThreeDots"
        color="white"
        height={500}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  ) : (
    <div>
      <section id="search-cohort">
        <form>
          <h2>Select cohort and student</h2>
          <select onChange={(e) => setSelectCohort(e.target.value)}>
            {cohort.map((cohort, index) => (
              <option value={cohort.cohort_name} key={index}>
                {cohort.cohort_name}
              </option>
            ))}
          </select>
        </form>
      </section>
      {selectCohort && <ChooseStudent selectCohort={selectCohort} />}
    </div>
  );
}

export default ChooseCohort;
