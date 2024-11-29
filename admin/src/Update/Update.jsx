import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserAPI from "../API/UserAPI";

function Register(props) {
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirm] = useState("");
  const [role, setRole] = useState("");

  const [errorPw, setPwError] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [user, setUser] = useState({});

  const idUser = useParams().userId;

  useEffect(() => {
    const fetchData = async () => {
      if (idUser) {
        const response = await UserAPI.getDetailData(idUser);

        setUser(response);
        setFullName(response.fullname);
        setPhone(response.phone);
        setEmail(response.email);
        setRole(response.role);
      }
    };

    fetchData();
  }, [idUser]);

  const onNameChange = (e) => {
    if (e.target.value === "") setNameError(true);
    else setNameError(false);
    setFullName(e.target.value);
  };

  const onPhoneChange = (e) => {
    if (e.target.value === "") setPhoneError(true);
    else setPhoneError(false);
    setPhone(e.target.value);
  };

  const onEmailChange = (e) => {
    if (!validateEmail(e.target.value)) setEmailRegex(true);
    else setEmailRegex(false);

    if (e.target.value === "") {
      setEmailError(true);
      setEmailRegex(false);
    } else setEmailError(false);

    setEmail(e.target.value);
  };

  useEffect(() => {
    if (password !== "" && confirmPw !== password) setPwError(true);
    else setPwError(false);
  }, [password, confirmPw]);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Full name: " + fullname);
  //   console.log("Phone: " + phone);
  //   console.log("Email: " + email);
  //   console.log("Role: " + role);
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !phone || !email) {
      setNameError(true); //
      return;
    } else {
      setNameError(false); //
      if (!validateEmail(email)) {
        setEmailRegex(true);
        return;
      } else {
        setEmailRegex(false);
        if (!password && confirmPw !== password) {
          setPwError(true);
          return;
        } else {
          setPwError(false);

          const fetchUpdate = async () => {
            const data = {
              idUser: idUser,
              fullname: fullname,
              phone: phone,
              email: email,
              password: password,
              role: role,
            };
            const response = await UserAPI.putUpdateUser(data);

            // console.log(response);
          };

          fetchUpdate();
        }
      }
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <form style={{ width: "50%", marginLeft: "40px" }}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullname}
                placeholder="Enter Your Name"
                onChange={onNameChange}
              />
            </div>
            {nameError && (
              <span className="text-danger">* Please fill in your name *</span>
            )}
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                placeholder="Enter Phone Number"
                onChange={onPhoneChange}
              />
            </div>
            {phoneError && (
              <span className="text-danger">* Please fill in your phone *</span>
            )}
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                placeholder="Enter Email"
                onChange={onEmailChange}
              />
            </div>
            {emailError && (
              <span className="text-danger">* Please fill in your email *</span>
            )}
            {emailRegex && (
              <span className="text-danger">* Incorrect Email Format. *</span>
            )}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPw}
                placeholder="Confirm Your Password"
                onChange={(e) => setConfirm(e.target.value)}
              />
              {errorPw && (
                <span className="text-danger">
                  * Password does not match. *
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
                <option value="CS">Customer Support</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={onSubmit}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
