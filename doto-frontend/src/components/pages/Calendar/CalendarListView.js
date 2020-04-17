import React from "react";
import "./Calendar.css";
import PropTypes from "prop-types";
import { Checkbox } from "@material-ui/core";

// This file provides a checklist of items on today's to-do list. The user is able to select tasks completed for the day
const CalendarListView = props => {
    const today = new Date();

    return (
        <div className="list-view">
            <div className="md:ml-3 md:mb-5 text-4xl font-bold">Tasks for Today</div>

            {props.tasks.map(task => {
                const dueDate = new Date(task.endDate);
                const taskComplete = task.isComplete;
                // Checks to see if scheduled task is for today
                const isTaskScheduledToday =
                    dueDate.getYear() === today.getYear() && dueDate.getMonth() === today.getMonth()
                        ? dueDate.getDate() === today.getDate()
                        : false;
                // If the task is scheduled for today, add it as an item in the checklist of things to do today
                return (
                    isTaskScheduledToday && (
                        <div key={task.taskId} className="list-view-components">
                            <Checkbox
                                checked={taskComplete}
                                color="primary"
                                onChange={() => props.onTaskStatusUpdated(task.taskId)}
                            />
                            <div className={taskComplete ? "isComplete" : ""}>{task.title}</div>
                        </div>
                    )
                );
            })}
        </div>
    );
};

CalendarListView.propTypes = {
    tasks: PropTypes.array.isRequired,
};
export default CalendarListView;
