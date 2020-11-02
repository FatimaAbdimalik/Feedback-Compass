import React, { component, useState } from "react";
import { useHistory, useLocation, useParams, Redirect } from "react-router-dom";
import Logo from "./Logo.png";
import axios from "axios";
import "./LoginForm.css";

// const authentication = {
//   isLoggedIn: false,
//   onAuthentication() {
//     isLoggedIn = true;
//   },
//   getLoginStatus() {
//     return isLoggedIn;
//   },
// };

// export function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         validUser ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: "/" }} />
//         )
//       }
//     />
//   );
// }

export function PrivateRoute({ children, ...rest }) {
  let location = useLocation();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        validUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [validUser, setValidUser] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.id);

        if (response.data.user_type === "student") {
          setValidUser(true);

          history.push(`/students/${response.data.id}`);
        } else {
          history.push(`/cohorts?mentorId=${response.data.id}`);
        }
      })
      .catch(function (error) {
        if (error) {
          setEmail("");
          setPassword("");
          setMessage("Invalid email or password!");
        }
      });
  };

  return (
    <div id="login-container">
      <div id="heading">
        <img id="logo" src={Logo} width="400" />
      </div>
      <div className="container">
        <h2 className="welcom">Welcome to </h2>
        <h4>CYF feedback tracker</h4>
        <h2>Sign In</h2>
        <form>
          <h3>{message}</h3>
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" type="submit" onClick={handleSubmit}>
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
