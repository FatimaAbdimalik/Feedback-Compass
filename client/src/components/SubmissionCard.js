import React, { useEffect, useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import "./StudentProfile.css";
import axios from "axios";

const SubmissionCard = ({ id }) => {
  const [cardData, setCardData] = useState();
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/get-submissions/${id}`)
      .then((response) => {
        setCardData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

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

  const handleChange = (e) => {
    return setSearchItem(e.target.value);
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
        onChange={handleChange}
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
        onChange={handleChange}
      />
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
        onChange={handleChange}
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
