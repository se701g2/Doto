import React, { useState, useContext, useEffect } from "react";
import { FormControl, Button, Input, InputAdornment, Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import EmailIcon from "@material-ui/icons/Email";
import { AccountCircle } from "@material-ui/icons";
import PropTypes from "prop-types";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Header from "../Header";
import DotoService from "../../../helpers/DotoService";
import { ThemeContext } from "../../../context/ThemeContext";
import { ActiveHoursContext } from "../../../context/ActiveHoursContext";
import { Themes } from "../../../constants/Themes";
import "./SettingsPage.css";
import "../Pages.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
            <div style={{ marginLeft: "3vw", marginTop: "4vh", textAlign: "left" }}>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Save
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Grid>
    );
};

// Using props to change the colour theme of the webpage when changed by the user
const ThemePicker = props => {
    const handleChangeThemeToDark = () => {
        props.changeTheme(Themes.DARK);
    };

    const handleChangeThemeToLight = () => {
        props.changeTheme(Themes.LIGHT);
    };

    return (
        <div className="flex">
            <h2 style={{ marginLeft: "10vw", marginTop: "4vh", textAlign: "left" }}>Theme:</h2>
            <ThemeProvider>
                <Button onClick={handleChangeThemeToDark} id="color-palette" style={{ backgroundColor: "#3700b3" }} />
            </ThemeProvider>
            <ThemeProvider>
                <Button onClick={handleChangeThemeToLight} id="color-palette" style={{ backgroundColor: "#2e7d32" }} />
            </ThemeProvider>
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

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await DotoService.getUserInfo();
            setTheme(userInfo.themePreference);
            setProfilePic(userInfo.picture);
            setName(userInfo.name);
            setEmail(userInfo.email);
            setStartTime(userInfo.startTime);
            setEndTime(userInfo.endTime);
        };
        fetchUserInfo();
    }, [setTheme, setStartTime, setEndTime]);

    const changeTheme = newTheme => {
        DotoService.updateUserInfo(newTheme, startTime, endTime).then(setTheme(newTheme));
    };

    const changeStartTime = newTime => {
        DotoService.updateUserInfo(theme, newTime, endTime).then(setStartTime(newTime));
    };

    const changeEndTime = newTime => {
        DotoService.updateUserInfo(theme, startTime, newTime).then(setEndTime(newTime));
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

                    <ThemePicker changeTheme={changeTheme} />
                    <WorkingHoursPicker
                        startTime={startTime}
                        endTime={endTime}
                        changeStartTime={changeStartTime}
                        changeEndTime={changeEndTime}
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
