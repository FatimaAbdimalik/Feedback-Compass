import React from "react";
import { Card } from "react-bootstrap";
import ModuleDropDown from "./ModuleDropDown";
import SubmitWork from "./SubmitWork";

const SubmissionCard = () => {
  //   let date = new Date();
  //   let dd = String(date.getDate().padStart(2, "0"));
  //   let mm = String(date.getMonth() + 1).padStart(2, "0");
  //   let yyyy = date.getFullYear();
  //   date = yyyy + "/" + mm + "/" + dd;
  return (
    <div>
      <Card.Body style={{ backgroundColor: "#686868" }}>
        <Card.Title>
          <ModuleDropDown />
          {/* <SubmitWork /> */}
        </Card.Title>
      </Card.Body>
    </div>
  );
};

export default SubmissionCard;
