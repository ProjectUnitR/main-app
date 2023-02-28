/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import AddSubjectForm from "./add-subject-form/AddSubjectForm";
// import "./AddSubject.css";
import SubjectList from "./subject-list/SubjectList";
import { getAllSubjects, addSubject, deleteSubject } from "../../services/SubjectService";
import { getBranches } from "../../services/BranchService";
import { Toastify } from "../../utils/Toastify";

function Subject() {
  const [subjectList, setSubjectList] = useState([]);
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    // getAllSubjects().then((subjects) => {
    //   setSubjectList(subjects);
    // });
    reloadSubjects();
    getBranches().then((branches) => {
      if (branches.length <= 0) {
        Toastify("Couldn't load branches");
      }
      setBranchList(branches);
    });
  }, []);

  const onAddSubjectHandler = (subject) => {
    addSubject(subject).then((result) => {
      if (result) {
        reloadSubjects();
      } else {
        Toastify("Couldn't add a new subject");
      }
    });
  };

  const onDeleteSubjectHandler = (subjectId) => {
    deleteSubject(subjectId).then((result) => {
      if (result) {
        reloadSubjects();
      } else {
        Toastify("Couldn't delete the subject");
      }
    });
  };

  const reloadSubjects = () => {
    getAllSubjects().then((subjects) => {
      if (subjects.length <= 0) {
        Toastify("Couldn't load subjects");
      }
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
