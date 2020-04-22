import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ScoreIcon from "@material-ui/icons/Score";
import AddIcon from "@material-ui/icons/Add";
import PieChartIcon from "@material-ui/icons/PieChart";
import ModalContent from "../../ModalContent";
import ProductivityScore from "../../ProductivityScore";
import CalendarComponent from "./CalendarComponent";
import CalendarListView from "./CalendarListView";
import UserStats from "../../UserStats";
import Header from "../Header";
import { ThemeContext } from "../../../context/ThemeContext";
import { addTaskToSchedule } from "./TaskScheduler";
import DotoService from "../../../helpers/DotoService";
import "./Calendar.css";
import "../Pages.css";
import { v4 as uuidv4 } from "uuid";
import { Themes } from "../../../constants/Themes";

const classnames = require("classnames");

// This file bases the basic functionality of a calendar page, rendering a calendar with relevant added tasks.
// Also handling list view of tasks to-do-today
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
    const [isOpenScore, setIsOpenScore] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [statsOpen, setStatsOpen] = useState(false);
    const [theme, setTheme] = useContext(ThemeContext);

    const handleIsScoreOpen = () => {
        if (isOpenScore) {
            setIsOpenScore(false);
        } else {
            setIsOpenScore(true);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStatsOpen = () => {
        if (statsOpen) {
            setStatsOpen(false);
        } else {
            setStatsOpen(true);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await DotoService.getTasks();
            setTasks(tasks);
        };
        const fetchUserInfo = async () => {
            const userInfo = await DotoService.getUserInfo();
            setTheme(userInfo.themePreference);
        };
        fetchUserInfo();
        fetchTasks();
    }, [setTheme]);

    // Adds new task based on input fields from Modal
    const addNewTask = (newTask, currentDate) => {
        const { newTaskOrder, updatedTask } = addTaskToSchedule(newTask, tasks, currentDate);
        newTask.taskId = uuidv4();
        setTasks(newTaskOrder);
        handleClose();

        DotoService.setNewTask(updatedTask);
    };

    const deleteTask = async taskId => {
        const taskList = [...tasks];
        const index = taskList.findIndex(task => task.taskId === taskId);
        taskList.splice(index, 1);
        setTasks(taskList);

        await DotoService.deleteTask(taskId);
    };

    const handleTaskStatusUpdated = taskId => {
        const newTasks = [...tasks];
        const taskToUpdate = newTasks.find(task => task.taskId === taskId);
        taskToUpdate.isComplete = !taskToUpdate.isComplete;
        DotoService.updateTask(taskToUpdate);
        setTasks(newTasks);
    };

    return (
        <div className="page-layout">
            <div
                className={classnames(
                    "left-side-bar",
                    theme === Themes.DARK ? "left-side-bg-blue" : "left-side-bg-green",
                )}
            />
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
                            {/* Toggle on list view icon to show/hide to-do tasks */}
                            {!listView && <FormatListBulletedIcon />}
                            {listView && <CalendarTodayIcon />}
                        </Fab>
                    </Tooltip>
                </div>
                <div className="mb-3">
                    <Tooltip title="View Your Stats">
                        <Fab onClick={handleStatsOpen} size="small">
                            <PieChartIcon />
                        </Fab>
                    </Tooltip>
                </div>
                <div className="mb-3">
                    <Tooltip title="Productivity Score View">
                        <Fab onClick={handleIsScoreOpen} size="small">
                            <ScoreIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </div>
            <span className="content-container">
                <Header title="Calendar" />
                <div className="flex">
                    <div className="calendar-component">
                        <CalendarComponent
                            tasks={tasks}
                            onTaskDeleted={deleteTask}
                            onTaskStatusUpdated={handleTaskStatusUpdated}
                        />
                    </div>
                    {listView && <CalendarListView tasks={tasks} onTaskStatusUpdated={handleTaskStatusUpdated} />}
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
                    {/* Transition effects for list view of to-do tasks for today */}
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <ModalContent addNewTask={addNewTask} modalBackground={theme} />
                        </div>
                    </Fade>
                </Modal>
                <Modal
                    aria-labelledby="stats-modal"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={statsOpen}
                    onClose={handleStatsOpen}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={statsOpen}>
                        <div className={classes.paper}>
                            <UserStats
                                modalBackground={theme}
                                // TODO: get real values for these.
                                tasksCompleted="5"
                                hoursWorked="10.5"
                                dayRecord="4"
                                highTasks="2"
                                medTasks="2"
                                lowTasks="1"
                            />
                        </div>
                    </Fade>
                </Modal>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={isOpenScore}
                    onClose={handleIsScoreOpen}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {/* Transition effects for list view of to-do tasks for today */}
                    <Fade in={isOpenScore}>
                        <div className={classes.paper}>
                            <ProductivityScore />
                        </div>
                    </Fade>
                </Modal>
            </span>
        </div>
    );
};

export default Calendar;
