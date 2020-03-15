import React from "react";
import Radio from "@material-ui/core/Radio";
import "./Calendar.css";

const TaskInfo = ({ appointments }) => {
    appointments.map(appointment => {
        return (
            <div key className="list-view-components">
                <Radio
                    disableRipple
                    checkedIcon={<span className={"radio-checked bg-" + appointment.color + "-600"} />}
                    icon={<span className="radio-unchecked" />}
                />
                <div className="text-base">{appointment.title}</div>
            </div>
        );
    });
};

// eslint-disable-next-line react/prop-types
const CalendarListView = ({ appointments }) => {
    return (
        <div className="list-view">
            <div className="ml-3 mb-5 text-4xl font-bold">Tasks for Today</div>
            <TaskInfo appointments={appointments} />
        </div>
    );
};

export default CalendarListView;
