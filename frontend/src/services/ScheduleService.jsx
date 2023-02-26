/* eslint-disable eqeqeq */
import { DAYS_OBJECT, DAY_LIST } from "../components/create-schedule/DATA";
import axios from "../config/axios";

const getFormattedSchedule = (schedule) => {
  let formattedSchedule = {
    title: schedule.title,
    class: schedule.class,
    monday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null },
    tuesday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null },
    wednesday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null },
    thursday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null },
    friday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null },
    saturday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null }
  };

  DAY_LIST.forEach((day) => {
    let formattedLectures = [];
    let formattedPracticals = [];
    schedule[DAYS_OBJECT[day.id]].lectures.forEach((lectureItem) => {
      formattedLectures.push({
        subject: lectureItem.subjectId,
        startTime: lectureItem.startTime,
        endTime: lectureItem.endTime
      });
    });
    schedule[DAYS_OBJECT[day.id]].practicals.forEach((practicalItem) => {
      formattedPracticals.push({
        subject: practicalItem.subjectId,
        startTime: practicalItem.startTime,
        endTime: practicalItem.endTime,
        batch: practicalItem.batch.id
      });
    });
    if (schedule[DAYS_OBJECT[day.id]].lunchBreak != null) {
      formattedSchedule[DAYS_OBJECT[day.id]].lunchBreak = {
        startTime: schedule[DAYS_OBJECT[day.id]].lunchBreak.startTime,
        endTime: schedule[DAYS_OBJECT[day.id]].lunchBreak.endTime
      };
    }
    if (schedule[DAYS_OBJECT[day.id]].shortBreak != null) {
      formattedSchedule[DAYS_OBJECT[day.id]].shortBreak = {
        startTime: schedule[DAYS_OBJECT[day.id]].shortBreak.startTime,
        endTime: schedule[DAYS_OBJECT[day.id]].shortBreak.endTime
      };
    }
    formattedSchedule[DAYS_OBJECT[day.id]].lectures = formattedLectures;
    formattedSchedule[DAYS_OBJECT[day.id]].practicals = formattedPracticals;
  });

  return formattedSchedule;
};

export const createSchedule = async (schedule) => {
  const formattedSchedule = getFormattedSchedule(schedule);
  console.log(formattedSchedule);
  try {
    const response = await axios.post(`/schedule`, JSON.stringify(formattedSchedule), {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getSchedule = async (classId) => {
  try {
    const response = await axios.get(`/schedule/${classId}`);
    if (response.status == 200) {
      const sortedSchedule = getSortedSchedule(response.data);
      return sortedSchedule;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getSortedSchedule = (data) => {
  let sortedSchedule = {
    title: data[0].title,
    class: data[0].class,
    lectures: []
  };

  DAY_LIST.forEach((day) => {
    // Sorting Lectures with time
    const sortedLectures = data[0][DAYS_OBJECT[day.id]].lectures.sort((lecture1, lecture2) => {
      return new Date(lecture1.startTime).getTime() - new Date(lecture2.startTime).getTime();
    });
    const sortedPracticals = data[0][DAYS_OBJECT[day.id]].practicals.sort((lecture1, lecture2) => {
      return new Date(lecture1.startTime).getTime() - new Date(lecture2.startTime).getTime();
    });
    let formattedLectures = [];
    // Formatting Lectures
    sortedLectures.forEach((lecture) => {
      const formattedLecture = {
        id: `${lecture.subject.abbreviation}${Math.floor(Math.random() * 100000)}`,
        title: `${lecture.subject.title}`,
        startDate: getFormattedTime(day.id, lecture.startTime),
        endDate: getFormattedTime(day.id, lecture.endTime),
        faculty: {
          firstName: `${lecture.subject.faculty.firstName}`,
          lastName: `${lecture.subject.faculty.lastName}`,
          abbreviation: `${lecture.subject.faculty.abbreviation}`
        }
      };
      formattedLectures.push(formattedLecture);
    });

    // let groupingPracticals = {
    //   timeSlots: new Set()
    //   // practicals: {}
    // };
    let timeSlots = new Set();

    sortedPracticals.forEach((practical) => {
      timeSlots.add(getTimeSlot(practical.startTime));
    });

    timeSlots.forEach((timeSlot) => {
      let practicals = [];
      const formattedPractical = {
        id: `${Math.floor(Math.random() * 100000)}`,
        title: [],
        startDate: null,
        endDate: null
      };
      sortedPracticals.forEach((practical) => {
        if (timeSlot == getTimeSlot(practical.startTime)) {
          practicals.push(`${practical.batch.title}-${practical.subject.title}`);
          formattedPractical.startDate = getFormattedTime(day.id, practical.startTime);
          formattedPractical.endDate = getFormattedTime(day.id, practical.endTime);
        }
      });
      // console.log(Array.isArray(""));

      formattedPractical.title = practicals;
      formattedLectures.push(formattedPractical);
    });
    // console.log(practicals);

    // sortedPracticals.forEach((practical) => {
    //   const formattedPractical = {
    //     id: `${practical.subject.abbreviation}${Math.floor(Math.random() * 100000)}`,
    //     title: `${practical.batch.title}-${practical.subject.title}`,
    //     startDate: getFormattedTime(day.id, practical.startTime),
    //     endDate: getFormattedTime(day.id, practical.endTime)
    //   };
    //   formattedLectures.push(formattedPractical);
    // });

    let formattedBreak = {
      id: "",
      title: "",
      startDate: "",
      endDate: ""
    };
    // Formatting Lunch Break
    if (data[0][DAYS_OBJECT[day.id]].lunchBreak != null) {
      formattedBreak = {
        id: `lunchBreak${Math.floor(Math.random() * 100000)}`,
        title: "Lunch Break",
        startDate: getFormattedTime(day.id, data[0][DAYS_OBJECT[day.id]].lunchBreak.startTime),
        endDate: getFormattedTime(day.id, data[0][DAYS_OBJECT[day.id]].lunchBreak.endTime)
      };
      formattedLectures.push(formattedBreak);
    }
    // Formatting Short Break
    if (data[0][DAYS_OBJECT[day.id]].shortBreak != null) {
      formattedBreak = {
        id: `shortBreak${Math.floor(Math.random() * 100000)}`,
        title: "Short Break",
        startDate: getFormattedTime(day.id, data[0][DAYS_OBJECT[day.id]].shortBreak.startTime),
        endDate: getFormattedTime(day.id, data[0][DAYS_OBJECT[day.id]].shortBreak.endTime)
      };
      formattedLectures.push(formattedBreak);
    }
    // Adding formatted Lectures to array
    sortedSchedule.lectures = [...sortedSchedule.lectures, ...formattedLectures];
  });
  return sortedSchedule;
};

const getTimeSlot = (time) => {
  const d = new Date(time);
  return `${d.getHours()}:${d.getMinutes()}`;
};

const getFormattedTime = (dayId, time) => {
  const currentWeek = getCurrentWeek();
  const date = new Date(currentWeek[dayId].getFullYear(), currentWeek[dayId].getMonth(), currentWeek[dayId].getDate(), new Date(time).getHours(), new Date(time).getMinutes(), 0);
  return date;
};

const getCurrentWeek = () => {
  let curr = new Date();
  let week = [];

  for (let i = 1; i <= 6; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first));
    week.push(day);
  }
  return week;
};
