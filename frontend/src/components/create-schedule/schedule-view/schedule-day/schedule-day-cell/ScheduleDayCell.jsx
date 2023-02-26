import React from "react";

const ScheduleDayCell = ({ day }) => {
  return (
    <div className="row">
      <div className="col-12 border text-center">{day.toUpperCase()}</div>
    </div>
  );
};

export default ScheduleDayCell;
