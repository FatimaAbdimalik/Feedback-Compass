import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Accordion, Button } from "react-bootstrap";
import "./StudentProfile.css";
import axios from "axios";

const SubmissionCard = ({ id }) => {
  const [cardData, setCardData] = useState();

  useEffect(() => {
    axios
      .get(`/api/get-submissions/${id}`)
      .then((response) => {
        setCardData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDate = (date) => {
    return date.split("T")[0];
  };
  return !cardData ? (
    <div>Loading...</div>
  ) : (
    <div>
      {cardData.map((card, index) => {
        return (
          <Accordion>
            <Card className="submission-card" key={index}>
              <Card.Title style={{ width: "40rem", display: "flex" }}>
                <Accordion.Toggle as={Button} variant="light" eventKey="0">
                  {" "}
                  {card.title}
                </Accordion.Toggle>
              </Card.Title>
              <Accordion.Collapse eventKey="0">
                <div className="card-color">
                  <div id="card-date">
                    {" "}
                    Sent: {handleDate(card.submission_date)}
                  </div>
                  <div id="card-submitted">
                    <h5>Submitted Work:</h5>{" "}
                    <span>
                      <a
                        className="submission-link"
                        href={card.submission}
                        target="_blank"
                      >
                        {card.submission}{" "}
                      </a>
                    </span>
                    <br />
                  </div>
                  <span>
                    {" "}
                    <div id="card-feedback"> {card.body}</div>
                  </span>

                  <div id="comment">
                    <input
                      id="comment-input"
                      placeholder="write a comment"
                      type="text"
                      name="comment"
                    />
                    <div id="buttons">
                      <button id="comment-btn">Submit comment</button>
                      <button id="comment-btn">Edit comment</button>
                      <button id="comment-btn">Delete comment</button>
                    </div>
                  </div>
                </div>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
      })}
    </div>
  );
};

export default SubmissionCard;
