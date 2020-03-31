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
import DoneIcon from "@material-ui/icons/Done";

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
            <Appointments appointmentComponent={Appointment} />
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
                    checked={appointmentData.isComplete}
                    color="primary"
                    onClick={() => onTaskStatusUpdated(appointmentData.id)}
                />
                <span>{appointmentData.isComplete ? "Task complete" : "Task incomplete"}</span>
            </Grid>
        </AppointmentTooltip.Content>
    );
};

const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
        {...restProps}
        style={
            restProps.data.isComplete
                ? { ...style, backgroundColor: "#adadad" }
                : {
                      style,
                  }
        }
    >
        {children}
        <Grid container alignItems="center" justify="space-between">
            <span style={{ color: "white", paddingLeft: "10px" }}>
                {restProps.data.isComplete ? "Task complete" : "Task incomplete"}
            </span>
            {restProps.data.isComplete && <DoneIcon style={{ marginRight: "26px", fontSize: 26, color: "white" }} />}
        </Grid>
    </Appointments.Appointment>
);

CalendarComponent.propTypes = {
    tasks: PropTypes.array.isRequired,
};

export default CalendarComponent;
