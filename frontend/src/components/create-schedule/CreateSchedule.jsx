/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import Inputs from "./inputs/inputs";
import ScheduleView from "./schedule-view/ScheduleView";
import { YEAR_LIST, DAY_LIST, SCHEDULE_INITIAL_STATE } from "./DATA";
// import { getBranches, getClasses, getSubjects } from "../../services/ScheduleServices";
import { getClassesByBranchAndYear } from "../../services/ClassService";
import { getSubjectsByBranchAndYear } from "../../services/SubjectService";
import { createSchedule } from "../../services/ScheduleService";
import { getBranches } from "../../services/BranchService";
import { getBatchesByClass } from "../../services/BatchService";

const CreateSchedule = () => {
  const [schedule, setSchedule] = useState(SCHEDULE_INITIAL_STATE);
  const [branchList, setBranchList] = useState([]);
  const [selectedbranch, setSelectedBranch] = useState(-1);
  const [selectedYear, setSelectedYear] = useState(-1);
  const [selectedClass, setSelectedClass] = useState(-1);
  const [selectedSubject, setSelectedSubject] = useState(-1);
  const [isPractical, setIsPractical] = useState(false);
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const titleRef = useRef("");
  const subjectRef = useRef(-1);
  const batchRef = useRef(-1);
  const dayRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();

  // console.log(batchRef.current.value);

  useEffect(() => {
    getBranches().then((branches) => {
      setBranchList(branches);
    });
    // console.log(batchRef.current.value);
  }, []);

  const onBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const onYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const onClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const onSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    const subject = subjectList.filter((item) => item._id == e.target.value);
    if (subject[0].type == "Practical") {
      setIsPractical(true);
    } else {
      setIsPractical(false);
    }
  };

  const getStartTime = () => {
    const time = new Date();
    time.setHours(startTimeRef.current.value.slice(0, 2));
    time.setMinutes(startTimeRef.current.value.slice(3));

    return time;
  };

  const getEndTime = () => {
    const time = new Date();
    time.setHours(endTimeRef.current.value.slice(0, 2));
    time.setMinutes(endTimeRef.current.value.slice(3));
    time.setSeconds(0);

    return time;
  };

  const onAddLecture = () => {
    // debugger;
    let lecture;
    let breakInfo;
    if (startTimeRef.current.value != "" && endTimeRef.current.value != "") {
      // debugger;
      if (selectedSubject == "lunchBreak" || selectedSubject == "shortBreak") {
        breakInfo = {
          id: "lunchBreak",
          startTime: getStartTime(),
          endTime: getEndTime(),
          title: "Break"
        };
      } else {
        const subject = subjectList.filter((item) => item._id == selectedSubject);
        lecture = {
          id: `${subject[0].abbreviation}${Math.floor(Math.random() * 100000)}`,
          subjectId: selectedSubject,
          subjectName: subject[0].title,
          subjectAbbreviation: subject[0].abbreviation,
          startTime: getStartTime(),
          endTime: getEndTime(),
          day: dayRef.current.value
        };
        if (subject[0].type == "Practical") {
          const batch = batchList.filter((item) => item._id == batchRef.current.value);
          lecture = {
            ...lecture,
            batch: { id: batchRef.current.value, title: batch[0].title }
          };
        }
      }

      if (selectedSubject == "lunchBreak") {
        setSchedule((prev) => {
          return {
            ...prev,
            [dayRef.current.value.toLowerCase()]: { ...prev[[dayRef.current.value.toLowerCase()]], lunchBreak: breakInfo }
          };
        });
      } else if (selectedSubject == "shortBreak") {
        setSchedule((prev) => {
          return {
            ...prev,
            [dayRef.current.value.toLowerCase()]: { ...prev[[dayRef.current.value.toLowerCase()]], shortBreak: breakInfo }
          };
        });
      } else if (lecture.batch != null) {
        setSchedule((prev) => {
          return {
            ...prev,
            [dayRef.current.value.toLowerCase()]: { ...prev[[dayRef.current.value.toLowerCase()]], practicals: [...prev[dayRef.current.value.toLowerCase()].practicals, lecture] }
          };
        });
      } else {
        setSchedule((prev) => {
          return {
            ...prev,
            [dayRef.current.value.toLowerCase()]: { ...prev[[dayRef.current.value.toLowerCase()]], lectures: [...prev[dayRef.current.value.toLowerCase()].lectures, lecture] }
          };
        });
      }
    }
  };

  const onRemoveLecture = (lectureId, lectureDay) => {
    const lectures = schedule[lectureDay.toLowerCase()].lectures.filter((item) => item.id != lectureId);
    setSchedule((prev) => {
      return {
        ...prev,
        [lectureDay.toLowerCase()]: {
          ...prev[lectureDay.toLowerCase()],
          lectures: lectures
        }
      };
    });
  };

  const onRemovePractical = (lectureId, lectureDay) => {
    const practicals = schedule[lectureDay.toLowerCase()].practicals.filter((item) => item.id != lectureId);
    setSchedule((prev) => {
      return {
        ...prev,
        [lectureDay.toLowerCase()]: {
          ...prev[lectureDay.toLowerCase()],
          practicals: practicals
        }
      };
    });
  };

  const onSubmitHandler = () => {
    if (titleRef.current.value != "" && selectedClass != -1 && selectedbranch != -1 && selectedYear != -1) {
      setSchedule((prev) => {
        return {
          ...prev,
          title: titleRef.current.value,
          class: selectedClass
        };
      });
      return true;
    }
    return false;
  };

  const onResetHandler = () => {
    setSchedule(SCHEDULE_INITIAL_STATE);
    setSelectedBranch(-1);
    setSelectedYear(-1);
    setSelectedClass(-1);
    setSelectedSubject(-1);
    setClassList([]);
    setSubjectList([]);
    setBatchList([]);
    titleRef.current.value = "";
  };

  const onFinalSubmitHandler = () => {
    const result = createSchedule(schedule);
  };

  useEffect(() => {
    if (selectedYear != -1 && selectedbranch != -1) {
      getClassesByBranchAndYear(selectedbranch, selectedYear).then((classes) => {
        setClassList(classes);
      });
      getSubjectsByBranchAndYear(selectedbranch, selectedYear).then((subjects) => {
        subjects.push({
          _id: "lunchBreak",
          title: "Lunch Break",
          abbreviation: "Break"
        });
        subjects.push({
          _id: "shortBreak",
          title: "Short Break",
          abbreviation: "Break"
        });
        setSubjectList(subjects);
      });
    }
  }, [selectedbranch, selectedYear]);

  useEffect(() => {
    if (selectedClass != -1) {
      getBatchesByClass(selectedClass).then((batches) => {
        setBatchList(batches);
      });
    }
  }, [selectedClass]);

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  return (
    <div className="container-fluid pr-lg-5 pl-lg-5 pt-lg-2 ">
      <Inputs
        states={{ branchState: selectedbranch, yearState: selectedYear, classState: selectedClass, selectedSubject: selectedSubject, isPractical: isPractical }}
        references={{ titleRef: titleRef, subjectRef: subjectRef, dayRef: dayRef, startTimeRef: startTimeRef, endTimeRef: endTimeRef, batchRef: batchRef }}
        selectOptionsLists={{ branchList: branchList, yearList: YEAR_LIST, classList: classList, subjectList: subjectList, dayList: DAY_LIST, batchList: batchList }}
        handlers={{
          onBranchChange: onBranchChange,
          onSubjectChange: onSubjectChange,
          onClassChange: onClassChange,
          onYearChange: onYearChange,
          onAddLecture: onAddLecture,
          onSubmit: onSubmitHandler,
          onReset: onResetHandler
        }}
      />
      <ScheduleView schedule={schedule} subjectList={subjectList} onRemoveLecture={onRemoveLecture} onRemovePractical={onRemovePractical} />
      <div className="row justify-content-center mt-5">
        <div className="col-md-2">
          <button className="btn btn-primary rounded" onClick={onFinalSubmitHandler}>
            Create Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSchedule;
