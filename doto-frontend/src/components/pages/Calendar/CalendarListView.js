import React from "react";
import Radio from "@material-ui/core/Radio";
import "./Calendar.css";
import PropTypes from "prop-types";

const CalendarListView = props => {
    const today = new Date();

    return (
        <div className="list-view">
            <div className="ml-3 mb-5 text-4xl font-bold">Tasks for Today</div>

            {props.tasks.map(task => {
                const dueDate = new Date(task.endDate);
                const isTaskScheduledToday =
                    dueDate.getYear() === today.getYear() && dueDate.getMonth() === today.getMonth()
                        ? dueDate.getDate() === today.getDate()
                        : false;

                return (
                    isTaskScheduledToday && (
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

CalendarListView.propTypes = {
    tasks: PropTypes.array.isRequired,
};

export default CalendarListView;
