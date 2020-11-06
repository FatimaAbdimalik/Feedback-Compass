import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import "./StudentProfile.css";

const FeedbackField = ({ id, mentor_id, cardData, setCardData }) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmitFeedback = (e) => {
    const currentDate = JSON.stringify(moment());
    const handleDate = (date) => {
      return date.split("T")[0];
    };
    axios
      .put(`/api/feedback`, {
        id: e.target.value,
        mentor_id: mentor_id,
        body: value + "\n",
        feedback_date: handleDate(currentDate),
      })
      .then(function (response) {
        const updatedCardData = cardData.map((card) => {
          if (card.id === response.data.id) {
            return { ...response.data };
          } else {
            return { ...card };
          }
        });

        setCardData(updatedCardData);
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
      <input
        className="comment-input"
        id={id}
        placeholder="write a feedback"
        type="text"
        name="comment"
        onChange={handleChange}
        value={value}
      />

      <button
        id="comment-btn"
        value={id}
        onClick={handleSubmitFeedback}
        type="submit"
      >
        SEND
      </button>
    </div>
  );
};

export default FeedbackField;
