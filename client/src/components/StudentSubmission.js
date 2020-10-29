import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ModuleDropDown from "./ModuleDropDown";

const StudentSubmission = ({ id }) => {
  const [show, setShow] = useState(false);

  const handleModalOpen = () => {
    return setShow(true);
  };

  const handleModalClose = () => {
    return setShow(false);
  };
  return (
    <div>
      <Button
        style={{ backgroundColor: "black", marginLeft: "19em" }}
        onClick={handleModalOpen}
      >
        Submit You Work Here
      </Button>
      <Modal
        show={show}
        onHide={handleModalClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <ModuleDropDown id={id} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleModalClose}
            style={{ backgroundColor: "#686868" }}
          >
            CLOSE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentSubmission;
