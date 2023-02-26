/* eslint-disable eqeqeq */
import React from "react";
import { getTime } from "../../../../../utils/Time";

const ScheduleBreakTile = ({ breakInfo }) => {
  // const getStartTime = () => {
  //   return `${breakInfo.startTime.toLocaleTimeString().slice(0, 4)} ${breakInfo.startTime.toLocaleTimeString().slice(8)}`;
  // };

  // const getEndTime = () => {
  //   return `${breakInfo.endTime.toLocaleTimeString().slice(0, 4)} ${breakInfo.endTime.toLocaleTimeString().slice(8)}`;
  // };

  return (
    <div className="row mt-1 mx-1 rounded " style={{ backgroundColor: "#eee", border: "2px solid #64B5F6" }}>
      <div className="col-12 border-right">
        <div className="row border-bottom">
          <div className="col-12" style={{ fontSize: "15px" }}>
            {breakInfo.id == "lunchBreak" ? "Lunch Break" : "Short Break"}
          </div>
        </div>
        <div className="row">
          <div className="col-12" style={{ fontSize: "12px" }}>
            {getTime(breakInfo.startTime)} - {getTime(breakInfo.endTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleBreakTile;
