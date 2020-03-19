import React from "react";
import PropTypes from "prop-types";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
    return (
        <nav>
            <h1 className="Title">{title}</h1>

            <ul className="IconList">
                <Tooltip title="Log Out" onClick={() => console.log("logged out")}>
                    <li className="Account">
                        <Link to="/login">
                            <ExitToAppIcon className="IconLarge" />
                        </Link>
                    </li>
                </Tooltip>
                <Tooltip title="Settings">
                    <li className="IconList">
                        <Link to="/settings">
                            <SettingsIcon className="IconLarge" />
                        </Link>
                    </li>
                </Tooltip>
                <Tooltip title="Calender">
                    <li className="IconList">
                        <Link to="/calendar">
                            <DateRangeIcon className="IconLarge" />
                        </Link>
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
