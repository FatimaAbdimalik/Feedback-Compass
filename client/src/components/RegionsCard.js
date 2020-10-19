import React from "react";
import { Link } from "react-router-dom";
import "./RegionsCard.css";

function RegionsCard({ region }) {
  return (
    <Link className="regions-card" to={{ pathname: `regions/${region.name}` }}>
      <div>
        <div className="region-card-container">
          <h2>{region.name}</h2>
          <img
            className="region-img"
            src={region.image_url}
            alt={region.name + "'s image"}
          />
          {/* <p>{region.cohort}</p> */}
        </div>
      </div>
    </Link>
  );
}
export default RegionsCard;
