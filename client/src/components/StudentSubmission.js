import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const StudentSubmission = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button style={{ backgroundColor: "black", marginLeft: "19em" }}>
        Submit You Work Here
      </Button>
    </div>
  );
};

export default StudentSubmission;
