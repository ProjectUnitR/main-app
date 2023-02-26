/* eslint-disable eqeqeq */
import React from "react";

const ClassRow = ({ classInfo, onDeleteClassHandler, index }) => {
  const onDeleteHandler = () => {
    onDeleteClassHandler(classInfo._id);
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="d-flex align-items-center">
          <div className="ms-3">
            <p className="fw-bold mb-1">{classInfo.branch.title}</p>
          </div>
        </div>
      </td>
      <td>
        <span
          className={`badge ${classInfo.year == "FE" ? "badge-success" : ""} ${classInfo.year == "SE" ? "badge-primary" : ""} ${classInfo.year == "TE" ? "badge-warning" : ""} ${
            classInfo.year == "BE" ? "badge-dark" : ""
          } rounded d-inline`}
          style={{ fontSize: "15px" }}
        >
          {classInfo.year}
        </span>
      </td>

      <td>{classInfo.division}</td>
      <td>
        <button type="button" className="btn btn-danger rounded btn-md fw-bold" onClick={onDeleteHandler}>
          <i className="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  );
};

export default ClassRow;
