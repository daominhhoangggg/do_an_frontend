import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Menu(props) {
  const { user } = useContext(AuthContext);

  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar" data-sidebarbg="skin6">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="sidebar-item">
              <a className="sidebar-link sidebar-link" href="/">
                <i data-feather="home" className="feather-icon"></i>
                <span className="hide-menu">Dashboard</span>
              </a>
            </li>
            <li className="list-divider"></li>
          </ul>
          (
          <ul id="sidebarnav">
            <li className="nav-small-cap">
              <span className="hide-menu">Components</span>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link sidebar-link" href="/new">
                <i data-feather="plus-square" className="feather-icon"></i>
                <span className="hide-menu">New Product</span>
              </a>
            </li>
            {/* <li className="sidebar-item">
                <a className="sidebar-link sidebar-link" href="/chat">
                  <i data-feather="message-square" className="feather-icon"></i>
                  <span className="hide-menu">Chat</span>
                </a>
              </li> */}
            <li className="sidebar-item">
              <a
                className="sidebar-link sidebar-link"
                href="/signup"
                aria-expanded="false"
              >
                <i data-feather="user-plus" className="feather-icon"></i>
                <span className="hide-menu">Signup</span>
              </a>
            </li>

            <li className="sidebar-item">
              <a
                className="sidebar-link has-arrow"
                href="#"
                aria-expanded="false"
              >
                <i data-feather="bar-chart" className="feather-icon"></i>
                <span className="hide-menu">Chart</span>
              </a>
              <ul
                aria-expanded="false"
                className="collapse first-level base-level-line"
              >
                <li className="sidebar-item">
                  <a href="/weather" className="sidebar-link">
                    <span className="hide-menu">Weather</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="/total-revenue" className="sidebar-link">
                    <span className="hide-menu">Total revenue</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="/bestseller" className="sidebar-link">
                    <span className="hide-menu">Bestseller</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link has-arrow"
                aria-expanded="false"
                href="#"
              >
                <i data-feather="grid" className="feather-icon"></i>
                <span className="hide-menu">Tables</span>
              </a>
              <ul
                aria-expanded="false"
                className="collapse first-level base-level-line"
              >
                <li className="sidebar-item">
                  <a href="/users" className="sidebar-link">
                    <span className="hide-menu">Users</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="/products" className="sidebar-link">
                    <span className="hide-menu">Products</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="/history" className="sidebar-link">
                    <span className="hide-menu">History</span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="list-divider"></li>
          </ul>
          {/* ) : (
          <ul id="sidebarnav">
            <li className="nav-small-cap">
              <span className="hide-menu">Authentication</span>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link sidebar-link"
                href="/login"
                aria-expanded="false"
              >
                <i data-feather="lock" className="feather-icon"></i>
                <span className="hide-menu">Login</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link sidebar-link"
                href="/signup"
                aria-expanded="false"
              >
                <i data-feather="user-plus" className="feather-icon"></i>
                <span className="hide-menu">Signup</span>
              </a>
            </li> */}
          {/* </ul> */}
          {/* )} */}
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
