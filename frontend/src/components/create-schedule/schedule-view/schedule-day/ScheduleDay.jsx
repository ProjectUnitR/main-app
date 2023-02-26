import React from "react";
import ScheduleDayCell from "./schedule-day-cell/ScheduleDayCell";
import ScheduleLectureTile from "./schedule-lecture-list/ScheduleLectureTile";
import ScheduleBreakTile from "./schedule-lecture-list/ScheduleBreakTile";

const ScheduleDay = ({ day, lecturesList, practicalsList, onRemoveLecture, onRemovePractical, shortBreak, lunchBreak }) => {
  return (
    <div className="col-2">
      <ScheduleDayCell day={day} />
      {/* <ScheduleLectureTile lecture={null} /> */}
      {lecturesList.length > 0 ? <div>Lectures:</div> : null}
      {lecturesList.length > 0 ? lecturesList.map((lecture) => <ScheduleLectureTile lecture={lecture} onRemove={onRemoveLecture} />) : null}
      {practicalsList.length > 0 ? <div>Practicals:</div> : null}
      {practicalsList.length > 0 ? practicalsList.map((practical) => <ScheduleLectureTile lecture={practical} onRemove={onRemovePractical} />) : null}
      {lunchBreak != null || shortBreak != null ? <div>Breaks:</div> : null}
      {lunchBreak != null ? <ScheduleBreakTile breakInfo={lunchBreak} /> : null}
      {shortBreak != null ? <ScheduleBreakTile breakInfo={shortBreak} /> : null}
    </div>
  );
};

export default ScheduleDay;
