import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";

import "./Auth.css";

const Signup = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async () => {
    const fetchSignup = async () => {
      const query = "?" + `email=${email}&password=${password}`;
      try {
        const response = await UserAPI.postSignUp(query);

        history.push("/login");
        window.location.reload();
      } catch (error) {
        console.log(error);
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
              <h2>Sign up</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

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
                    <i className="fa fa-user">adc</i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>

                <button type="button" className="float" onClick={handleSubmit}>
                  Signup
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
