import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { addUser } from "../../Redux/Action/ActionCart";
import { addSession, deleteSession } from "../../Redux/Action/ActionSession";

import { Link } from "react-router-dom";
import LoginLink from "../../Authentication/LoginLink";
import LogoutLink from "../../Authentication/LogoutLink";
import Name from "../../Authentication/Name";

function Header(props) {
  const [active, setActive] = useState("Home");
  const [loginUser, setLoginUser] = useState(false);
  const [nameUser, setNameUser] = useState(false);

  const dispatch = useDispatch();

  //Get IdUser từ redux khi user đã đăng nhập
  const idUser = useSelector((state) => state.Session.idUser);

  //Get idtemp từ redux khi user chưa đăng nhập
  const idTemp = useSelector((state) => state.Cart.id_user);

  //Sau khi F5 nó sẽ kiểm tra nếu phiên làm việc của Session vẫn còn thì nó sẽ tiếp tục
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        const action = deleteSession("");
        dispatch(action);
        setLoginUser(false);
        setNameUser(false);
      } else {
        // đưa dữ liệu vào Redux
        const action = addSession(decoded.userId);
        dispatch(action);
        setLoginUser(true);
        setNameUser(true);
      }
    } else {
      setLoginUser(false);
      setNameUser(false);
      //Đưa idTemp vào Redux temp để tạm lưu trữ
      localStorage.setItem("id_temp", "abc999");
      const action = addUser(localStorage.getItem("id_temp"));
      dispatch(action);
    }
  }, [idUser, dispatch]);

  const handlerActive = (value) => {
    setActive(value);
    console.log(value);
  };

  return (
    <div className="container px-0 px-lg-3">
      <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
        <Link className="navbar-brand" to={`/`}>
          <span className="font-weight-bold text-uppercase text-dark">
            Boutique
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item" onClick={() => handlerActive("Home")}>
              <Link
                className="nav-link"
                to={`/`}
                style={
                  active === "Home" ? { color: "#dcb14a" } : { color: "black" }
                }
              >
                Home
              </Link>
            </li>
            <li className="nav-item" onClick={() => handlerActive("Shop")}>
              <Link
                className="nav-link"
                to={`/shop`}
                style={
                  active === "Shop" ? { color: "#dcb14a" } : { color: "black" }
                }
              >
                Shop
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={`/cart`}>
                <i className="fas fa-dolly-flatbed mr-1 text-gray"></i>
                Cart
              </Link>
            </li>
            {nameUser ? <Name /> : ""}
            {loginUser ? <LoginLink /> : <LogoutLink />}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
