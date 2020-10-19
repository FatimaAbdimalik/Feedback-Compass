import React from "react";
import RegionsCard from "./RegionsCard";
import regions from "../db/regions.json";
import "./regions.css";

function NorthWestCohort({ regions }) {
  console.log(regions);

  return (
    <Link
      className="nwc-container"
      to={{ pathname: `regions/${regions.name}` }}
    >
      <div className="cohort-container">
        <ul>
          {regions.cohort.map((cohort, index) => (
            <li key={index}>{cohort}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
export default NorthWestCohort;
