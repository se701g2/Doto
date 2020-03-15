/* eslint-disable react/prop-types */
import React from "react";
import "./Calendar.css";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    WeekView,
    MonthView,
    DayView,
    ViewSwitcher,
    Toolbar,
    DateNavigator,
    TodayButton,
    Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

const CalendarComponent = ({ appointments }) => {
    return (
        <Scheduler data={appointments} currentView={MonthView} editable={true}>
            <ViewState />
            <DayView />
            <WeekView />
            <MonthView />
            <Toolbar />
            <ViewSwitcher />
            <DateNavigator />
            <TodayButton />
            <Appointments />
        </Scheduler>
    );
};

export default CalendarComponent;
