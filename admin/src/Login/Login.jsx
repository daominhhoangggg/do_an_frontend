import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async () => {
    const fetchLogin = async () => {
      const query = "?" + `email=${email}&password=${password}`;
      try {
        const response = await UserAPI.postLogin(query);

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

    fetchLogin();

    // const findUser = user.find((value) => {
    //   return value.email === email;
    // });

    // if (findUser && findUser.password === password) {
    //   dispatch({ type: "LOGIN_SUCCESS", payload: findUser });
    //   // navigate("/")
    // } else {
    //   alert("Email or password wrong!");
    // }

    // if (findUser.password !== password) {
    // 	setErrorPassword(true);
    // 	return;
    // } else {
    // 	setErrorPassword(false);

    // 	localStorage.setItem('id_user', findUser._id);

    // 	localStorage.setItem('name_user', findUser.fullname);

    // 	const action = addSession(localStorage.getItem('id_user'));
    // 	dispatch(action);

    // 	setCheckPush(true);
    // }
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

export default Login;
