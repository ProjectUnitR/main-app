// var date = moment.utc("2016-09-19", "YYYY-MM-DD");
// date.add(1, 'month'); // date operations follow date-math logic
// var s = date.format("YYYY-MM-DD");

// const s = new Date();
// // s.setDate(8);
// // s.setMonth(1);
// // s.setFullYear(2023);
// // s.setHours(9);
// // s.setMinutes(30);
// console.log(s.toTimeString("HH:MM"));

// let obj = {
//   title: "te"
// };

// obj = {
//   ...obj,
//   name: "tejas"
// };

// console.log(obj.title != null);
// console.log(obj.name != null);
let startDate = new Date(2023, 01, 01, 9, 30);
let endDate = new Date(2023, 01, 01, 9, 30);

// console.log(startDate.toLocaleTimeString().slice(0, 5) == endDate.toLocaleTimeString().slice(0, 5));
// console.log(endDate.toLocaleTimeString().slice(0, 5));
// console.log(endDate.getHours());

let arrayyy = new Set();
arrayyy.add("10:10");
arrayyy.add("11:10");
arrayyy.add("10:10");
arrayyy.add(1);

arrayyy.forEach((item) => console.log(item));
// console.log(arrayyy);
// console.log(startDate.getF);
// console.log(startDate.toLocaleTimeString());
// console.log(endDate.getTime());
// console.log(endDate.toLocaleTimeString());
// console.log(startDate.getTime() < endDate.getTime());
