/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import AddSubjectForm from "./add-subject-form/AddSubjectForm";
// import "./AddSubject.css";
import SubjectList from "./subject-list/SubjectList";
import { getAllSubjects, addSubject, deleteSubject } from "../../services/SubjectService";
import { getBranches } from "../../services/BranchService";

function Subject() {
  const [subjectList, setSubjectList] = useState([]);
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    // getAllSubjects().then((subjects) => {
    //   setSubjectList(subjects);
    // });
    reloadSubjects();
    getBranches().then((branches) => {
      setBranchList(branches);
    });
  }, []);

  const onAddSubjectHandler = (subject) => {
    addSubject(subject).then((result) => {
      if (result) {
        reloadSubjects();
      } else {
        alert("Problem occurred while adding new subject");
      }
    });
  };

  const onDeleteSubjectHandler = (subjectId) => {
    deleteSubject(subjectId).then((result) => {
      if (result) {
        reloadSubjects();
      } else {
        alert("Problem occurred while adding new subject");
      }
    });
  };

  const reloadSubjects = () => {
    getAllSubjects().then((subjects) => {
      setSubjectList(subjects);
    });
  };

  return (
    <div className="container-fluid">
      <AddSubjectForm branchList={branchList} onAddSubjectHandler={onAddSubjectHandler} />
      <SubjectList subjectList={subjectList} onDeleteSubjectHandler={onDeleteSubjectHandler} />
    </div>
  );
}

export default Subject;
