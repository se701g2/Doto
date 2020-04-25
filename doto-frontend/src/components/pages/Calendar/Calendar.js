import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AddIcon from "@material-ui/icons/Add";
import ModalContent from "../../ModalContent";
import CalendarComponent from "./CalendarComponent";
import CalendarListView from "./CalendarListView";
import Header from "../Header";
import { ThemeContext } from "../../../context/ThemeContext";
import { addTaskToSchedule } from "./TaskScheduler";
import DotoService from "../../../helpers/DotoService";
import "./Calendar.css";
import "../Pages.css";
import { v4 as uuidv4 } from "uuid";
import { Themes } from "../../../constants/Themes";
import { ActiveHoursContext } from "../../../context/ActiveHoursContext";

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
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useContext(ThemeContext);
    const { activeHoursStart, activeHoursEnd } = useContext(ActiveHoursContext);
    const [startTime, setStartTime] = activeHoursStart;
    const [endTime, setEndTime] = activeHoursEnd;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await DotoService.getTasks();
            setTasks(tasks);
        };
        const fetchUserInfo = async () => {
            const userInfo = await DotoService.getUserInfo();
            setTheme(userInfo.themePreference);
            setStartTime(userInfo.startTime);
            setEndTime(userInfo.endTime);
        };
        fetchUserInfo();
        fetchTasks();
    }, [setTheme, setStartTime, setEndTime]);

    // Adds new task based on input fields from Modal
    const addNewTask = async newTask => {
        const { newTaskOrder, updatedTask } = addTaskToSchedule(newTask, tasks, new Date(startTime), new Date(endTime));
        newTask.taskId = uuidv4();
        newTask.id = newTask.taskId;
        setTasks(newTaskOrder);
        handleClose();
        await DotoService.setNewTask(updatedTask);
    };

    const deleteTask = async taskId => {
        const taskList = [...tasks];
        const index = taskList.findIndex(task => task.taskId === taskId);
        taskList.splice(index, 1);
        setTasks(taskList);

        await DotoService.deleteTask(taskId);
    };

    const handleTaskStatusUpdated = async taskId => {
        const newTasks = [...tasks];
        const taskToUpdate = newTasks.find(task => task.taskId === taskId);
        taskToUpdate.isComplete = !taskToUpdate.isComplete;
        await DotoService.updateTask(taskToUpdate);
        setTasks(newTasks);
    };

    const handleTaskUpdated = async task => {
        const taskList = [...tasks];
        const index = taskList.findIndex(currentTask => currentTask.taskId === task.taskId);
        taskList.splice(index, 1);
        const { newTaskOrder, updatedTask } = addTaskToSchedule(task, taskList, new Date());
        setTasks(newTaskOrder);
        await DotoService.deleteTask(task.taskId);
        await DotoService.setNewTask(updatedTask);
        document.getElementById("grid").click(); // Debt: force close tool tip due to state not being updated
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
                            {/* Toggle on list view icon to show/hide to-do tasks */}
                            {!listView && <FormatListBulletedIcon />}
                            {listView && <CalendarTodayIcon />}
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
                            onTaskUpdated={handleTaskUpdated}
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
            </span>
        </div>
    );
};

export default Calendar;
