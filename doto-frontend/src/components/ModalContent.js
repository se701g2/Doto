import React, { useState } from "react";
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
import "./ModalContent.css";
import { Themes } from "../constants/Themes";

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

const ModalContent = props => {
    const classes = useStyles();

    const [selectedName, setSelectedName] = useState("TASK - " + new Date());
    const [selectedDescription, setSelectedDescription] = useState("");
    const [selectedDueDate, setSelectedDueDate] = useState(new Date());

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

    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("");
    const [selectedReminder, setSelectedReminder] = useState("");

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
            setSelectedDueDate("invalid beans");
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

    // ----- END HANDLERS FOR INPUT FIELDS -----

    // Task variables passed into calendar.js to add new task to the calendar
    const handleAdd = event => {
        const task = {
            title: selectedName,
            description: selectedDescription,
            dueDate: selectedDueDate,
            duration: selectedDuration.getHours() * 60 + selectedDuration.getMinutes(),
            travelTime: selectedTravelTime.getHours() * 60 + selectedTravelTime.getMinutes(),
            location: selectedLocation,
            priority: selectedPriority,
            reminder: selectedReminder,
        };

        props.addNewTask(task, new Date());
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
                        />
                    </div>
                    <div>
                        <TextField
                            className="text-area group-spacing"
                            id="standard-basic"
                            label="Task description"
                            onChange={handleDescriptionChange}
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
                        <Button id="add-button" variant="contained" color="default" onClick={handleAdd}>
                            ADD
                        </Button>
                    </div>
                </form>
            </div>
            <div></div>
        </div>
    );
};

ModalContent.propTypes = {
    addNewTask: PropTypes.func.isRequired,
};

export default ModalContent;
