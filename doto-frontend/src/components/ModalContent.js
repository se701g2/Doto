import React from "react";
import "date-fns";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import "./ModalContent.css";

const useStyles = makeStyles(theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: 400,
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

const ModalContent = () => {
    const classes = useStyles();

    const [selectedName, setSelectedName] = React.useState("TASK" + new Date());
    const [selectedDescription, setSelectedDescription] = React.useState("Cry in anguish");
    const [selectedDueDate, setSelectedDueDate] = React.useState(new Date());
    const [selectedDuration, setSelectedDuration] = React.useState(0);
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [selectedPriority, setSelectedPriority] = React.useState("");
    const [selectedReminder, setSelectedReminder] = React.useState("");

    const handleNameChange = event => {
        setSelectedName(event.target.value);
    };

    const handleDescriptionChange = event => {
        setSelectedDescription(event.target.value);
    };

    const handleDateChange = date => {
        if (date > new Date()) {
            setSelectedDueDate(date);
        }
    };

    const handleDurationChange = event => {
        setSelectedDuration(event.target.value);
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

    const handleAdd = event => {
        const task = {
            title: selectedName,
            description: selectedDescription,
            dueDate: selectedDueDate,
            duration: selectedDuration,
            location: selectedLocation,
            priority: selectedPriority,
            reminder: selectedReminder,
        };

        console.table(task);
    };

    return (
        <div className="modal">
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
                        <TextField
                            className="small-text-area group-spacing"
                            id="standard-basic"
                            type="number"
                            inputProps={{ min: "0" }}
                            label="Duration (in minutes)"
                            onChange={handleDurationChange}
                        />
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
                        <FormControl className={classes.formControl}>
                            <InputLabel id="reminder-label">Reminders</InputLabel>
                            <Select value={selectedReminder} onChange={handleReminder}>
                                <MenuItem value={10}>1 Week Before</MenuItem>
                                <MenuItem value={20}>1 Day Before</MenuItem>
                                <MenuItem value={30}>1 Hour Before</MenuItem>
                                <MenuItem value={40}>30 Minutes Before</MenuItem>
                                <MenuItem value={50}>15 Minutes Before</MenuItem>
                                <MenuItem value={60}>5 Minutes Before</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </form>
            </div>
            <div id="add-button">
                <Button variant="contained" color="default" onClick={handleAdd}>
                    ADD
                </Button>
            </div>
        </div>
    );
};

export default ModalContent;
