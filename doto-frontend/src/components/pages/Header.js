import React from "react";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Header.css";

const MenuBar = props => {
    return (
        <nav>
            {/* UNCOMMENT THIS TO SEE PAGE TITLE <h1 className="Title"> {props.title}</h1> */}

            <ul className="IconList">
                <li className="Account">
                    {" "}
                    <AccountCircleIcon className="IconLarge" />{" "}
                </li>
                <li className="IconList">
                    {" "}
                    <a href="/Settings">
                        {" "}
                        <SettingsIcon className="IconLarge" />{" "}
                    </a>{" "}
                </li>
                <li className="IconList">
                    {" "}
                    <a href="/Calendar">
                        {" "}
                        <DateRangeIcon className="IconLarge" />{" "}
                    </a>{" "}
                </li>
            </ul>
        </nav>
    );
};

export default MenuBar;
