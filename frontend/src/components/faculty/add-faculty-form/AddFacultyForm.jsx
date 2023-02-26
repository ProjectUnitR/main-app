/* eslint-disable eqeqeq */
import React from "react";
import { useRef } from "react";

const AddFacultyForm = ({ branchList, onAddFacultyHandler }) => {
  const branchRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const abbrRef = useRef();

  const onAddHandler = () => {
    if (branchRef.current.value != -1 && firstNameRef.current.value != "" && lastNameRef.current.value != "" && abbrRef.current.value != "") {
      const faculty = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        abbreviation: abbrRef.current.value,
        branch: branchRef.current.value
      };
      onAddFacultyHandler(faculty);
    }
  };

  return (
    <div className="card mt-3" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="card-body ">
        <div className="row justify-content-center">
          <div className="form-group col-md-2">
            <select ref={branchRef} className="form-control rounded" aria-label="Default select example" defaultValue={-1}>
              <option value={-1} hidden disabled>
                Select Branch
              </option>
              {branchList.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-2">
            <input ref={firstNameRef} type="text" className="form-control rounded" name="firstName" placeholder="First Name" />
          </div>
          <div className="form-group col-md-2">
            <input ref={lastNameRef} type="text" className="form-control rounded" name="lastName" placeholder="Last Name" />
          </div>
          <div className="form-group col-md-2">
            <input ref={abbrRef} type="text" className="form-control rounded" name="abbreviation" placeholder="Faculty Abbreviation" />
          </div>
          <div className="form-group col-md-1">
            <button type="submit" className="btn btn-success rounded" onClick={onAddHandler}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFacultyForm;
