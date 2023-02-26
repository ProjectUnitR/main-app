import { useContext } from "react";
import ScheduleContext from "../context/ScheduleContext";

const useSchedule = () => {
  // console.log(useContext(AuthContext));
  return useContext(ScheduleContext);
};

export default useSchedule;
