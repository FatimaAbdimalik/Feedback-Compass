import React, { useEffect, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import "./StudentProfile.css";
import axios from "axios";
import moment from "moment";

const SubmissionCard = ({ student_id, mentor_id }) => {
  const [cardData, setCardData] = useState();
  const [value, setValue] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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

  const handleInputChange = (e) => {
    return setSearchItem(e.target.value);
  };

  const handleSubmitFeedback = (e) => {
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
      })
      .catch((err) => console.log(err));
  }, [student_id]);

  useEffect(() => {
    if (cardData !== undefined) {
      const foundTiles = cardData.filter((p) =>
        p.title.toLowerCase().includes(searchItem.toLowerCase())
      );
      setSearchResult(foundTiles);
    }
  }, [searchItem]);

  const handleDate = (date) => {
    return date.split("T")[0];
  };
  return !cardData ? (
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
  ) : cardData && !searchItem ? (
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
      {cardData.map((card, index) => {
        return (
          <div>
            <Accordion>
              <Card className="submission-card" key={index}>
                <Card.Title
                  id="card-title"
                  style={{ width: "40rem", display: "flex" }}
                >
                  <Accordion.Toggle as={Button} variant="light" eventKey="0">
                    {card.title}
                  </Accordion.Toggle>
                </Card.Title>
                <Accordion.Collapse eventKey="0">
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
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      })}
    </div>
  ) : (
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
      {searchResult.map((card, index) => {
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
