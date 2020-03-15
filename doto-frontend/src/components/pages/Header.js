import React from "react";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Header.css";

const MenuBar = props => {
    return (
        <div>
            <h1>{/* {props.title} */}</h1>
            <h1>
                <AccountCircleIcon className="App" />
                <SettingsIcon className="App" />
                <DateRangeIcon className="App" />
            </h1>
        </div>
    );
};

export default MenuBar;
