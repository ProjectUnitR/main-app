/* eslint-disable eqeqeq */
import React from "react";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
const logo = require("./pccoer-logo.webp");

function Navbar() {
  const authCtx = useAuth(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="logo" className="d-inline-block align-top" width="40" height="40" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {/* <li className="nav-item text-center mx-2 mx-lg-1">
            <a className="nav-link active" aria-current="page" href="#!">
              <div>
                <i className="fas fa-home fa-lg mb-1"></i>
              </div>
              Home
            </a>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" href="/timetable">
              Timetable
            </a>
          </li> */}
          {authCtx.role == "super-admin" ? (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Actions
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/create-schedule">
                  Create Schedule
                </a>
                <a className="dropdown-item" href="/subject">
                  Add Subject
                </a>
                <a className="dropdown-item" href="/">
                  Add User
                </a>
                <a className="dropdown-item" href="/class">
                  Add Class
                </a>
                <a className="dropdown-item" href="/faculty">
                  Add Faculty
                </a>
              </div>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
