import React, { useEffect, useState } from "react";
import { getBranches } from "../../services/BranchService";
import { addFaculty, deleteFaculty, getAllFaculties } from "../../services/FacultyService";
import AddFacultyForm from "./add-faculty-form/AddFacultyForm";
import FacultyList from "./faculty-list/FacultyList";

const Faculty = () => {
  const [facultyList, setFacultyist] = useState([]);
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    reloadFaculties();
    getBranches().then((branches) => {
      setBranchList(branches);
    });
  }, []);

  const onAddFacultyHandler = (faculty) => {
    addFaculty(faculty).then((result) => {
      if (result) {
        reloadFaculties();
      } else {
        alert("Problem occurred while adding new subject");
      }
    });
  };

  const onDeleteFacultyHandler = (facultyId) => {
    deleteFaculty(facultyId).then((result) => {
      if (result) {
        reloadFaculties();
      } else {
        alert("Problem occurred while adding new subject");
      }
    });
  };

  const reloadFaculties = () => {
    getAllFaculties().then((faculties) => {
      setFacultyist(faculties);
    });
  };

  return (
    <div className="container-fluid">
      <AddFacultyForm branchList={branchList} onAddFacultyHandler={onAddFacultyHandler} />
      <FacultyList facultyList={facultyList} onDeleteFacultyHandler={onDeleteFacultyHandler} />
    </div>
  );
};

export default Faculty;
