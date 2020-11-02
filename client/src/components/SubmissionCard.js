import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./StudentProfile.css";
import axios from "axios";
import StudentResponse from "./StudentResponse";

const SubmissionCard = ({ id }) => {
  const [cardData, setCardData] = useState();
  const [mentorName, setMentorName] = useState();

  const splitLines = (str) => str.split(/\r?\n/);

  useEffect(() => {
    axios
      .get(`/api/get-submissions/${id}`)
      .then((response) => {
        setCardData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("/api/get-mentor-names")
      .then((response) => {
        setMentorName(response.data);
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
          <Card.Body className="submission-card" key={index}>
            <Card.Title key={index} id="card-title">
              {mentorName && card.body ? (
                "Feedback from " +
                mentorName.find((m) => m.id === card.mentor_id).name +
                " " +
                mentorName.find((m) => m.id === card.mentor_id).surname +
                " On " +
                card.title
              ) : (
                <p className="waiting-feedback">Waiting for feedback ...</p>
              )}
            </Card.Title>
            <div className="card-color">
              <div id="card-date">Sent: {handleDate(card.submission_date)}</div>
              <div id="card-submitted">
                <h5>Submitted Work:</h5>
                <span>
                  <a
                    className="submission-link"
                    href={card.submission}
                    target="_blank"
                  >
                    {"    " + card.submission}
                  </a>
                </span>
                <br />
              </div>
              <span>
                <div id="card-feedback">
                  <h5>
                    {card.body && mentorName
                      ? mentorName.find((m) => m.id === card.mentor_id).name +
                        " " +
                        mentorName.find((m) => m.id === card.mentor_id)
                          .surname +
                        " : "
                      : ""}
                  </h5>{" "}
                  {card.body
                    ? splitLines(card.body).map((f, i) => <p key={i}>{f}</p>)
                    : ""}
                </div>
              </span>
              <StudentResponse
                id={card.id}
                student_id={id}
                responses={card.response}
              />
            </div>
          </Card.Body>
        );
      })}
    </div>
  );
};

export default SubmissionCard;
