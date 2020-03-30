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
import { Checkbox, Grid } from "@material-ui/core";

const CalendarComponent = ({ tasks, onTaskStatusUpdated }) => {
    return (
        <Scheduler data={tasks} currentView={MonthView} editable={true}>
            <ViewState />
            <DayView />
            <WeekView />
            <MonthView />
            <Toolbar />
            <ViewSwitcher />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AppointmentTooltip
                contentComponent={props => <Content {...props} onTaskStatusUpdated={onTaskStatusUpdated} />}
            />
        </Scheduler>
    );
};

const Content = ({ children, appointmentData, style, onTaskStatusUpdated, ...restProps }) => {
    return (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <Grid container alignItems="center">
                <Checkbox
                    checked={appointmentData.completed}
                    color="primary"
                    onClick={() => onTaskStatusUpdated(appointmentData.id)}
                />
                <span>{appointmentData.completed ? "Task complete" : "Task incomplete"}</span>
            </Grid>
        </AppointmentTooltip.Content>
    );
};

CalendarComponent.propTypes = {
    tasks: PropTypes.array.isRequired,
};

export default CalendarComponent;
