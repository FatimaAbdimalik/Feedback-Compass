import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./StudentProfile.css";
import axios from "axios";

const SubmissionCard = ({ id }) => {
  const [cardData, setCardData] = useState();
  console.log(cardData);

  useEffect(() => {
    axios
      .get(`/api/get-submissions/${id}`)
      .then((response) => {
        setCardData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleDate = (date) => {
    return date.split("T")[0];
  };
  return !cardData ? (
    <div>Loading...</div>
  ) : (
    <div>
      {cardData.map((card, index) => {
        return (
          <div key={index}>
            <Card.Body id="submission-card">
              <Card.Title>{card.title}</Card.Title>

              <div>{handleDate(card.submission_date)}</div>
              <div>{<a href={card.submission} target="blank"></a>}</div>

              <div>{card.body}</div>

              <div id="comment">
                <input
                  id="comment-input"
                  placeholder="write a comment"
                  type="text"
                  name="comment"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <div id="buttons">
                  <button id="comment-btn">Submit comment</button>
                  <button id="comment-btn">Edit comment</button>
                  <button id="comment-btn">Delete comment</button>
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
