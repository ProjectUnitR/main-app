import React from "react";
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
        style={{
          height: `${window.innerHeight - 70}px`,
          backgroundColor: "rgb(4, 118, 208,0.90)"
        }}
      ></div>
    </div>
  );
}

export default Dashboard;
