import React, { useState, useContext, useEffect } from "react";
import { FormControl, Button, Input, InputAdornment } from "@material-ui/core";
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
    const handleStartTimeChange = date => {
        props.changeStartTime(date);
    };

    const handleEndTimeChange = date => {
        props.changeEndTime(date);
    };

    return (
        <div className="flex">
            <h2 style={{ marginLeft: "10vw", marginTop: "4vh", textAlign: "left" }}>Working Hours:</h2>
            <div style={{ marginLeft: "3vw" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        margin="normal"
                        label="Start Time"
                        onChange={handleStartTimeChange}
                        value={props.StartTime}
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
                        onChange={handleEndTimeChange}
                        value={props.EndTime}
                        KeyboardButtonProps={{
                            "aria-label": "change time",
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
        </div>
    );
};

// Using props to change the colour theme of the webpage when changed by the user
const ThemePicker = props => {
    return (
        <div className="flex">
            <h2 style={{ marginLeft: "10vw", marginTop: "4vh", textAlign: "left" }}>Theme:</h2>
            <ThemeProvider>
                <Button
                    onClick={() => props.changeTheme(Themes.DARK)}
                    id="color-palette"
                    style={{ backgroundColor: "#3700b3" }}
                />
            </ThemeProvider>
            <ThemeProvider>
                <Button
                    onClick={() => props.changeTheme(Themes.LIGHT)}
                    id="color-palette"
                    style={{ backgroundColor: "#2e7d32" }}
                />
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
<<<<<<< HEAD
    const [StartTime, SetStartTime] = useState();
    const [EndTime, SetEndTime] = useState();
=======
    const [startTime, setStartTime] = activeHoursStart;
<<<<<<< HEAD
    const [endTime, setStartTime] = activeHoursEnd;
>>>>>>> e3ecc7a... Created a new ActiveHoursContext. Passed the context to the settings and calender page. State for the times are maintained in Route.js file instead of SettingsPage.js file
=======
    const [endTime, setEndTime] = activeHoursEnd;
>>>>>>> 5a038f3... Fixed import for ActiveHoursContext. Changed PropType for WorkingHoursPicker.

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await DotoService.getUserInfo();
            setTheme(userInfo.themePreference);
            setProfilePic(userInfo.picture);
            setName(userInfo.name);
            setEmail(userInfo.email);
<<<<<<< HEAD
            // console.log(userInfo.StartTime);
            SetStartTime(userInfo.StartTime);
            SetEndTime(userInfo.EndTime);
            // WorkingHoursPicker.setSelectedStartTime(userInfo.StartTime);
            // WorkingHoursPicker.setSelectedEndTime(userInfo.EndTime);
=======
            setStartTime(userInfo.startTime);
            setEndTime(userInfo.endTime);
>>>>>>> eb5e13e... Forgot to change variable names in DotoServices and fixed conflict issue in User.js
        };
        fetchUserInfo();
    });

    const changeTheme = newTheme => {
        DotoService.updateUserInfo(newTheme, StartTime, EndTime);
        setTheme(newTheme);
    };

    const changeStartTime = newTime => {
<<<<<<< HEAD
        DotoService.updateUserInfo(theme, newTime, EndTime);
        SetStartTime(newTime);
    };

    const changeEndTime = newTime => {
        DotoService.updateUserInfo(theme, StartTime, newTime);
        SetEndTime(newTime);
=======
        DotoService.updateUserInfo(theme, newTime, endTime);
        setStartTime(newTime);
    };

    const changeEndTime = newTime => {
        DotoService.updateUserInfo(theme, startTime, newTime);
        setEndTime(newTime);
>>>>>>> 5a038f3... Fixed import for ActiveHoursContext. Changed PropType for WorkingHoursPicker.
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
                        StartTime={StartTime}
                        EndTime={EndTime}
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
