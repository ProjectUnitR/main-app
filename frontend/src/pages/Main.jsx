import React from "react";
import Navbar from "../components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <ToastContainer theme="colored" position="top-left" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default Main;
