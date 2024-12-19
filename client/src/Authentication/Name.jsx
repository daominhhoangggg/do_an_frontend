import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserAPI from "../API/UserAPI";
import { deleteSession } from "../Redux/Action/ActionSession";
import { useDispatch } from "react-redux";

function Name(props) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const response = await UserAPI.getDetailData(decoded.userId);
        setName(response);
      } else {
        localStorage.clear();

        const action = deleteSession("");
        dispatch(action);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        style={{ cursor: "pointer" }}
        id="pagesDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-user-alt mr-1 text-gray"></i>
        {name.fullname}
      </a>
      <div className="dropdown-menu mt-3" aria-labelledby="pagesDropdown">
        <Link
          className="dropdown-item border-0 transition-link"
          to={`/user/${name._id}`}
        >
          Information
        </Link>
        <Link
          className="dropdown-item border-0 transition-link"
          to={"/history"}
        >
          History
        </Link>
      </div>
    </li>
  );
}

export default Name;
