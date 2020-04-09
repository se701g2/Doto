import React from "react";
import PropTypes from "prop-types";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import { Grid } from "@material-ui/core"
import "./Header.css";
import { Link } from "react-router-dom";
import CookieManager from "../../helpers/CookieManager";

// A common header file for the page titles with associated links to settings, calendar and logout pages.
// This file takes the input of the page name as a prop.
const Header = props => {
    return (
        <nav>
            <h1 className="Title">{props.title}</h1>
            <Grid container spacing={3} alignItems="center" justify="flex-end" style={{
                marginRight: '10vw',
            }}>
                {/* Tooltips used to enhance user-experience and user-friendliness */}
                {/* Clears google-email cookies on logout */}
                <Tooltip title="Calendar">
                    <Grid item>
                        <Link to="/calendar">
                            <DateRangeIcon className="IconLarge" />
                        </Link>
                    </Grid>
                </Tooltip>
                <Tooltip title="Settings">
                    <Grid item>
                        <Link to="/settings">
                            <SettingsIcon className="IconLarge" />
                        </Link>
                    </Grid>
                </Tooltip>
                <Tooltip title="Log Out" onClick={() => CookieManager.clearAll()}>
                    <Grid item>
                        <Link to="/login">
                            <ExitToAppIcon className="IconLarge" />
                        </Link>
                    </Grid>
                </Tooltip>
            </Grid>
            {/* <ul className="IconList">
                <Tooltip title="Log Out" onClick={() => CookieManager.clearAll()}>
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
            </ul> */}
        </nav>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
