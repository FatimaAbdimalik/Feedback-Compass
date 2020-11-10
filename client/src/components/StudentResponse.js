import React, { useState, useEffect } from "react";
import "./StudentResponse.css";
import axios from "axios";
import moment from "moment";

const StudentResponse = ({ id, student_id, responses }) => {
  const [value, setValue] = useState("");
  const [response, setResponse] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (responses) {
      const splitLines = (str) => str.split(/\r?\n/);
      setResponse(splitLines(responses));
    }
  }, []);

  const currentDate = JSON.stringify(moment());

  const handleDate = (date) => {
    return date.split("T")[0];
  };

  const handleSubmitResponse = (e) => {
    axios
      .put("/api/response", {
        id: e.target.value,
        student_id: student_id,
        response: value + "\n",
        response_date: handleDate(currentDate),
      })
      .then(function (res) {
        const updatedResponse = [...response, value];
        setResponse(updatedResponse);
        setValue("");
      })

      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
  };

  return (
    <div>
      <div id="response">
        {response
          ? response.map((r, i) => (
              <p key={i} className="single-response">
                {r}
              </p>
            ))
          : ""}
      </div>
      <div id="comment">
        <input
          className="comment-input"
          id={id}
          placeholder="Write a comment"
          type="text"
          name="comment"
          onChange={handleChange}
          value={value}
        />

        <button id="comment-btn" value={id} onClick={handleSubmitResponse}>
          {" "}
          SEND
        </button>
      </div>
    </div>
  );
};

export default StudentResponse;
