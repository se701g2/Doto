import React from "react";
import "./Calendar.css";
import PropTypes from "prop-types";
import { Checkbox } from "@material-ui/core";

const isToday = ({ endDate }) => {
    const today = new Date();
    return (
        endDate.getYear() === today.getYear() &&
        endDate.getMonth() === today.getMonth() &&
        endDate.getDate() === today.getDate()
    );
};

// This file provides a checklist of items on today's to-do list. The user is able to select tasks completed for the day
const CalendarListView = props => {
    return (
        <div className="list-view">
            <div className="md:ml-3 md:mb-5 text-4xl font-bold">Tasks for Today</div>

            {props.tasks.filter(isToday).map(task => (
                <div key={task.taskId} className="list-view-components">
                    <Checkbox
                        checked={task.isComplete}
                        color="primary"
                        onChange={() => props.onTaskStatusUpdated(task.taskId)}
                    />
                    <div className={task.isComplete ? "isComplete" : ""}>{task.title}</div>
                </div>
            ))}
        </div>
    );
};

CalendarListView.propTypes = {
    tasks: PropTypes.array.isRequired,
};
export default CalendarListView;
