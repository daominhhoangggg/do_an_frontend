import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";

import "./Auth.css";

const Signup = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async () => {
    const fetchSignup = async () => {
      const query = "?" + `email=${email}&password=${password}`;
      try {
        const response = await UserAPI.postSignUp(query);

        localStorage.setItem("asm03-user", JSON.stringify(response.user));

        localStorage.setItem("token", response.token);

        dispatch({ type: "LOGIN_SUCCESS", payload: response });

        history.push("/");
        window.location.reload();
      } catch (error) {
        if (error.response.data.error === email) {
          console.log("Email Error.");
          dispatch({ type: "LOGIN_FAILURE", payload: "Wrong email." });
          return;
        } else {
          if (error.response.data.error === password) {
            console.log("Password Error");
            dispatch({ type: "LOGIN_FAILURE", payload: "Wrong password." });
            return;
          }
        }
      }
    };

    // fetchSignup();
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="login">
            <div className="heading">
              <h2>Sign in</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="button" className="float" onClick={handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
