import React, { useState, useContext, useEffect } from "react";
import { FormControl, Button, Input, InputAdornment, Grid } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import EmailIcon from "@material-ui/icons/Email";
import { AccountCircle } from "@material-ui/icons";
import PropTypes from "prop-types";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Header from "../Header";
import DotoService from "../../../helpers/DotoService";
import { ThemeContext } from "../../../context/ThemeContext";
import MarketPlace from "../../MarketPlace";
import { ActiveHoursContext } from "../../../context/ActiveHoursContext";
import { Themes } from "../../../constants/Themes";
import "./SettingsPage.css";
import "../Pages.css";
import Points from "../../Points";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { shiftTasks } from "../Calendar/TaskShifter";

const classnames = require("classnames");

// TODO: Use input name field and display it on the calendar header page as [name]'s calendar
const InputNameField = props => {
    return (
        <FormControl id="input-field">
            <Input
                startAdornment={
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                }
                value={props.name}
                disabled={true}
            />
        </FormControl>
    );
};

// TODO: Use this field is to add any other email address's calendars
const InputEmailField = props => {
    return (
        <FormControl id="input-field">
            <Input
                startAdornment={
                    <InputAdornment position="start">
                        <EmailIcon />
                    </InputAdornment>
                }
                value={props.email}
                disabled={true}
            />
        </FormControl>
    );
};

const ProfilePhoto = props => {
    return (
        <div className="flex">
            {/* Profile photo is taken from the associated google account */}
            <img className="profile-photo" src={props.profilePic} alt="profile-pic-from-google" />
        </div>
    );
};

// TODO: Implement logic for working hours in sync with task-scheduling algorithm
const WorkingHoursPicker = props => {
    const [dialog, setDialog] = useState(false);

    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    const handleCloseAndSave = () => {
        setDialog(false);
        props.saveChanges(props.startTime, props.endTime);
    };

    const handleStartTimeChange = date => {
        props.changeStartTime(date);
    };

    const handleEndTimeChange = date => {
        props.changeEndTime(date);
    };

    return (
        <Grid container>
            <h2 style={{ marginLeft: "10vw", marginTop: "4vh", textAlign: "left" }}>Working Hours:</h2>
            <div style={{ marginLeft: "3vw" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        margin="normal"
                        label="Start Time"
                        value={props.startTime}
                        onChange={handleStartTimeChange}
                        KeyboardButtonProps={{
                            "aria-label": "change time",
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
            <h2 style={{ marginLeft: "3vw", marginTop: "4vh", textAlign: "left" }}>to</h2>
            <div style={{ marginLeft: "3vw" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        margin="normal"
                        label="End Time"
                        value={props.endTime}
                        onChange={handleEndTimeChange}
                        KeyboardButtonProps={{
                            "aria-label": "change time",
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div style={{ marginLeft: "3vw", marginTop: "3vh", textAlign: "left" }}>
                <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                    Save
                </Button>
                <Dialog
                    open={dialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Want to save those changes?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Your time-table will be re-managed automatically. Please check again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancle
                        </Button>
                        <Button onClick={handleCloseAndSave} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        boxShadow: theme.shadows[5],
        marginLeft: "10vw",
    },
}));

// Using props to change the colour theme of the webpage when changed by the user
const ThemePicker = props => {
    const classes = useStyles();

    const handleThemeClick = (themeColour, cost) => {
        // @params themeColour and cost

        switch (themeColour) {
            case "blue":
                props.changeTheme(Themes.DARK);
                break;
            case "green":
                props.changeTheme(Themes.LIGHT);
                break;

            case "gray":
                break;
            case "magenta":
                break;
            case "purple":
                break;
            case "crimson":
                break;
            case "black":
                break;
            case "red":
                break;
            case "darkSeaGreen":
                break;
            case "antiqueWhite":
                break;
            case "darkKhaki":
                break;
            case "darkSlateBlue":
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h2 style={{ marginLeft: "10vw", marginTop: "4vh", textAlign: "left" }}>Available Points: </h2>
            <Points avatarClass={classes.blue} value={props.userPoints} />
            <br></br>
            <div className="flex">
                <h2 style={{ marginLeft: "10vw", marginTop: "4vh", textAlign: "left" }}>Theme:</h2>

                <MarketPlace
                    handleThemeClick={handleThemeClick}
                    buyItem={props.onBuyItem}
                    unlockedItems={props.unlockedItems}
                ></MarketPlace>
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const [theme, setTheme] = useContext(ThemeContext);
    const { activeHoursStart, activeHoursEnd } = useContext(ActiveHoursContext);
    const [profilePic, setProfilePic] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [startTime, setStartTime] = activeHoursStart;
    const [endTime, setEndTime] = activeHoursEnd;
    const [userPoints, setUserPoints] = useState(0);
    const [unlockedItems, setUnlockedItems] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await DotoService.getTasks();
            setTasks(tasks);
        };
        const fetchUserInfo = async () => {
            const userInfo = await DotoService.getUserInfo();
            setTheme(userInfo.themePreference);
            setProfilePic(userInfo.picture);
            setName(userInfo.name);
            setEmail(userInfo.email);
            setStartTime(userInfo.startTime);
            setEndTime(userInfo.endTime);
            setUserPoints(userInfo.points);
            setUnlockedItems(userInfo.unlockedItems || []);
        };
        fetchUserInfo();
        fetchTasks();
    }, [setTheme, setStartTime, setEndTime]);

    const changeTheme = newTheme => {
        DotoService.updateUserInfo({ themePreference: newTheme, startTime, endTime }).then(setTheme(newTheme));
    };

    const changeStartTime = newTime => {
        setStartTime(newTime);
    };

    const changeEndTime = newTime => {
        setEndTime(newTime);
    };

    const saveChanges = (newStartTime, newEndTime) => {
        DotoService.updateUserInfo(theme, newStartTime, newEndTime);
        const { shiftedTasks } = shiftTasks(tasks, new Date(newStartTime), new Date(newEndTime));
        for (let i = 0; i < shiftedTasks.length; i++) {
            DotoService.updateTask(shiftedTasks[i]);
        }
    };

    const handleBuyItem = (cost, item) => {
        const newPointsBalance = userPoints - cost;

        // prevent user from purchasing items they cannot afford
        if (newPointsBalance >= 0) {
            const newUnlockedItems = [...unlockedItems, item];
            DotoService.updateUserInfo({ points: newPointsBalance, unlockedItems: newUnlockedItems });
            setUserPoints(newPointsBalance);
            setUnlockedItems(newUnlockedItems);
        }
        // TODO: Display error message explaining why user cannot buy the item
    };

    return (
        <div className="page-layout">
            <div
                className={classnames(
                    "left-side-bar",
                    theme === Themes.DARK ? "left-side-bg-blue" : "left-side-bg-green",
                )}
            />
            <span className="content-container">
                <Header title="Settings" />
                <div
                    className={classnames(
                        "right-side-bar",
                        theme === Themes.DARK ? "right-side-bg-blue" : "right-side-bg-green",
                    )}
                >
                    <ProfilePhoto profilePic={profilePic} />
                    <InputNameField name={name} />
                    <InputEmailField email={email} />

                    <ThemePicker
                        changeTheme={changeTheme}
                        onBuyItem={handleBuyItem}
                        userPoints={userPoints}
                        unlockedItems={unlockedItems}
                    />
                    <WorkingHoursPicker
                        startTime={startTime}
                        endTime={endTime}
                        changeStartTime={changeStartTime}
                        changeEndTime={changeEndTime}
                        saveChanges={saveChanges}
                    />
                </div>
            </span>
        </div>
    );
};

ThemePicker.propTypes = {
    changeTheme: PropTypes.func.isRequired,
};

ProfilePhoto.propTypes = {
    profilePic: PropTypes.string.isRequired,
};

InputNameField.propTypes = {
    name: PropTypes.string.isRequired,
};

InputEmailField.propTypes = {
    email: PropTypes.string.isRequired,
};

export default SettingsPage;
