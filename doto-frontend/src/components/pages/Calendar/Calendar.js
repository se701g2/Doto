import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalConent from "../../ModalContent";
import CalendarComponent from "./CalendarComponent";
import CalendarListView from "./CalendarListView";
import Fab from "@material-ui/core/Fab";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../Header";
import "./Calendar.css";
import "../Pages.css";

// const classnames = require("classnames");

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Calendar = () => {
    const classes = useStyles();
    const [listView, setListView] = useState();
    const [appointments, setAppointments] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const tempAppointments = [
            {
                title: "Lecture-1",
                descrition: "Lecture at Auckland Uni",
                startDate: new Date(2020, 2, 12, 9, 0), // 0 is January
                endDate: new Date(2020, 2, 12, 11, 0),
                id: 0,
                priority: 3,
                location: "Room 1",
                color: "blue",
            },
            {
                title: "Lecture-2",
                descrition: "Lecture at Auckland Uni",
                startDate: new Date(2020, 2, 10, 10, 0),
                endDate: new Date(2020, 2, 10, 12, 0),
                id: 1,
                priority: 2,
                location: "Room 2",
                color: "green",
            },
            {
                title: "James' Birthday",
                descrition: "James' day of birth",
                startDate: new Date(2020, 2, 13, 0, 0),
                endDate: new Date(2020, 2, 14, 0, 0),
                id: 2,
                priority: 1,
                location: "Room 3",
                color: "pink",
            },
        ];

        setAppointments(tempAppointments);
    }, []);

    return (
        <div className="PageLayout">
            {/* Wrong purple will change in next PR */}
            <div className="left-side-bar bg-purple-800" />
            {/* className={classnames("left-side-bar", theme ? "left-side-bg-blue" : "left-side-bg-green")} /> */}
            <div className="calendar-buttons">
                <div className="mb-3">
                    <Tooltip title="Add Task">
                        <Fab onClick={handleOpen} size="small">
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </div>
                <div className="mb-3">
                    <Tooltip title="List View">
                        <Fab onClick={() => setListView(!listView)} size="small">
                            {!listView && <FormatListBulletedIcon />}
                            {listView && <CalendarTodayIcon />}
                        </Fab>
                    </Tooltip>
                </div>
            </div>
            <span className="content-container">
                <Header title="Calendar" />
                <div className="flex">
                    <div className="Calendar">
                        <CalendarComponent appointments={appointments} />
                    </div>
                    {listView && <CalendarListView appointments={appointments} />}
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <ModalConent />
                        </div>
                    </Fade>
                </Modal>
            </span>
        </div>
    );
};

export default Calendar;
