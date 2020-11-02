import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom";
import Logo from "./Logo.png";
import axios from "axios";
import "./SignUp.css"
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

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("/api/signup", {
                user_type: value.user_type,
                name: value.name,
                surname: value.surname,
                email: value.email,
                password: value.password,
                phone_number: value.phone_number,
                cohort_name: value.cohort_name
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                if (error) {
                    console.log(err)
                }
            })

    }

    return (
        <div>
            <div id="heading">
                <img id="logo" src={Logo} width="210" height="110" />
            </div>
            <form >
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input name="name" type="text" className="form-control" placeholder="First name" onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input name="surname" type="text" className="form-control" placeholder="Last name" onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control" placeholder="Enter email" onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Enter password" onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input name="phone_number" type="phone_Number" className="form-control" placeholder="Enter phone Number" onChange={handleChange}
                    />
                </div>

                <select name="user_type" onChange={handleChange}>
                    <option >Select an Option</option>
                    <option name="student" value="student" >Student</option>
                    <option name="mentor" value="mentor" >Mentor</option>
                </select>
                <section >


                    <select name="cohort_name" onChange={handleChange}>
                        <option>Select a Cohort</option>
                        {selectCohort ? selectCohort.map((cohort, index) => (
                            <option value={cohort.cohort_name} key={index}>
                                {cohort.cohort_name}
                            </option>
                        )) : ""}
                    </select>

                </section>
                <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}><Link to={"/login"}>Sign Up</Link></button>

            </form>

        </div>
    )
}

export default SignUp;