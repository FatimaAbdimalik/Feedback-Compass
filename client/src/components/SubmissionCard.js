import React, { useEffect, useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import "./StudentProfile.css";
import axios from "axios";
import StudentResponse from "./StudentResponse";
import Filter from "./Filter";

const SubmissionCard = ({ id }) => {
  const [cardData, setCardData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
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

  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };

  return !cardData ? (
    <div>
      <Filter searchItem={searchItem} handleChange={handleChange} />
      Loading...
    </div>
  ) : (
    <div>
      <Filter searchItem={searchItem} handleChange={handleChange} />

      {filterCardData(searchItem).map((card, index) => {
        return (
          <Accordion>
            <Card className="submission-card" key={index}>
              <Card.Title
                style={{ width: "80%", display: "flex" }}
                id="card-title"
              >
                <Accordion.Toggle as={Button} variant="light" eventKey="0">
                  {mentorName && card.body ? (
                    "Feedback from " +
                    mentorName.find((m) => m.id === card.mentor_id).name +
                    " " +
                    mentorName.find((m) => m.id === card.mentor_id).surname +
                    " On " +
                    card.title
                  ) : (
                    <p className="waiting-feedback">
                      Waiting for feedback on {card.title}
                    </p>
                  )}
                </Accordion.Toggle>
              </Card.Title>
              <Accordion.Collapse eventKey="0">
                <div className="card-color">
                  <div id="card-date">
                    Sent: {handleDate(card.submission_date)}
                  </div>
                  <div id="card-submitted">
                    <h5>Submitted Work:</h5>
                    <span>
                      <a
                        className="submission-link"
                        href={card.submission}
                        target="_blank"
                      >
                        {card.submission}
                      </a>
                    </span>
                    <br />
                  </div>
                  <span>
                    <div id="card-feedback">
                      <h5>
                        {card.body && mentorName
                          ? mentorName.find((m) => m.id === card.mentor_id)
                              .name +
                            " " +
                            mentorName.find((m) => m.id === card.mentor_id)
                              .surname +
                            " : "
                          : ""}
                      </h5>
                      {card.body
                        ? splitLines(card.body).map((f, i) => (
                            <p key={i}>{f}</p>
                          ))
                        : ""}
                    </div>
                  </span>

                  <StudentResponse
                    id={card.id}
                    student_id={id}
                    responses={card.response}
                  />
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
