import React, { useState, useContext } from "react";
import alertify from "alertifyjs";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleSubmit = async () => {
    const fetchLogin = async () => {
      const query = "?" + `email=${email}&password=${password}`;

      try {
        const response = await UserAPI.postLogin(query);

        localStorage.setItem("token", response.token);

        dispatch({ type: "LOGIN_SUCCESS", payload: response.user });

        window.location.href = "/";
      } catch (error) {
        if (error.response.data.error === "email") {
          alertify.set("notifier", "position", "bottom-left");
          alertify.error(error.response.data.message);
          dispatch({ type: "LOGIN_FAILURE", payload: "Wrong email." });
          return;
        } else {
          if (error.response.data.error === "password") {
            alertify.set("notifier", "position", "bottom-left");
            alertify.error(error.response.data.message);
            dispatch({ type: "LOGIN_FAILURE", payload: "Wrong password." });
            return;
          }
        }
      }
    };

    fetchLogin();
  };

  return (
    <div className="page-breadcrumb">
      <div className="row">
        <div className="login">
          <div className="heading">
            <h2>Log in</h2>
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
  );
};

export default Login;
