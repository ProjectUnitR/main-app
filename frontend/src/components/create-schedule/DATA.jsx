export const YEAR_LIST = [
  { _id: "FE", title: "FE" },
  { _id: "SE", title: "SE" },
  { _id: "TE", title: "TE" },
  { _id: "BE", title: "BE" }
];

export const DAY_LIST = [
  { id: 0, title: "Monday" },
  { id: 1, title: "Tuesday" },
  { id: 2, title: "Wednesday" },
  { id: 3, title: "Thursday" },
  { id: 4, title: "Friday" },
  { id: 5, title: "Saturday" }
];

export const BRANCH_LIST = [
  { id: 0, title: "Computer" },
  { id: 1, title: "Entc" },
  { id: 2, title: "Mech" },
  { id: 3, title: "Civil" },
  { id: 4, title: "IT" }
];

export const CLASSES_LIST = [
  { id: 0, title: "FE-A", branch: 0, year: "FE", division: "A" },
  { id: 1, title: "SE-A", branch: 0, year: "SE", division: "A" },
  { id: 2, title: "TE-A", branch: 0, year: "TE", division: "A" },
  { id: 3, title: "BE-A", branch: 0, year: "BE", division: "A" },
  { id: 4, title: "FE-A", branch: 1, year: "FE", division: "A" },
  { id: 5, title: "SE-A", branch: 1, year: "SE", division: "A" },
  { id: 6, title: "TE-A", branch: 1, year: "TE", division: "A" },
  { id: 7, title: "BE-A", branch: 1, year: "BE", division: "A" }
];

export const SUBJECT_LIST = [
  { id: 0, title: "IT Fundamentals", abbreviation: "IT", type: "Theory", branch: 0, year: "FE" },
  { id: 1, title: "Data Structures and Algorithms", abbreviation: "DSA", type: "Theory", branch: 0, year: "SE" },
  { id: 2, title: "Theory of Computation", abbreviation: "TOC", type: "Theory", branch: 0, year: "TE" },
  { id: 3, title: "Artificial Intelligence", abbreviation: "AI", type: "Theory", branch: 0, year: "BE" },
  { id: 4, title: "Physics", abbreviation: "PHYSICS", type: "Theory", branch: 1, year: "FE" },
  { id: 5, title: "Maths 3", abbreviation: "M3", type: "Theory", branch: 1, year: "SE" },
  { id: 6, title: "Digital Electronics", abbreviation: "DE", type: "Theory", branch: 1, year: "TE" },
  { id: 6, title: "Image Signal Processing", abbreviation: "ISP", type: "Theory", branch: 1, year: "BE" }
];

export const SCHEDULE_INITIAL_STATE = {
  title: "",
  class: "",
  monday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null },
  tuesday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null },
  wednesday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null },
  thursday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null },
  friday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null },
  saturday: { lectures: [], practicals: [], lunchBreak: null, shortBreak: null }
};

export const DAYS_OBJECT = {
  0: "monday",
  1: "tuesday",
  2: "wednesday",
  3: "thursday",
  4: "friday",
  5: "saturday"
};
