import React, { useState, useContext } from "react";
import "date-fns";

import { FormControl, Button, Input, InputLabel, InputAdornment, Avatar } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import EmailIcon from "@material-ui/icons/Email";
import { ThemeProvider } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import Header from "../Header";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import "./SettingsPage.css";
import "../Pages.css";
import { ThemeContext } from "../../../context/ThemeContext";

const classnames = require("classnames");

const InputNameField = () => {
    return (
        <FormControl id="input-field">
            <InputLabel>Name</InputLabel>
            <Input
                startAdornment={
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

const InputEmailField = () => {
    return (
        <FormControl id="input-field">
            <InputLabel>Email</InputLabel>
            <Input
                startAdornment={
                    <InputAdornment position="start">
                        <EmailIcon />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

const UploadPhoto = () => {
    return (
        <div className="flex">
            <Avatar id="profile-photo" alt="John Smith" src="/upload.jpg" variant="square" />
            <input id="upload-photo" type="file" />
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

const SettingsPage = () => {
    const [theme, setTheme] = useContext(ThemeContext);
    const ThemePicker = () => {
        return (
            <div className="flex">
                <h2 style={{ marginLeft: "10vw", marginTop: "4vh", textAlign: "left" }}>Theme:</h2>
                <ThemeProvider>
                    <Button onClick={() => setTheme(true)} id="color-palette" style={{ backgroundColor: "#3700b3" }} />
                </ThemeProvider>
                <ThemeProvider>
                    <Button onClick={() => setTheme(false)} id="color-palette" style={{ backgroundColor: "#2e7d32" }} />
                </ThemeProvider>
            </div>
        );
    };

    return (
        <div className="PageLayout">
            <div className={classnames("left-side-bar", theme ? "left-side-bg-blue" : "left-side-bg-green")} />
            <span className="content-container">
                <Header title="Settings" />
                <div className={classnames("right-side-bar", theme ? "right-side-bg-blue" : "right-side-bg-green")}>
                    <InputNameField />
                    <InputEmailField />
                    <UploadPhoto />
                    <ThemePicker />
                    <WorkingHoursPicker />
                </div>
            </span>
        </div>
    );
};

export default SettingsPage;
