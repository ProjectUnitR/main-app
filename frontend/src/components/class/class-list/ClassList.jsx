import React from "react";
import ClassRow from "./ClassRow";

const ClassList = ({ classList, onDeleteClassHandler }) => {
  return (
    <div className="card mt-3" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="card-body ">
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>No.</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Division</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{classList.length > 0 ? classList.map((classItem, index) => <ClassRow key={index} classInfo={classItem} index={index} onDeleteSubjectHandler={onDeleteClassHandler} />) : null}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassList;
