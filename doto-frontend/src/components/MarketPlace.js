import React from "react";
import "./MarketPlace.css";
import AvailableTheme from "./AvailableTheme";

// @ref https://www.w3schools.com/colors/colors_names.asp
const themeCost = {
    blue: 0,
    green: 20,
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
    const unlockedItems = new Set(props.unlockedItems);
    return (
        <div>
            <div className="market-content-box">
                <AvailableTheme
                    colour="blue"
                    cost={themeCost.blue}
                    htmlColour="#3700b3"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={false}
                />
                <AvailableTheme
                    colour="green"
                    cost={themeCost.green}
                    htmlColour="#2e7d32"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={!unlockedItems.has("green")}
                />
                <AvailableTheme
                    colour="gray"
                    cost={themeCost.gray}
                    htmlColour="gray"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={!unlockedItems.has("gray")}
                />
                <AvailableTheme
                    colour="magenta"
                    cost={themeCost.magenta}
                    htmlColour="magenta"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={!unlockedItems.has("magenta")}
                />

                <br></br>

                <AvailableTheme
                    colour="purple"
                    cost={themeCost.purple}
                    htmlColour="purple"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={!unlockedItems.has("purple")}
                />
                <AvailableTheme
                    colour="crimson"
                    cost={themeCost.crimson}
                    htmlColour="crimson"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={!unlockedItems.has("crimson")}
                />
                <AvailableTheme
                    colour="red"
                    cost={themeCost.red}
                    htmlColour="red"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={!unlockedItems.has("red")}
                />
                <AvailableTheme
                    colour="black"
                    cost={themeCost.black}
                    htmlColour="black"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={!unlockedItems.has("black")}
                />

                <br></br>

                <AvailableTheme
                    colour="darkSeaGreen"
                    cost={themeCost.darkSeaGreen}
                    htmlColour="darkSeaGreen"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={!unlockedItems.has("darkSeaGreen")}
                />
                <AvailableTheme
                    colour="antiqueWhite"
                    cost={themeCost.antiqueWhite}
                    htmlColour="antiqueWhite"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={!unlockedItems.has("antiqueWhite")}
                />
                <AvailableTheme
                    colour="darkKhaki"
                    cost={themeCost.darkKhaki}
                    htmlColour="darkKhaki"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={!unlockedItems.has("darkKhaki")}
                />
                <AvailableTheme
                    colour="darkSlateBlue"
                    cost={themeCost.darkSlateBlue}
                    htmlColour="darkSlateBlue"
                    handleThemeClick={props.handleThemeClick}
                    buyItem={props.buyItem}
                    locked={!unlockedItems.has("darkSlateBlue")}
                />
            </div>
        </div>
    );
};

export default MarketPlace;
