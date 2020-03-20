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
import "./SettingsPage.css";
import "../Pages.css";

const classnames = require("classnames");

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
            <img className="profile-photo" src={props.profilePic} alt="profile-pic-from-google" />
        </div>
    );
};

const WorkingHoursPicker = () => {
    const [selectedStartTime, setSelectedStartTime] = useState(new Date("2020-03-15T09:00:00"));
    const [selectedEndTime, setSelectedEndTime] = useState(new Date("2020-03-15T17:00:00"));

    const handleStartTimeChange = date => {
        setSelectedStartTime(date);
    };

    const handleEndTimeChange = date => {
        setSelectedEndTime(date);
    };

    return (
        <div className="flex">
            <h2 style={{ marginLeft: "10vw", marginTop: "4vh", textAlign: "left" }}>Working Hours:</h2>
            <div style={{ marginLeft: "3vw" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        margin="normal"
                        label="Start Time"
                        value={selectedStartTime}
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
                        value={selectedEndTime}
                        onChange={handleEndTimeChange}
                        KeyboardButtonProps={{
                            "aria-label": "change time",
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
        </div>
    );
};

const ThemePicker = props => {
    return (
        <div className="flex">
            <h2 style={{ marginLeft: "10vw", marginTop: "4vh", textAlign: "left" }}>Theme:</h2>
            <ThemeProvider>
                <Button
                    onClick={() => props.changeTheme("dark")}
                    id="color-palette"
                    style={{ backgroundColor: "#3700b3" }}
                />
            </ThemeProvider>
            <ThemeProvider>
                <Button
                    onClick={() => props.changeTheme("light")}
                    id="color-palette"
                    style={{ backgroundColor: "#2e7d32" }}
                />
            </ThemeProvider>
        </div>
    );
};

const SettingsPage = () => {
    const [theme, setTheme] = useContext(ThemeContext);
    const [profilePic, setProfilePic] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await DotoService.getUserInfo();
            setTheme(userInfo.themePreference);
            setProfilePic(userInfo.picture);
            setName(userInfo.name);
            setEmail(userInfo.email);
        };
        fetchUserInfo();
    });

    const changeTheme = newTheme => {
        DotoService.updateUserInfo(newTheme);
        setTheme(newTheme);
    };

    return (
        <div className="page-layout">
            <div
                className={classnames("left-side-bar", theme === "dark" ? "left-side-bg-blue" : "left-side-bg-green")}
            />
            <span className="content-container">
                <Header title="Settings" />
                <div
                    className={classnames(
                        "right-side-bar",
                        theme === "dark" ? "right-side-bg-blue" : "right-side-bg-green",
                    )}
                >
                    <ProfilePhoto profilePic={profilePic} />
                    <InputNameField name={name} />
                    <InputEmailField email={email} />

                    <ThemePicker changeTheme={changeTheme} />
                    <WorkingHoursPicker />
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
