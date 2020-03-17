import React from "react";
import PropTypes from "prop-types";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import "./Header.css";

const Header = ({ title }) => {
    return (
        <nav>
            <h1 className="Title">{title}</h1>

            <ul className="IconList">
                <Tooltip title="Log Out">
                    <li className="Account">
                        <a href="/Login/Login">
                            <ExitToAppIcon className="IconLarge" />
                        </a>
                    </li>
                </Tooltip>
                <Tooltip title="Settings">
                    <li className="IconList">
                        <a href="/Settings/SettingsPage">
                            <SettingsIcon className="IconLarge" />
                        </a>
                    </li>
                </Tooltip>
                <Tooltip title="Calender">
                    <li className="IconList">
                        <a href="/Calendar/Calendar">
                            <DateRangeIcon className="IconLarge" />
                        </a>
                    </li>
                </Tooltip>
            </ul>
        </nav>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
