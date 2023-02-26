/* eslint-disable eqeqeq */
import React from "react";

const SubjectRow = ({ subject, onDeleteSubjectHandler, index }) => {
  const onDeleteHandler = () => {
    onDeleteSubjectHandler(subject._id);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="d-flex align-items-center">
          <div className="ms-3">
            <p className="fw-bold mb-1">{subject.title}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">{subject.abbreviation}</p>
      </td>
      <td>
        <span className={`badge ${subject.type == "Theory" ? "badge-warning" : "badge-primary"} rounded-pill d-inline`}>{subject.type}</span>
      </td>
      <td>{subject.faculty != null ? `Prof. ${subject.faculty.firstName} ${subject.faculty.lastName}` : `-`}</td>
      <td>{subject.branch.title}</td>
      <td>{subject.year}</td>
      <td>
        <button type="button" className="btn btn-danger rounded btn-md fw-bold" value={subject.title} onClick={onDeleteHandler}>
          <i className="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  );
};

export default SubjectRow;
