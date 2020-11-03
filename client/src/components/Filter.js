import React from "react";

const Filter = ({ searchItem, handleChange }) => {
  return (
    <div>
      <input
        type="search"
        value={searchItem}
        placeholder="Search for submission title here"
        style={{
          width: "20rem",
          backgroundColor: "white",
          marginLeft: "12rem",
          color: "black",
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
