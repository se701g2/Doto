import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalContent from "../../ModalContent";
import CalendarComponent from "./CalendarComponent";
import CalendarListView from "./CalendarListView";
import Fab from "@material-ui/core/Fab";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../Header";
import { addTaskToSchedule } from "./TaskScheduler";

import "./Calendar.css";
import "../Pages.css";
import { ThemeContext } from "../../../context/ThemeContext";
import DotoService from "../../../helpers/DotoService";

const classnames = require("classnames");

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
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [theme] = useContext(ThemeContext);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addTask = (newTask, currentDate) => {
        // Schedule the new task
        const { newTaskOrder, updatedTask } = addTaskToSchedule(newTask, tasks, currentDate);
        DotoService.setNewTask(updatedTask);
        setTasks(newTaskOrder);
        handleClose();
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await DotoService.getTasks();
            setTasks(tasks);
        };
        fetchTasks();
    }, []);

    return (
        <div className="PageLayout">
            <div className={classnames("left-side-bar", theme ? "left-side-bg-blue" : "left-side-bg-green")} />
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
                        <CalendarComponent tasks={tasks} />
                    </div>
                    {listView && <CalendarListView tasks={tasks} />}
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
                            <ModalContent addTask={addTask} modalBackground={theme} />
                        </div>
                    </Fade>
                </Modal>
            </span>
        </div>
    );
};

export default Calendar;
