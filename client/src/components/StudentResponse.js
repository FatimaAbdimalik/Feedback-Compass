import React, { useState, useEffect } from "react";
import "./StudentResponse.css";
import axios from "axios";
import moment from "moment";

const StudentResponse = ({ id, student_id, responses }) => {
  const [value, setValue] = useState([]);
  const [response, setResponse] = useState();

  const handleChange = (e) => {
    if (value.filter((p) => p[0] == e.target.id).length > 0) {
      value.forEach((p, index) => {
        if (p[0] == e.target.id) {
          value.splice(index, 1);
        }
      });
    }

    value.push([e.target.id, e.target.value]);
    setValue(value);
  };
  useEffect(() => {
    if (responses) {
      const splitLines = (str) => str.split(/\r?\n/);
      setResponse(splitLines(responses));
    }
  }, []);

  const handleSubmitResponse = (e) => {
    if (!value.find((p) => p[0] == "input" + e.target.value)) {
      alert("please add a comment before submitting!!!");
      return;
    } else {
      const currentDate = JSON.stringify(moment());
      const handleDate = (date) => {
        return date.split("T")[0].slice(1);
      };
      console.log(handleDate(currentDate));
      axios
        .put("/api/response", {
          id: e.target.value,
          student_id: student_id,
          response:
            value.find((p) => p[0] == "input" + e.target.value)[1] + "\n",
          response_date: handleDate(currentDate),
        })
        .then(function (response) {
          alert("Response sent");
        })

        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
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
          id={"input" + id}
          placeholder="Write a comment"
          type="text"
          name="comment"
          onChange={handleChange}
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
