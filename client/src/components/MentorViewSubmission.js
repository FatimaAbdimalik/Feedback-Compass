import React, { useEffect, useState, useContext } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import "./StudentProfile.css";
import "./MentorFeedback";
import axios from "axios";
import Filter from "./Filter";
import FeedbackField from "./FeedbackField";

export const userContext = React.createContext();

const MentorViewSubmission = ({ student_id, mentor_id }) => {
  const [cardData, setCardData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [unMarked, setUnMarked] = useState();

  let withoutFeedback = cardData.filter((p) => !p.body).length;

  console.log(withoutFeedback);
  const splitLines = (str) => str.split(/\r?\n/);

  const handleChange = (e) => {
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
      <Filter searchItem={searchItem} handleChange={handleChange} />
      Loading...
    </div>
  ) : (
    <div>
      <Filter searchItem={searchItem} handleChange={handleChange} />

      <div>
        {filterCardData(searchItem).map((card, index) => {
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
                              <p key={i}>{r}</p>
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
