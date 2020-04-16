import React, { useState } from "react";
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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const CalendarComponent = ({ tasks, onTaskStatusUpdated, onTaskDeleted }) => {
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
                contentComponent={props => <Content {...props} onTaskStatusUpdated={onTaskStatusUpdated} onTaskDeleted={onTaskDeleted} />}
            />
        </Scheduler>
    );
};

export function Content ({ children, appointmentData, style, onTaskStatusUpdated, onTaskDeleted, ...restProps }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteTask = (taskId) => {
        onTaskDeleted(taskId);
        document.getElementById("grid").click();
    };

    return (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <Grid container alignItems="center">
                
                <div className="footer-container">
                    <div>
                       <Checkbox
                        checked={appointmentData.isComplete}
                        color="primary"
                        onClick={() => onTaskStatusUpdated(appointmentData.taskId)}
                        />
                        <span>{appointmentData.isComplete ? "Task complete" : "Task incomplete"}</span>
                    </div>
                    <IconButton aria-label="delete" onClick={handleClickOpen}>
                        <DeleteIcon />
                    </IconButton>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this task?"}</DialogTitle>
                        <DialogActions>
                        <Button onClick={() => deleteTask(appointmentData.taskId)} color="primary" autoFocus>
                            Yes
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            No
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
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
        <Grid id="grid" container alignItems="center" justify="space-between">
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
