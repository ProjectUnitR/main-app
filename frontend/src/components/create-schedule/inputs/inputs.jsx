/* eslint-disable eqeqeq */
import React, { useState } from "react";
import SelectInput from "./SelectInput";

const Inputs = ({ states, references, handlers, selectOptionsLists }) => {
  const [submitted, setSubmitted] = useState(false);

  const onSubmitHandler = () => {
    if (submitted == false) {
      const isValid = handlers.onSubmit();
      if (isValid) {
        setSubmitted((prev) => !prev);
      }
    } else {
      handlers.onReset();
      setSubmitted((prev) => !prev);
    }
  };

  return (
    <div className="card mt-3" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="card-body ">
        <div className="row justify-content-center">
          <div className="form-group col-md-3">
            <input disabled={submitted} type="text" ref={references.titleRef} className="form-control rounded" name="title" placeholder="Title" />
          </div>
          <div className="form-group col-md-3">
            <SelectInput state={states.branchState} submitted={submitted} title="Branch" options={selectOptionsLists.branchList} handler={handlers.onBranchChange} />
          </div>
          <div className="form-group col-md-2">
            <SelectInput state={states.yearState} submitted={submitted} title="Year" options={selectOptionsLists.yearList} handler={handlers.onYearChange} />
          </div>
          <div className="form-group col-md-2">
            <SelectInput state={states.classState} submitted={submitted} title="Class" options={selectOptionsLists.classList} handler={handlers.onClassChange} />
          </div>
          <div className="form-group col-md-1 align-self-center ">
            <button className={`btn rounded-pill ${submitted ? "btn-danger" : "btn-success"}`} onClick={onSubmitHandler}>
              {submitted ? "Reset" : "Submit"}
            </button>
          </div>
        </div>
        {submitted ? (
          <div className="row justify-content-center">
            <div className="form-group col-md-3">
              <label style={{ fontSize: "10px" }}>Select Subject</label>
              <SelectInput state={states.selectedSubject} title="Subject" options={selectOptionsLists.subjectList} handler={handlers.onSubjectChange} />
            </div>
            {states.isPractical ? (
              <div className="form-group col-md-2">
                <label style={{ fontSize: "10px" }}>Select Batch</label>
                <SelectInput title="Batch" options={selectOptionsLists.batchList} reference={references.batchRef} />
              </div>
            ) : null}
            <div className="form-group col-md-2">
              <label style={{ fontSize: "10px" }}>Select Day</label>
              <SelectInput title="Day" options={selectOptionsLists.dayList} reference={references.dayRef} />
            </div>
            <div className="form-group col-md-2">
              <label style={{ fontSize: "10px" }}>Start Time</label>
              <input ref={references.startTimeRef} type="time" className="form-control  rounded" onChange={(e) => {}} />
            </div>
            <div className="form-group col-md-2">
              <label style={{ fontSize: "10px" }}>End Time</label>
              <input ref={references.endTimeRef} type="time" className="form-control rounded" placeholder="endTime" />
            </div>
            <div className="form-group col-md-1 align-self-end">
              <button className="btn btn-primary  rounded-pill font-weight-bold" style={{ fontSize: "15px" }} onClick={handlers.onAddLecture}>
                Add
                {/* <i className="bi bi-plus-lg"></i> */}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Inputs;
