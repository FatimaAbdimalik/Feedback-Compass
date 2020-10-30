import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./StudentProfile.css";
import axios from "axios";
import moment from "moment";

const SubmissionCard = ({ student_id, mentor_id }) => {
  const [cardData, setCardData] = useState();
  const [value, setValue] = useState([]);
  const [feedback, setfeedack] = useState();

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

  const handleSubmitFeedback = (e) => {
    console.log(value);
    if (!value.find((p) => p[0] == "input" + e.target.value)) {
      alert("please add a comment before submitting!!!");
      return;
    } else {
      const currentDate = JSON.stringify(moment());
      const handleDate = (date) => {
        return date.split("T")[0];
      };

      axios
        .put(`/api/feedback`, {
          id: e.target.value,
          mentor_id: mentor_id,
          body: value.find((p) => p[0] == "input" + e.target.value)[1],
          feedback_date: handleDate(currentDate),
        })
        .then(function (response) {
          alert("Feedback submitted");
        })

        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
  };

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
          <div>
            <Card.Body className="submission-card" key={index}>
              <Card.Title id="card-title">{card.title}</Card.Title>
              <div className="card-color">
                <div id="card-date">
                  Sent: {handleDate(card.submission_date)}
                </div>
                <div>
                  <span>
                    <a
                      className="submission-link"
                      href={card.submission}
                      target="_blank"
                    >
                      {card.submission}{" "}
                    </a>
                  </span>
                </div>
                <div>{card.body}</div>

                <div id="comment">
                  <input
                    className="comment-input"
                    id={"input" + card.id}
                    placeholder="write a feedback"
                    type="text"
                    name="comment"
                    onChange={handleChange}
                  />
                  <div id="buttons">
                    <button
                      id="comment-btn"
                      value={card.id}
                      onClick={handleSubmitFeedback}
                    >
                      Submit Feedback
                    </button>
                    <button id="comment-btn">Edit Feedback</button>
                    <button id="comment-btn">Delete Feedback</button>
                  </div>
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
