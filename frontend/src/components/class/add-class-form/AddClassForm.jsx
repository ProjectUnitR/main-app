/* eslint-disable eqeqeq */
import React, { useRef } from "react";

const AddClassForm = ({ branchList, onAddClassHandler }) => {
  const branchRef = useRef();
  const yearRef = useRef();
  const divisionRef = useRef();

  const onAddHandler = () => {
    if (yearRef.current.value != -1 && branchRef.current.value != -1 && divisionRef.current.value != -1) {
      const newClass = {
        division: divisionRef.current.value,
        branch: branchRef.current.value,
        year: yearRef.current.value
      };
      onAddClassHandler(newClass);
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
            <select ref={yearRef} className="form-control rounded" aria-label="Default select example" defaultValue={-1}>
              <option value={-1} hidden disabled>
                Select Year
              </option>
              <option value="FE">FE</option>
              <option value="SE">SE</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <select ref={divisionRef} className="form-control rounded" aria-label="Default select example" defaultValue={-1}>
              <option value={-1} hidden disabled>
                Select Division
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
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

export default AddClassForm;
