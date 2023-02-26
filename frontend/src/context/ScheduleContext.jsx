import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getSchedule } from "../services/ScheduleService";
import AuthContext from "./AuthContext";

const ScheduleContext = createContext({
  schedule: {},
  currentLecture: {},
  setSchedule: () => {}
});

export const ScheduleContextProvider = (props) => {
  const msg = new SpeechSynthesisUtterance();
  // msg.text = "Next lecture is Data structures and Algorithms";
  const authCtx = useContext(AuthContext);
  const intervalRef = useRef();

  const [scheduleDetails, setScheduleDetails] = useState({
    schedule: null,
    currentLecture: null
  });

  useEffect(() => {
    // currentRef.current = current;
  });

  useEffect(() => {
    // const timer = setInterval(() => {
    //   console.log(Math.random());
    //   checkLecture();
    //   // window.speechSynthesis.speak(msg);
    // }, 10000);
    // intervalRef.current = timer;
    // return () => clearInterval(intervalRef.current);
  }, [scheduleDetails]);

  const checkLecture = () => {
    const currentDate = new Date();
    if (scheduleDetails.currentLecture != null) {
      scheduleDetails.schedule.lectures.forEach((lecture, index) => {
        const lectureStartDate = new Date(lecture.startDate);
        const lectureEndDate = new Date(lecture.endDate);
        if (lectureStartDate.getTime() >= currentDate.getTime() && lectureEndDate.getTime() < currentDate.getTime()) {
          setScheduleDetails((prevState) => {
            return {
              ...prevState,
              currentLecture: {
                index: index,
                details: lecture
              }
            };
          });
        }
      });
    } else {
      if (scheduleDetails.currentLecture.details.endDate.getTime() < currentDate.getTime()) {
        console.log("Change Lecture");
        if (scheduleDetails.currentLecture.index < scheduleDetails.schedule.lectures.length - 1) {
          const nextLecture = scheduleDetails.schedule.lectures[scheduleDetails.currentLecture.index + 1];
          setScheduleDetails((prevState) => {
            return {
              ...prevState,
              currentLecture: {
                index: scheduleDetails.currentLecture.index + 1,
                details: nextLecture
              }
            };
          });
        }
      } else {
        setScheduleDetails((prevState) => {
          return {
            ...prevState,
            currentLecture: null
          };
        });
      }
    }
  };

  const setSchedule = () => {
    getSchedule(authCtx.class).then((result) => {
      if (result != null) {
        setScheduleDetails((prevState) => {
          return { ...prevState, schedule: result };
        });
      }
    });
  };

  const contextValue = {
    schedule: scheduleDetails.schedule,
    currentLecture: scheduleDetails.currentLecture,
    setSchedule: setSchedule
  };

  return <ScheduleContext.Provider value={contextValue}>{props.children}</ScheduleContext.Provider>;
};

export default ScheduleContext;
