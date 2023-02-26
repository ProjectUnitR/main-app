import React, { useEffect, useState } from "react";
import { getBranches } from "../../services/BranchService";
import { addClass, getAllClasses } from "../../services/ClassService";
import AddClassForm from "./add-class-form/AddClassForm";
import ClassList from "./class-list/ClassList";

const Class = () => {
  const [classList, setClassList] = useState([]);
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    // getAllClasses().then((subjects) => {
    //   setClassList(subjects);
    // });
    // reloadSubjects();
    reloadClasses();
    getBranches().then((branches) => {
      setBranchList(branches);
    });
  }, []);

  const onAddClassHandler = (newClass) => {
    addClass(newClass).then((result) => {
      if (result) {
        reloadClasses();
      } else {
        alert("Problem occurred while adding new subject");
      }
    });
  };

  const onDeleteClassHandler = (classId) => {};

  const reloadClasses = () => {
    getAllClasses().then((subjects) => {
      setClassList(subjects);
    });
  };

  return (
    <div className="container-fluid">
      <AddClassForm branchList={branchList} onAddClassHandler={onAddClassHandler} />
      <ClassList classList={classList} onDeleteClassHandler={onDeleteClassHandler} />
    </div>
  );
};

export default Class;
