import React from "react";

const FacultyRow = ({ faculty, onDeleteFacultyHandler, index }) => {
  const onDeleteHandler = () => {
    onDeleteFacultyHandler(faculty._id);
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="d-flex align-items-center">
          <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt="" style={{ width: "45px", height: "45px" }} className="rounded-circle mr-4" />
          <div className="ms-3">
            <p className="fw-bold mb-1">
              {faculty.firstName} {faculty.lastName}
            </p>
            <p className="text-muted mb-0">{faculty.abbreviation}</p>
          </div>
        </div>
      </td>
      <td>
        <span className={`badge badge-primary rounded-pill d-inline`}>{faculty.branch.title}</span>
      </td>
      <td>
        <button type="button" className="btn btn-danger rounded btn-md fw-bold" onClick={onDeleteHandler}>
          <i className="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  );
};

export default FacultyRow;
