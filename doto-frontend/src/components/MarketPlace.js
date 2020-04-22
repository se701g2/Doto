/* @author: Utsav Trivedi */
import React from "react";
// import { Button } from "@material-ui/core";
// import { ThemeProvider } from "@material-ui/core/styles";
import "./MarketPlace.css";
// import LockedThemes from "../constants/Themes";
// import lockImage from "./images/lock.png";
import AvailableTheme from "./AvailableTheme";

// @ref https://www.w3schools.com/colors/colors_names.asp
const themeCost = {
    blue: 0,
    green: 0,
    gray: 300,
    magenta: 100,
    purple: 200,
    crimson: 300,
    black: 400,
    red: 500,
    darkSeaGreen: 600,
    antiqueWhite: 700,
    darkKhaki: 800,
    darkSlateBlue: 900,
};

const MarketPlace = props => {
    /**
     * @detail Returns theme colour and cost in JSON to SettingsPage onClick.
     *         TODO: Add lock/unlock
     */
    // console.log(LockedThemes.state.blue, LockedThemes.state.green);

    return (
        <div>
            <div className="market-content-box">
                <AvailableTheme
                    colour="blue"
                    cost={themeCost.blue}
                    htmlColour="#3700b3"
                    handleThemeClick={props.handleThemeClick}
                />
                <AvailableTheme
                    colour="green"
                    cost={themeCost.green}
                    htmlColour="#2e7d32"
                    handleThemeClick={props.handleThemeClick}
                />
                <AvailableTheme
                    colour="gray"
                    cost={themeCost.gray}
                    htmlColour="gray"
                    handleThemeClick={props.handleThemeClick}
                />
                <AvailableTheme
                    colour="magenta"
                    cost={themeCost.magenta}
                    htmlColour="magenta"
                    handleThemeClick={props.handleThemeClick}
                />

                <br></br>

                <AvailableTheme
                    colour="purple"
                    cost={themeCost.purple}
                    htmlColour="purple"
                    handleThemeClick={props.handleThemeClick}
                />
                <AvailableTheme
                    colour="crimson"
                    cost={themeCost.crimson}
                    htmlColour="crimson"
                    handleThemeClick={props.handleThemeClick}
                />
                <AvailableTheme
                    colour="red"
                    cost={themeCost.red}
                    htmlColour="red"
                    handleThemeClick={props.handleThemeClick}
                />
                <AvailableTheme
                    colour="black"
                    cost={themeCost.black}
                    htmlColour="black"
                    handleThemeClick={props.handleThemeClick}
                />

                <br></br>

                <AvailableTheme
                    colour="darkSeaGreen"
                    cost={themeCost.darkSeaGreen}
                    htmlColour="darkSeaGreen"
                    handleThemeClick={props.handleThemeClick}
                />
                <AvailableTheme
                    colour="antiqueWhite"
                    cost={themeCost.antiqueWhite}
                    htmlColour="antiqueWhite"
                    handleThemeClick={props.handleThemeClick}
                />
                <AvailableTheme
                    colour="darkKhaki"
                    cost={themeCost.darkKhaki}
                    htmlColour="darkKhaki"
                    handleThemeClick={props.handleThemeClick}
                />
                <AvailableTheme
                    colour="darkSlateBlue"
                    cost={themeCost.darkSlateBlue}
                    htmlColour="darkSlateBlue"
                    handleThemeClick={props.handleThemeClick}
                />
            </div>
        </div>
    );
};

export default MarketPlace;
