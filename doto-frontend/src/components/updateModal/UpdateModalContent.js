import React, { useEffect, useState } from "react";
import "date-fns";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker, KeyboardTimePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import "./UpdateModalContent.css";
import { Themes } from "../../constants/Themes";

const useStyles = makeStyles(theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "55vw",
        },
    },
    taskNameInput: {
        fontSize: 30,
        fontWeight: 600,
    },
    labelFocus: {
        fontSize: 18,
    },
    formControl: {
        width: 200,
    },
}));

const UpdateModalContent = props => {
    const classes = useStyles();

    const [selectedName, setSelectedName] = useState(props.taskToUpdate.title);
    const [selectedDescription, setSelectedDescription] = useState(props.taskToUpdate.description);
    const [selectedDueDate, setSelectedDueDate] = useState(new Date());
    const [selectedEarliestDate, setSelectedEarliestDate] = useState(props.taskToUpdate.earliestDate);

    // default duration is 1 hour
    var initialDuration = new Date();
    initialDuration.setHours(1);
    initialDuration.setMinutes(0);
    const [selectedDuration, setSelectedDuration] = React.useState(initialDuration);

    // default travel time is 10 minutes unless specified
    const travelTime = new Date();
    travelTime.setHours(0);
    travelTime.setMinutes(10);
    const [selectedTravelTime, setSelectedTravelTime] = React.useState(travelTime);

    const [selectedLocation, setSelectedLocation] = useState(props.taskToUpdate.location);
    const [selectedPriority, setSelectedPriority] = useState("");
    const [selectedReminder, setSelectedReminder] = useState("");

    useEffect(() => {
        setSelectedName(props.taskToUpdate.title || "");
        setSelectedDescription(props.taskToUpdate.description || "");
        setSelectedDueDate(props.taskToUpdate.dueDate || "");
        setSelectedDuration(convertMinutesToDateTime(props.taskToUpdate.duration));
        setSelectedTravelTime(convertMinutesToDateTime(props.taskToUpdate.travelTime));
        setSelectedLocation(props.taskToUpdate.location || "");
        setSelectedPriority(props.taskToUpdate.priority || "");
        setSelectedReminder(props.taskToUpdate.reminderType || "");
        setSelectedEarliestDate(convertMinutesToDateTime(props.taskToUpdate.earliestDate));
    }, [props.taskToUpdate]);

    // ----- HANDLERS FOR INPUT FIELDS -----
    const handleNameChange = event => {
        setSelectedName(event.target.value);
    };

    const handleDescriptionChange = event => {
        setSelectedDescription(event.target.value);
    };

    const handleDateChange = date => {
        if (date > new Date()) {
            setSelectedDueDate(date);
        } else {
            setSelectedDueDate("invalid date");
        }
    };

    const handleEarliestChange = date => {
        if (date > new Date()) {
            setSelectedEarliestDate(date);
        } else {
            setSelectedEarliestDate("invalid date");
        }
    };

    const handleLocationChange = event => {
        setSelectedLocation(event.target.value);
    };

    const handlePriority = event => {
        setSelectedPriority(event.target.value);
    };

    const handleReminder = event => {
        setSelectedReminder(event.target.value);
    };

    const convertMinutesToDateTime = minutes => {
        const date = new Date();
        date.setMinutes(minutes % 60);
        date.setHours((minutes - (minutes % 60)) / 60);
        return date;
    };

    // ----- END HANDLERS FOR INPUT FIELDS -----

    // Task variables passed into calendar.js to add new task to the calendar
    const handleUpdate = event => {
        const task = {
            taskId: props.taskToUpdate.taskId,
            title: selectedName,
            description: selectedDescription,
            dueDate: selectedDueDate,
            earliestDate: selectedEarliestDate,
            duration: selectedDuration.getHours() * 60 + selectedDuration.getMinutes(),
            travelTime: selectedTravelTime.getHours() * 60 + selectedTravelTime.getMinutes(),
            location: selectedLocation,
            priority: selectedPriority,
            reminder: selectedReminder,
        };

        props.onTaskUpdated(task);
    };

    return (
        // Setting .css properties based on theme selected
        <div className={props.modalBackground === Themes.DARK ? "modal-p" : "modal-g"}>
            <div className="forum-content">
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            className="text-area name-field"
                            id="standard-basic"
                            label="Task name"
                            InputProps={{
                                classes: {
                                    input: classes.taskNameInput,
                                },
                            }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.taskNameInput,
                                    shrink: classes.labelFocus,
                                },
                            }}
                            onChange={handleNameChange}
                            defaultValue={selectedName}
                        />
                    </div>
                    <div>
                        <TextField
                            className="text-area group-spacing"
                            id="standard-basic"
                            label="Task description"
                            onChange={handleDescriptionChange}
                            defaultValue={selectedDescription}
                        />
                    </div>
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                                disableToolbar
                                autoOk={true}
                                minDate={new Date()}
                                minDateMessage="Date must be after now"
                                invalidDateMessage="Date must be after now"
                                variant="inline"
                                format="MM/dd/yyyy HH:mm"
                                ampm={false}
                                margin="normal"
                                id="date-picker-inline"
                                label="Due Date"
                                value={selectedDueDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "Change date/time",
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                                disableToolbar
                                autoOk={true}
                                minDate={new Date()}
                                minDateMessage="Date must be after now"
                                invalidDateMessage="Date must be after now"
                                variant="inline"
                                format="MM/dd/yyyy HH:mm"
                                ampm={false}
                                margin="normal"
                                id="date-picker-inline"
                                label="Earliest Start"
                                value={selectedEarliestDate}
                                onChange={handleEarliestChange}
                                KeyboardButtonProps={{
                                    "aria-label": "Change date/time",
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                ampm={false}
                                label="Duration of task (hours : minutes)"
                                margin="normal"
                                id="time-picker"
                                value={selectedDuration}
                                onChange={setSelectedDuration}
                                KeyboardButtonProps={{
                                    "aria-label": "change time",
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                ampm={false}
                                label="Travel Duration (hours : minutes)"
                                margin="normal"
                                id="travel-time-picker"
                                value={selectedTravelTime}
                                onChange={setSelectedTravelTime}
                                KeyboardButtonProps={{
                                    "aria-label": "change time",
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div>
                        <TextField
                            className="text-area spacing"
                            id="standard-basic"
                            label="Location"
                            onChange={handleLocationChange}
                            defaultValue={selectedLocation}
                        />
                    </div>
                    <div className="drop-down">
                        {/* Scheduling based on priority. Hight priority will schedule the task closer to current time. Low priority will
                        schedule task closer to deadline. */}
                        {/* TODO: Improve algorithm for more smarter Scheduling */}
                        <FormControl className={classes.formControl}>
                            <InputLabel id="priority-label">Priority</InputLabel>
                            <Select value={selectedPriority} onChange={handlePriority}>
                                <MenuItem value={10}>High</MenuItem>
                                <MenuItem value={20}>Medium</MenuItem>
                                <MenuItem value={30}>Low</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="drop-down">
                        {/* TODO: Send a reminder email to associated gmail address */}
                        <FormControl className={classes.formControl}>
                            <InputLabel id="reminder-label">Reminders</InputLabel>
                            <Select value={selectedReminder} onChange={handleReminder}>
                                <MenuItem value={10080}>1 Week Before</MenuItem>
                                <MenuItem value={1440}>1 Day Before</MenuItem>
                                <MenuItem value={60}>1 Hour Before</MenuItem>
                                <MenuItem value={30}>30 Minutes Before</MenuItem>
                                <MenuItem value={15}>15 Minutes Before</MenuItem>
                                <MenuItem value={5}>5 Minutes Before</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </form>
            </div>
            <div id="add-button">
                <Button variant="contained" color="default" onClick={handleUpdate}>
                    Update
                </Button>
            </div>
        </div>
    );
};

UpdateModalContent.propTypes = {
    taskToUpdate: PropTypes.object.isRequired,
    onTaskUpdated: PropTypes.func.isRequired,
};

export default UpdateModalContent;
