/* eslint-disable react/prop-types */
import React from "react";
import Radio from "@material-ui/core/Radio";
import "./Calendar.css";

const CalendarListView = ({ tasks }) => {
    const today = new Date();

    return (
        <div className="list-view">
            <div className="ml-3 mb-5 text-4xl font-bold">Tasks for Today</div>
            {tasks.map(task => {
                const isTaskToday =
                    task.dueDate.getYear() === today.getYear() && task.dueDate.getMonth() === today.getMonth()
                        ? task.dueDate.getDate() === today.getDate()
                        : false;

                return (
                    isTaskToday && (
                        <div key className="list-view-components">
                            <Radio
                                disableRipple
                                checkedIcon={
                                    <span
                                        className={"radio-checked bg-" + (task.color ? task.color : "blue") + "-600"}
                                    />
                                }
                                icon={<span className="radio-unchecked" />}
                            />
                            <div className="text-base">{task.title}</div>
                        </div>
                    )
                );
            })}
        </div>
    );
};

export default CalendarListView;
