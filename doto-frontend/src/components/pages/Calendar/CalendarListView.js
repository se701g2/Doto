/* eslint-disable react/prop-types */
import React from "react";
import Radio from "@material-ui/core/Radio";
import "./Calendar.css";

const CalendarListView = ({ tasks }) => {
    return (
        <div className="list-view">
            <div className="ml-3 mb-5 text-4xl font-bold">Tasks for Today</div>
            {tasks.map(task => {
                return (
                    <div key className="list-view-components">
                        <Radio
                            disableRipple
                            checkedIcon={<span className={"radio-checked bg-" + task.color + "-600"} />}
                            icon={<span className="radio-unchecked" />}
                        />
                        <div className="text-base">{task.title}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default CalendarListView;
