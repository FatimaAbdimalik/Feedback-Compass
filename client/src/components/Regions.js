import React from "react";
import RegionsCard from "./RegionsCard";
import regions from "../db/regions.json";
import "./regions.css";

function Regions() {
  return (
    <div className="regions-container">
      <div className="regions-row">
        {regions &&
          regions.map((region, index) => (
            <RegionsCard region={region} key={index} />
          ))}
      </div>
    </div>
  );
}
export default Regions;
