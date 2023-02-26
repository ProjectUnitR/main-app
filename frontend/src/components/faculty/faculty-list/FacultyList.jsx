import React from "react";
import FacultyRow from "./FacultyRow";

function FacultyList({ facultyList, onDeleteFacultyHandler }) {
  return (
    <div className="card mt-3" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="card-body ">
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>No.</th>
              <th>Name</th>
              {/* <th>Abbreviation</th> */}
              <th>Branch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.length > 0 ? facultyList.map((faculty, index) => <FacultyRow key={index} faculty={faculty} index={index} onDeleteFacultyHandler={onDeleteFacultyHandler} />) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FacultyList;
