import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { blue, yellow } from "@material-ui/core/colors";
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
import Points from "../../Points";
import Streak from "../../Streak";
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
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        boxShadow: theme.shadows[5],
    },
    shadow: {
        color: theme.palette.getContrastText(yellow[500]),
        boxShadow: theme.shadows[5],
        borderRadius: "50%",
    },
}));

const Calendar = () => {
    var pointRef = React.createRef();
    var streakRef = React.createRef();

    const classes = useStyles();
    const [listView, setListView] = useState();
    const [isOpenScore, setIsOpenScore] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [statsOpen, setStatsOpen] = useState(false);
    const [theme, setTheme] = useContext(ThemeContext);
    const [priorityStats, setPriorityStats] = useState([]);

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
            var medTasks = tasks.filter(function(task) {
                return task.priority === 20 && task.isComplete;
            });
            var lowTasks = tasks.filter(function(task) {
                return task.priority === 30 && task.isComplete;
            });
            var highTasks = tasks.filter(function(task) {
                return task.priority === 10 && task.isComplete;
            });
            setPriorityStats([highTasks.length, medTasks.length, lowTasks.length]);
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
        newTask.id = newTask.taskId;
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

        // update points
        // if duration is passed in, use that, otherwise calculate it from start and end dates
        const minutes = taskToUpdate.duration
            ? taskToUpdate.duration
            : Math.abs(taskToUpdate.startDate - taskToUpdate.endDate) / 1000 / 60;
        // if task is completed, increase points, otherwise, decrease points
        taskToUpdate.isComplete ? pointRef.current.changePoints(-minutes) : pointRef.current.changePoints(minutes);

        // update task
        taskToUpdate.isComplete = !taskToUpdate.isComplete;
        DotoService.updateTask(taskToUpdate);
        setTasks(newTasks);

        // update streak
        streakRef.current.updateStreak();
    };

    const onCommitChanges = ({ added, changed, deleted }) => {
        // Currently adding and deleting are both no-ops
        // TODO - consider refactoring adding and deleting to use built-in components and pass logic through here
        if (changed) {
            const updatedTasks = tasks.map(task => {
                if (changed[task.id]) {
                    const { startDate: newStartDate } = changed[task.id];
                    const { reminderDate, startDate: oldStartDate } = task;
                    if (newStartDate && reminderDate) {
                        // Offset the reminder date by the difference of the start dates
                        task.reminderDate = new Date(reminderDate.getTime() + (newStartDate - oldStartDate));
                    }
                    const updatedTask = { ...task, ...changed[task.id] };
                    updatedTask.duration = Math.ceil((updatedTask.endDate - updatedTask.startDate) / 60000);
                    DotoService.updateTask(updatedTask);
                    return updatedTask;
                }
                return task;
            });
            updatedTasks.sort((a, b) => a.startDate - b.startDate);
            setTasks(updatedTasks);
        }
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
                            {listView ? <CalendarTodayIcon /> : <FormatListBulletedIcon />}
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
                <div>
                    <h2>Points</h2>
                    <Points ref={pointRef} avatarClass={classes.blue} />
                </div>
                <div>
                    <Streak tasks={[...tasks]} ref={streakRef} />
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
                            onCommitChanges={onCommitChanges}
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
                                hoursWorked="10.5"
                                dayRecord="4"
                                priorityStats={priorityStats}
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
