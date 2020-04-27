import React from "react";
import { Themes } from "../constants/Themes";
import PieChart from "react-minimal-pie-chart";
import StarIcon from "@material-ui/icons/Star";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import "./UserStats.css";

const UserStats = props => {
    var highColor = "#2F7D32";
    var medColor = "#3bb300";
    var lowColor = "#41d900";
    if (props.modalBackground === Themes.DARK) {
        highColor = "#3700b3";
        medColor = "#6c00d3";
        lowColor = "#cf00ff";
    }
    var highPriority = props.priorityStats[0];
    var medPriority = props.priorityStats[1];
    var lowPriority = props.priorityStats[2];
    var total = highPriority + medPriority + lowPriority;
    return (
        // Setting .css properties based on theme selected

        <div className={props.modalBackground === Themes.DARK ? "modal-p" : "modal-g"}>
            <div className="title">
                <h2>
                    <b>Your Stats</b>
                </h2>
            </div>
            <div className="stats-content">
                <div className="stats-row">
                    <div className="stats-graphic">
                        <PieChart
                            totalValue={total}
                            data={[
                                { title: "High Priority", value: highPriority, color: highColor },
                                { title: "Medium Priority", value: medPriority, color: medColor },
                                { title: "Low Priority", value: lowPriority, color: lowColor },
                            ]}
                        />
                    </div>
                    <div className="stats-text">
                        <p>
                            <b>{total}</b> Tasks Completed
                        </p>
                        <p>
                            High Priority:
                            <b>
                                <font color={highColor}>{highPriority}</font>
                            </b>
                        </p>
                        <p>
                            Medium Priority:
                            <b>
                                <font color={medColor}>{medPriority}</font>
                            </b>
                        </p>
                        <p>
                            Low Priority:
                            <b>
                                <font color={lowColor}>{lowPriority}</font>
                            </b>
                        </p>
                    </div>
                </div>
                <div className="stats-row">
                    <div className="stats-graphic">
                        <AccessTimeIcon></AccessTimeIcon>
                    </div>
                    <div className="stats-text">
                        <p>
                            <b>{props.hoursWorked}</b> Hours Worked
                        </p>
                    </div>
                </div>
                <div className="stats-row">
                    <div className="stats-graphic">
                        <StarIcon></StarIcon>
                    </div>
                    <div className="stats-text">
                        <p>
                            1-Day Record: <b>{props.dayRecord}</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStats;
