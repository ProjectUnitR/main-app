import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Main from "./pages/Main";
import Subject from "./components/subject/Subject";
import Timetable from "./components/timetable/Timetable";
import CreateSchedule from "./components/create-schedule/CreateSchedule";
import Class from "./components/class/Class";
import Faculty from "./components/faculty/Faculty";
import { ScheduleContextProvider } from "./context/ScheduleContext";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="">
      <Routes>
        <Route exact path="/" element={authCtx.isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <Main>
              <Dashboard />
            </Main>
          }
        />
        <Route
          path="subject"
          element={
            <Main>
              <Subject />
            </Main>
          }
        />
        <Route
          path="class"
          element={
            <Main>
              <Class />
            </Main>
          }
        />
        <Route
          path="faculty"
          element={
            <Main>
              <Faculty />
            </Main>
          }
        />
        <Route
          path="create-schedule"
          element={
            <Main>
              <CreateSchedule />
            </Main>
          }
        />
        <Route
          path="timetable"
          element={
            <ScheduleContextProvider>
              <Timetable />
            </ScheduleContextProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
