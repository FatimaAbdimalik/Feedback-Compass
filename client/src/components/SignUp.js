import React, { useEffect, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import Logo from "./Logo.png";
import axios from "axios";
import "./SignUp.css";
function SignUp() {
  const [selectCohort, setSelectCohort] = useState();

  const [value, setValue] = useState({
    user_type: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    phonenumber: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((previousValue) => {
      return { ...previousValue, [name]: value };
    });
  };
  /// find the path and slice only the user type
  let location = useLocation();
  let userType = location.pathname.slice(8);

  const history = useHistory();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cohorts")
      .then((data) => {
        setSelectCohort(data.data);
      })
      .catch((error) => {
        if (error) console.log(error);
      });
  }, []);

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userType &&
      value.name &&
      value.surname &&
      value.email &&
      value.password &&
      value.phone_number
    ) {
      axios
        .post("/api/signup", {
          user_type: userType,
          name: value.name,
          surname: value.surname,
          email: value.email,
          password: value.password,
          phone_number: value.phone_number,
          cohort_name: value.cohort_name,
        })
        .then((res) => {
          return axios.post("/api/progress", {
            student_id: res.data.user[0].id,
          });
        })
        .then(function (user) {
          history.push(`/login/${location.pathname.slice(8)}`);
        })
        .catch(function (error) {
          if (error) {
            console.log(error);
          }
        });
    }
  };

  return (
    <div id="signup-container">
      <a href="/">
        <img id="logo" src={Logo} width="400" />
      </a>

      <form>
        <h3 className="sign-up">Sign Up</h3>
        <label>First name</label>
        <input
          name="name"
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={handleChange}
          required
        />
        <label>Last name</label>
        <input
          required
          name="surname"
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={handleChange}
        />
        <label>Email address</label>
        <input
          required
          name="email"
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          required
          name="password"
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
        <label>Phone Number</label>
        <input
          name="phone_number"
          type="phone_Number"
          className="form-control"
          placeholder="Enter phone Number"
          onChange={handleChange}
          required
        />
        <div className="signup-options">
          {userType == "student" ? (
            <section>
              <select name="cohort_name" onChange={handleChange}>
                <option id="cohort-option">Select a Cohort</option>
                {selectCohort
                  ? selectCohort.map((cohort, index) => (
                      <option
                        id="cohort-option"
                        value={cohort.cohort_name}
                        key={index}
                      >
                        {cohort.cohort_name}
                      </option>
                    ))
                  : ""}
              </select>
            </section>
          ) : (
            ""
          )}
          <Link to={`/login/${userType}`}>
            <button className="btn" type="submit" onClick={handleSubmit}>
              submit{" "}
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
