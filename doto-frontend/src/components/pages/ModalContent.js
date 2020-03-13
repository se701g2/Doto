import React from "react";
import "date-fns";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import "./ModalContent.css";

const useStyles = makeStyles(theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: 450,
        },
    },

    formControl: {
        width: 200,
    },
}));

const ModalContent = () => {
    const classes = useStyles();

    const [priority, setPriority, reminder, setReminder] = React.useState("");

    const handlePriority = event => {
        setPriority(event.target.value);
    };

    const handleReminder = event => {
        setReminder(event.target.value);
    };

    return (
        <div className="modal">
            <div className="forum-content">
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField className="text-area name-field spacing" id="standard-basic" label="Task name" />
                    </div>
                    <div>
                        <TextField className="text-area spacing" id="standard-basic" label="Task description" />
                    </div>
                    <div>Due Date :</div>
                    <div>Duration :</div>
                    <div>
                        <TextField className="text-area spacing" id="standard-basic" label="Location" />
                    </div>
                    <div className="drop-down">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="priority-label">Priority</InputLabel>
                            <Select value={priority} onChange={handlePriority}>
                                <MenuItem value={10}>High</MenuItem>
                                <MenuItem value={20}>Medium</MenuItem>
                                <MenuItem value={30}>Low</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="drop-down">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="reminder-label">Reminders</InputLabel>
                            <Select value={reminder} onChange={handleReminder}>
                                <MenuItem value={10}>1 Week Before</MenuItem>
                                <MenuItem value={20}>1 Day Before</MenuItem>
                                <MenuItem value={30}>1 Hour Before</MenuItem>
                                <MenuItem value={30}>30 Minuties Before</MenuItem>
                                <MenuItem value={30}>15 Minuties Before</MenuItem>
                                <MenuItem value={30}>5 Minuties Before</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </form>
            </div>
            <div id="add-button">
                <Button variant="outlined">ADD</Button>
            </div>
        </div>
    );
};

export default ModalContent;
