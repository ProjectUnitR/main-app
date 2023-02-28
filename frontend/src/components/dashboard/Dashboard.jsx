import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
const logo = require("../navbar/pccoer-logo.webp");

const COLOR_PALETTE = {
  primary: "#05445E", //0, 0, 128
  secondary: "#189AB4", //4, 118, 208
  primaryLight: "#75E6DA", //13, 152, 186
  secondaryLight: "#D4F1F4" //137, 207, 240
};

function Dashboard() {
  return (
    <div
      className="container-fluid justify-content-center w-100 m-0 p-0"
      style={{
        height: `${window.innerHeight - 70}px`,
        backgroundImage: `url("https://www.pccoer.com/images/pccoer-logo.png")`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: `${window.innerHeight - 70}px`,
          backgroundColor: "rgb(4, 118, 208,0.90)"
        }}
      >
        <Link to="/timetable" style={{ cursor: "pointer", textDecoration: "none", textDecorationLine: "none", borderWidth: "15px" }}>
          <div className="border px-5 py-2 rounded-pill text-center text-dark border-dark badge-light">
            {/* <a href="/timetable" style={{ textDecoration: "none" }}> */}
            Go To Schedule <i className="bi bi-arrow-right"></i>
            {/* </a> */}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
