import CookieManager from "./CookieManager";
import axios from "axios";

// This file integrates the front-end and back-end together using GET and POST methods.
const baseUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://doto-backend.azurewebsites.net";

const taskMapper = data => {
    return {
        taskId: data.taskId,
        title: data.title,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        ...(data.description && { description: data.description }),
        ...(data.priority && { priority: data.priority }),
        ...(data.location && { location: data.location }),
        isComplete: data.isComplete,
        dueDate: data.dueDate,
    };
};

const DotoService = {
    getTasks: async () => {
        const path = baseUrl + "/task/get";

        try {
            const response = await axios.get(path, {
                headers: { Authorization: "Bearer " + CookieManager.get("jwt") },
            });

            const tasks = response.data.map(task => taskMapper(task));
            return tasks;
        } catch (e) {
            // TODO: Check for errors
            console.log(e);
        }
    },
    updateTask: async task => {
        const updatedTask = {
            user: CookieManager.get("email"),
            ...task,
        };
        axios({
            method: "put",
            url: baseUrl + `/task/${task.taskId}`,
            headers: { Authorization: "Bearer " + CookieManager.get("jwt") },
            data: updatedTask,
        });

        // TODO: add error handling
    },
    setNewTask: async task => {
        const newTask = {
            user: CookieManager.get("email"),
            taskId: task.taskId,
            title: task.title,
            dueDate: task.dueDate.toString(),
            startDate: task.startDate.toString(),
            endDate: task.endDate.toString(),
            duration: task.duration,
            ...(task.reminderDate && { reminderDate: task.reminderDate.toString() }),
            ...(task.description && { description: task.description }),
            ...(task.priority && { priority: task.priority }),
            ...(task.location && { location: task.location }),
            isComplete: false,
        };

        axios({
            method: "post",
            url: baseUrl + "/task/post",
            headers: { Authorization: "Bearer " + CookieManager.get("jwt") },
            data: newTask,
        });

        // TODO: catch for errors depending if it didn't post properly or maybe retry mechanism
    },
    deleteTask: async taskId => {
        axios({
            method: "delete",
            url: baseUrl + `/task/${taskId}`,
            headers: { Authorization: "Bearer " + CookieManager.get("jwt") },
        });
    },
    getUserInfo: async () => {
        const path = baseUrl + "/user/get";

        try {
            const response = await axios.get(path, {
                headers: { Authorization: "Bearer " + CookieManager.get("jwt") },
            });
            const userInfo = response.data;
            return userInfo;
        } catch (e) {
            // TODO: Check for errors
            console.log(e);
        }
    },
    updateUserInfo: async theme => {
        const updatedUserInfo = {
            user: CookieManager.get("email"),
            themePreference: theme,
        };

        axios({
            method: "put",
            url: baseUrl + "/user/update",
            headers: { Authorization: "Bearer " + CookieManager.get("jwt") },
            data: updatedUserInfo,
        });

        // TODO: catch for errors depending if it didn't post properly or maybe retry mechanism
    },
    subscribeToReminders: async subscription => {
        axios({
            method: "post",
            url: baseUrl + "/reminders/subscribe",
            headers: { Authorization: "Bearer " + CookieManager.get("jwt") },
            data: subscription,
        });
    },
};

export default DotoService;
