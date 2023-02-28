/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getSchedule } from "../services/ScheduleService";
import { Toastify } from "../utils/Toastify";
import AuthContext from "./AuthContext";

const ScheduleContext = createContext({
  schedule: {},
  currentLecture: {},
  setSchedule: () => {}
});

export const ScheduleContextProvider = (props) => {
  const msg = new SpeechSynthesisUtterance();
  const authCtx = useContext(AuthContext);
  const intervalRef = useRef();

  const [scheduleDetails, setScheduleDetails] = useState({
    schedule: null,
    todaysLectures: null,
    currentLecture: null
  });

  useEffect(() => {
    if (scheduleDetails.schedule != null) {
      let timer;
      if (timer == null) {
        timer = setInterval(() => {
          checkLecture();
          // console.log(Math.random());
        }, 30000);
      }
      intervalRef.current = timer;
    }
    return () => clearInterval(intervalRef.current);
  }, [scheduleDetails]);

  const checkLecture = () => {
    const currentDate = new Date();
    if (scheduleDetails.currentLecture == null) {
      scheduleDetails.todaysLectures.forEach((lecture, index) => {
        const lectureStartDate = new Date(lecture.startDate);
        const lectureEndDate = new Date(lecture.endDate);
        if (lectureStartDate.getTime() <= currentDate.getTime() && lectureEndDate.getTime() > currentDate.getTime()) {
          playAudio(lecture);
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
        if (scheduleDetails.currentLecture.index < scheduleDetails.todaysLectures.length - 1) {
          const nextLecture = scheduleDetails.todaysLectures[scheduleDetails.currentLecture.index + 1];
          playAudio(nextLecture);
          setScheduleDetails((prevState) => {
            return {
              ...prevState,
              currentLecture: {
                index: scheduleDetails.currentLecture.index + 1,
                details: nextLecture
              }
            };
          });
        } else {
          setScheduleDetails((prevState) => {
            return {
              ...prevState,
              currentLecture: null
            };
          });
        }
      }
    }
  };

  const playAudio = (lecture) => {
    const lectureStartDate = new Date(lecture.startDate);
    const lectureEndDate = new Date(lecture.endDate);
    if (Array.isArray(lecture.title)) {
      msg.text = `Time for Laboratory Practicals from ${lectureStartDate.toLocaleTimeString()} to ${lectureEndDate.toLocaleTimeString()}`;
    } else if (lecture.title.includes("Break")) {
      msg.text = `Time for a ${lecture.title} from ${lectureStartDate.toLocaleTimeString()} to ${lectureEndDate.toLocaleTimeString()}`;
    } else {
      msg.text = `Next lecture is ${lecture.title} from ${lectureStartDate.toLocaleTimeString()} to ${lectureEndDate.toLocaleTimeString()}`;
    }
    window.speechSynthesis.speak(msg);
  };

  const setSchedule = () => {
    getSchedule(authCtx.class).then((result) => {
      if (result != null) {
        const todaysLectures = getTodaysLectures(result.lectures);
        setScheduleDetails((prevState) => {
          return { ...prevState, schedule: result, todaysLectures: todaysLectures };
        });
      } else {
        Toastify("Couldn't load the schedule");
      }
    });
  };

  const getTodaysLectures = (lectures) => {
    const todaysDate = new Date();
    let todaysLectures = [];
    if (lectures != null) {
      lectures.forEach((lecture) => {
        if (lecture.startDate.getDate() == todaysDate.getDate()) {
          todaysLectures.push(lecture);
        }
      });
      todaysLectures = todaysLectures.sort((lecture1, lecture2) => {
        return new Date(lecture1.startDate).getTime() - new Date(lecture2.startDate).getTime();
      });
    }
    return todaysLectures;
  };

  const contextValue = {
    schedule: scheduleDetails.schedule,
    currentLecture: scheduleDetails.currentLecture,
    setSchedule: setSchedule
  };

  return <ScheduleContext.Provider value={contextValue}>{props.children}</ScheduleContext.Provider>;
};

export default ScheduleContext;
