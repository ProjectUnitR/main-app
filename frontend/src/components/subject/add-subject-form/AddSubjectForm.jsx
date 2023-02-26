/* eslint-disable eqeqeq */
import React, { useRef } from "react";

const AddSubjectForm = ({ branchList, onAddSubjectHandler }) => {
  const branchRef = useRef();
  const titleRef = useRef();
  const yearRef = useRef();
  const abbrRef = useRef();
  const typeRef = useRef();

  const onAddHandler = () => {
    if (typeRef.current.value != -1 && titleRef.current.value != "" && yearRef.current.value != "" && abbrRef.current.value != "" && typeRef.current.value != -1) {
      const subject = {
        title: titleRef.current.value,
        abbreviation: abbrRef.current.value,
        type: typeRef.current.value,
        branch: branchRef.current.value,
        year: yearRef.current.value
      };
      onAddSubjectHandler(subject);
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
            <input ref={titleRef} type="text" className="form-control rounded" name="title" placeholder="Subject Name" />
          </div>
          <div className="form-group col-md-2">
            <input ref={abbrRef} type="text" className="form-control rounded" name="abbreviation" placeholder="Subject Abbreviation" />
          </div>
          <div className="form-group col-md-2">
            <select ref={typeRef} className="form-control rounded" aria-label="Default select example" defaultValue={-1}>
              <option value={-1} hidden disabled>
                Select Type
              </option>
              <option value="Theory">Theory</option>
              <option value="Practical">Practical</option>
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

export default AddSubjectForm;
