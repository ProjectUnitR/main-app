import React from "react";
import { getTime } from "../../../../../utils/Time";

const ScheduleLectureTile = ({ lecture, onRemove }) => {
  const onRemoveHandler = () => {
    onRemove(lecture.id, lecture.day);
  };

  return (
    <div className="row mt-1 mx-1 rounded " style={{ backgroundColor: "#eee", border: "2px solid #64B5F6" }}>
      <div className="col-9 border-right">
        <div className="row border-bottom">
          <div className="col-12" style={{ fontSize: "15px" }}>
            {lecture.batch != null ? `${lecture.batch.title}-` : null}
            {lecture.subjectAbbreviation}
          </div>
        </div>
        <div className="row">
          <div className="col-12" style={{ fontSize: "12px" }}>
            {getTime(lecture.startTime)} - {getTime(lecture.endTime)}
          </div>
        </div>
      </div>
      <div className="col-3 align-self-center">
        <i className="bi bi-x-circle-fill " onClick={onRemoveHandler} style={{ color: "#ff5b4f", fontSize: "20px" }}></i>
      </div>
    </div>
  );
};

export default ScheduleLectureTile;
