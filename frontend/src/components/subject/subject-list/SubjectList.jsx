/* eslint-disable eqeqeq */
import React from "react";
import SubjectRow from "./SubjectRow";

const SubjectList = ({ subjectList, onDeleteSubjectHandler }) => {
  return (
    <div className="card mt-3" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="card-body ">
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Abbreviation</th>
              <th>Type</th>
              <th>Subject Faculty</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjectList.length > 0 ? subjectList.map((subject, index) => <SubjectRow key={index} subject={subject} index={index} onDeleteSubjectHandler={onDeleteSubjectHandler} />) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectList;
