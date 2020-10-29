import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./StudentProfile.css";
import axios from "axios";

const SubmissionCard = ({ student_id }) => {
  const [cardData, setCardData] = useState();
  const [value, setValue] = useState();
  const [somthing, setSomthing] = useState();
  console.log(value);
  const handleCardValue = (e) => {
    console.log(e);
    // setValue();
  };
  console.log(cardData);

  useEffect(() => {
    axios
      .get(`/api/get-submissions/${student_id}`)
      .then((response) => {
        setCardData(response.data);
        console.log(response.data.map((id) => id.id));
      })
      .catch((err) => console.log(err));
  }, [student_id]);

  const handleDate = (date) => {
    return date.split("T")[0];
  };
  return !cardData ? (
    <div>Loading...</div>
  ) : (
    <div>
      {cardData.map((card, index) => {
        return (
          <div value={card.id} onClick={handleCardValue}>
            <Card.Body id="submission-card">
              <Card.Title>{card.title}</Card.Title>
              <div>{card.id}</div>
              <div>{handleDate(card.submission_date)}</div>
              <div>{card.submission}</div>
              <div>{card.body}</div>

              <div id="comment">
                <input
                  id="comment-input"
                  placeholder="write a feedback"
                  type="text"
                  name="comment"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <div id="buttons">
                  <button id="comment-btn">Submit Feedback</button>
                  <button id="comment-btn">Edit Feedback</button>
                  <button id="comment-btn">Delete Feedback</button>
                </div>
              </div>
            </Card.Body>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionCard;
