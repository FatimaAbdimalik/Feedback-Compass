import React, { useState, useEffect } from "react";

const Filter = () => {
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {}, []);

  const handleChange = (e) => {
    return setSearchItem(e.target.value);
  };
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
