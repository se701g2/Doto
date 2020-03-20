import React from "react";
import "./Calendar.css";
import { ViewState } from "@devexpress/dx-react-scheduler";
import PropTypes from "prop-types";
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
    AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";

const CalendarComponent = props => {
    return (
        <Scheduler data={props.tasks} currentView={MonthView} editable={true}>
            <ViewState />
            <DayView />
            <WeekView />
            <MonthView />
            <Toolbar />
            <ViewSwitcher />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AppointmentTooltip />
        </Scheduler>
    );
};

CalendarComponent.propTypes = {
    tasks: PropTypes.array.isRequired,
};

export default CalendarComponent;
