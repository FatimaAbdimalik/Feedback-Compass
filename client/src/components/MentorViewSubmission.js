import React, { useEffect, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import "./StudentProfile.css";
import "./MentorFeedback";
import axios from "axios";
import FeedbackField from "./FeedbackField";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const MentorViewSubmission = ({ student_id, mentor_id }) => {
  const [cardData, setCardData] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const splitLines = (str) => str.split(/\r?\n/);

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`/api/get-submissions/${student_id}`)
      .then((response) => {
        setCardData(response.data);
      })
      .catch((err) => console.log(err));
  }, [student_id]);

  const filterCardData = (term) => {
    if (!term) {
      return cardData;
    } else {
      const foundTiles = cardData.filter((p) =>
        p.title.toLowerCase().includes(term.toLowerCase())
      );
      return foundTiles;
    }
  };

  const handleDate = (date) => {
    return date.split("T")[0];
  };
  return !cardData.length ? (
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
        onChange={handleInputChange}
      />
      Loading...
    </div>
  ) : (
    <div>
      <div className="search-bar">
        <input
          style={{ margin: "0 auto" }}
          id="search-bar"
          type="text"
          value={searchItem}
          placeholder="Search for submission title here"
          onChange={handleInputChange}
        />
      </div>
      <div>
        {filterCardData(searchItem).map((card, index) => {
          return (
            <div>
              <Accordion>
                <Card className="submission-card" key={index}>
                  <Card.Title
                    style={{ width: "80%", display: "flex" }}
                    id="card-title"
                  >
                    <Accordion.Toggle
                      className="title-btn"
                      variant="light"
                      eventKey="0"
                    >
                      {card.title}
                    </Accordion.Toggle>
                  </Card.Title>
                  <Accordion.Collapse eventKey="0">
                    <div className="card-color">
                      <div id="card-date">
                        Sent: {timeSince(Date.parse(card.submission_date))}
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
                      <div id="card-feedback">
                        {card.body ? (
                          <div>
                            {splitLines(card.body).map((r, i) => (
                              <p key={i}>{r}</p>
                            ))}{" "}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div id="submission-link">
                        {card.response ? (
                          <div>
                            {splitLines(card.response).map((r, i) => (
                              <p className="card-response" key={i}>
                                {r}
                              </p>
                            ))}{" "}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <FeedbackField
                        id={card.id}
                        mentor_id={mentor_id}
                        setCardData={setCardData}
                        cardData={cardData}
                      />
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorViewSubmission;
