import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./UpdateProfile.css";

function UpdateProfile({ studentDetails, setStudentDetails }) {
  const [value, setValue] = useState({
    name: "",
    surname: "",
    email: "",
    biography: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let id = studentDetails.id;

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValue((previousValue) => {
      return { ...previousValue, [name]: value };
    });
  };

  useEffect(() => {
    axios
      .put(`/api/students/${id}`, {
        name: value.name,
        surname: value.surname,
        email: value.email,
        biography: value.biography,
      })
      .then(function (response) {
        setStudentDetails(response.data);
        setValue({
          name: "",
          surname: "",
          email: "",
          biography: "",
        });
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <button
        onClick={handleShow}
      >Update Your Profile</button>
      <Modal show={show}
        className="Modals"
        onHide={handleClose}>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {submitted ? <h3>Thank you for updating your details.</h3> : null}
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="text"
              name="biography"
              placeholder="Add a biography"
              onChange={handleChange}
            />
            <button type="submit" onClick={handleClose} >Save</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateProfile;
