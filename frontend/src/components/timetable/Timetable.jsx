/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, WeekView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";
// import { Scheduler, DayView, WeekView, Appointments, AppointmentForm, CurrentTimeIndicator, AppointmentTooltip, Toolbar, ViewSwitcher } from "@devexpress/dx-react-scheduler-material-ui";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { getTime } from "../../utils/Time";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./Timetable.css";
import { APPOINTMENT_COLORS } from "../../utils/Colors";
import ScheduleContext from "../../context/ScheduleContext";

const Timetable = () => {
  const scheduleContext = useContext(ScheduleContext);

  const handle = useFullScreenHandle();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const msg = new SpeechSynthesisUtterance();
  msg.text = "Next lecture is Data structures and Algorithms";

  useEffect(() => {
    scheduleContext.setSchedule();
  }, []);

  const getColor = (e) => {
    const date = new Date();
    if (e.startDate.getDay() !== date.getDay()) {
      return APPOINTMENT_COLORS.notToday;
    }
    if (e.startDate.getTime() < date.getTime()) {
      if (e.endDate.getTime() < date.getTime()) {
        return APPOINTMENT_COLORS.completed;
      }
      return APPOINTMENT_COLORS.ongoing;
    } else {
      return APPOINTMENT_COLORS.upcoming;
    }
  };

  const Appointment = ({ children, style, ...restProps }) => {
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          backgroundColor: getColor(restProps.data)
        }}
      >
        {Array.isArray(restProps.data.title) ? practicalAppointmentTab(restProps.data) : lectureAppointmentTab(restProps.data)}
        {children}
      </Appointments.Appointment>
    );
  };

  const lectureAppointmentTab = (data) => {
    return (
      <div
        className="Appointment-appointment Appointment-clickableAppointment css-3nejl"
        style={{
          backgroundColor: getColor(data)
        }}
      >
        <div className="VerticalAppointment-content css-gyiown">
          <div className="VerticalAppointment-container">
            <div
              className="VerticalAppointment-title"
              style={{
                fontSize: "14px"
                // textDecoration: getColor(data) == APPOINTMENT_COLORS.completed ? "line-through" : "none",
                // textDecorationColor: "black"
              }}
            >
              <strong>{data.title}</strong>
            </div>

            <div className="VerticalAppointment-textContainer">
              {data.faculty != null ? (
                <span className={`badge badge-dark rounded-pill d-inline`} style={{ fontSize: "10px" }}>
                  By Prof. {data.faculty.firstName} {data.faculty.lastName}
                </span>
              ) : null}
            </div>
            <div className="VerticalAppointment-textContainer mt-2">
              <div className="VerticalAppointment-time">
                {getTime(data.startDate)} - {getTime(data.endDate)}
              </div>
              {/* <div className="VerticalAppointment-time"> - </div> */}
              {/* <div className="VerticalAppointment-time"></div> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const practicalAppointmentTab = (data) => {
    return (
      <div
        className="Appointment-appointment Appointment-clickableAppointment css-3nejl"
        style={{
          // ...style,
          backgroundColor: getColor(data)
          // borderRadius: "8px"
        }}
      >
        <div className="VerticalAppointment-content css-gyiown">
          <div className="VerticalAppointment-container">
            {data.title.map((item, index) => (
              <div key={index} className="VerticalAppointment-title" style={{ fontSize: "14px" }}>
                {item}
              </div>
            ))}
            <div className="VerticalAppointment-textContainer mt-2">
              <div className="VerticalAppointment-time">
                {getTime(data.startDate)} - {getTime(data.endDate)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const AppointmentToolTip = (props) => {
  //   return (
  //     <div className="Content-content css-11ngvp6">
  //       <div className="MuiGrid-root MuiGrid-container Content-titleContainer css-u9p4s6-MuiGrid-root">
  //         <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2 css-1o7apob-MuiGrid-root">
  //           <div className="Content-relativeContainer">
  //             <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium Content-lens css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LensIcon">
  //               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
  //             </svg>
  //           </div>
  //         </div>
  //         <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10 css-17p3wh3-MuiGrid-root">
  //           <div>
  //             <div className="Content-title Content-dateAndTitle"> Deep Learning</div>
  //             <div className="Content-text Content-dateAndTitle">Thursday, February 16, 2023</div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="MuiGrid-root MuiGrid-container Content-contentContainer css-1vam7s3-MuiGrid-root">
  //         <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2 Content-textCenter css-1o7apob-MuiGrid-root">
  //           <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium Content-icon css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AccessTimeIcon">
  //             <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
  //             <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
  //           </svg>
  //         </div>
  //         <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10 css-17p3wh3-MuiGrid-root">
  //           <div className="Content-text">9:40 AM - 10:30 AM</div>
  //         </div>
  //       </div>
  //       <div className="MuiGrid-root MuiGrid-container Content-contentContainer css-1vam7s3-MuiGrid-root">
  //         <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2 Content-textCenter css-1o7apob-MuiGrid-root">
  //           <i className="bi bi-0-circle-fill"></i>
  //         </div>
  //         <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10 css-17p3wh3-MuiGrid-root">
  //           <div className="Content-text">Lecture by Jameer Kotwal</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const handleFullscreen = () => {
    if (isFullscreen) {
      handle.exit();
      setIsFullscreen(false);
    } else {
      handle.enter();
      setIsFullscreen(true);
    }
  };

  return (
    <FullScreen handle={handle}>
      <div className="mt-2">
        <div className="row m-2 justify-content-between">
          <div className="col-md-2 d-flex justify-content-start">
            <a href="/">
              <button className="btn">{"<--"}</button>
            </a>
          </div>

          <div className="col-md-4 d-flex justify-content-center text-light badge badge-dark badge-pill align-items-center" style={{ fontSize: "18px", fontFamily: "Roboto Mono" }}>
            {scheduleContext.schedule != null ? (
              <>
                {scheduleContext.schedule.class.branch.title.toUpperCase()} {scheduleContext.schedule.class.title}
              </>
            ) : (
              <></>
            )}
          </div>
          {/* <div className="col-md-4 d-flex justify-content-center">BE-A</div> */}
          <div className="col-md-2 d-flex justify-content-end">
            {isFullscreen ? (
              <i onClick={handleFullscreen} style={{ cursor: "pointer" }} className="bi bi-fullscreen-exit mr-3"></i>
            ) : (
              <i onClick={handleFullscreen} style={{ cursor: "pointer" }} className="bi bi-fullscreen mr-3"></i>
            )}
          </div>
        </div>
        <Paper elevation={2}>
          <Scheduler data={scheduleContext.schedule != null ? scheduleContext.schedule.lectures : []} height={window.innerHeight * 0.9}>
            <ViewState defaultCurrentViewName="Week" />
            {/* <DayView startDayHour={9} endDayHour={18} /> */}
            <WeekView startDayHour={9.5} endDayHour={17} excludedDays={[0, 6]} />
            {/* <Toolbar /> */}
            {/* <ViewSwitcher /> */}
            <Appointments appointmentComponent={Appointment} />
            {/* <AppointmentTooltip showCloseButton contentComponent={AppointmentToolTip} /> */}
            {/* <AppointmentTooltip showCloseButton /> */}
            {/* <AppointmentForm readOnly /> */}
            <CurrentTimeIndicator updateInterval={60000} />
            {/* <Scrolling /> */}
          </Scheduler>
        </Paper>
      </div>
      <ToastContainer theme="colored" position="top-left" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </FullScreen>
  );
};

export default Timetable;
