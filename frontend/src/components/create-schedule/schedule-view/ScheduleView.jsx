import React from "react";
import ScheduleDay from "./schedule-day/ScheduleDay";
import { DAYS_OBJECT, DAY_LIST } from "../DATA";

const ScheduleView = ({ schedule, subjectList, onRemoveLecture, onRemovePractical }) => {
  return (
    <div className="row mt-3">
      {DAY_LIST.map((day) => {
        return (
          <ScheduleDay
            key={day.id}
            lecturesList={schedule[DAYS_OBJECT[day.id]].lectures}
            practicalsList={schedule[DAYS_OBJECT[day.id]].practicals}
            lunchBreak={schedule[DAYS_OBJECT[day.id]].lunchBreak}
            shortBreak={schedule[DAYS_OBJECT[day.id]].shortBreak}
            onRemoveLecture={onRemoveLecture}
            onRemovePractical={onRemovePractical}
            subjectList={subjectList}
            day={DAYS_OBJECT[day.id]}
          />
        );
      })}
    </div>
  );
};

export default ScheduleView;
