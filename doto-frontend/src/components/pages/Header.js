import React from "react";
import PropTypes from "prop-types";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Header.css";

const Header = ({ title }) => {
    return (
        <nav>
            <h1 className="Title">{title}</h1>

            <ul className="IconList">
                <li className="Account">
                    <AccountCircleIcon className="IconLarge" />
                </li>
                <li className="IconList">
                    <a href="/Settings/SettingsPage">
                        <SettingsIcon className="IconLarge" />
                    </a>
                </li>
                <li className="IconList">
                    <a href="/Calendar/Calendar">
                        <DateRangeIcon className="IconLarge" />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
