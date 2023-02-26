import React from "react";
import Navbar from "../components/navbar/Navbar";

const Main = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};

export default Main;
