import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./StudentProfile.css";
import axios from "axios";
import moment from "moment";

const SubmissionCard = ({ student_id, mentor_id }) => {
  const [cardData, setCardData] = useState();
  const [value, setValue] = useState();
  const [feedback, setfeedack] = useState();

  const handleSubmitFeedback = (e) => {
    // var val = document
    //   .getElementById("submission-card")
    //   .getAttribute("data-value");
    setValue(e.target.value);
    const currentDate = JSON.stringify(moment());
    const handleDate = (date) => {
      return date.split("T")[0];
    };

    if (feedback !== "") {
      axios
        .put(`/api/feedback`, {
          id: e.target.value,
          mentor_id: mentor_id,
          body: feedback,
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
    } else if (feedback === "") {
      alert("Please add a feedback");
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
            <Card.Body className="submission-card">
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
                    setfeedack(e.target.value);
                  }}
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
            </Card.Body>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionCard;
