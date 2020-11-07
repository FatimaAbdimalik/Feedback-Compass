import React from "react";

const Filter = ({ searchItem, handleChange }) => {
  return (
    <div>
      <input
        type="search"
        value={searchItem}
        placeholder="Search for submission title here"
        style={{ margin: "0 auto" }}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
