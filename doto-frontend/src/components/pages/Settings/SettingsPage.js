import React from "react";
import "date-fns";
import "./SettingsPage.css";
import { FormControl, Button, Input, InputLabel, InputAdornment, Avatar } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import EmailIcon from "@material-ui/icons/Email";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";

const theme1 = createMuiTheme({
    palette: {
        primary: {
            main: "#3700B3",
        },
        secondary: {
            main: "#7cb342",
        },
    },
});

const SettingsPage = () => {
    const [selectedStartTime, setSelectedStartTime] = React.useState(new Date("2020-03-15T09:00:00"));
    const [selectedEndTime, setSelectedEndTime] = React.useState(new Date("2020-03-15T17:00:00"));

    const handleStartTimeChange = date => {
        setSelectedStartTime(date);
    };

    const handleEndTimeChange = date => {
        setSelectedEndTime(date);
    };

    return (
        <div className="SettingsPage">
            <div className="left-side-bar" />
            <div className="right-side-bar">
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

                <div className="column-fields">
                    <Avatar id="profile-photo" alt="John Smith" src="/upload.jpg" variant="square" />
                    <Button id="upload-photo" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload Photo
                    </Button>
                </div>

                <div className="column-fields">
                    <h2 style={{ marginLeft: "10vw", marginTop: "4vh", textAlign: "left" }}>Theme:</h2>
                    <div>
                        <ThemeProvider theme={theme1}>
                            <Button id="color-palette" variant="contained" color="primary"></Button>
                        </ThemeProvider>
                        <ThemeProvider theme={theme1}>
                            <Button id="color-palette" variant="contained" color="secondary"></Button>
                        </ThemeProvider>
                    </div>
                </div>

                <div className="column-fields">
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

                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    style={{ width: "200px", marginLeft: "70vw", marginTop: "2vh" }}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default SettingsPage;
