import React from "react";

export const Themes = {
    LIGHT: "light",
    DARK: "dark",
};

// export const ThemeLocked = {
//     LIGHT: false,
//     DARK: true,
// };

class LockedThemes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blue: false,
            green: true,
            gray: true,
            magenta: true,
            purple: true,
            crimson: true,
            black: true,
            red: true,
            darkSeaGreen: true,
            antiqueWhite: true,
            darkKhaki: true,
            darkSlateBlue: true,
        };
    }

    unlockTheme(themeName) {
        switch (themeName) {
            case "blue":
                this.setState({
                    blue: false,
                });
                break;
            case "green":
                this.setState({
                    green: false,
                });
                break;
            case "gray":
                this.setState({
                    gray: false,
                });
                break;
            case "magenta":
                this.setState({
                    magenta: false,
                });
                break;
            case "purple":
                this.setState({
                    purple: false,
                });
                break;
            case "crimson":
                this.setState({
                    crimson: false,
                });
                break;
            case "black":
                this.setState({
                    black: false,
                });
                break;
            case "red":
                this.setState({
                    red: false,
                });
                break;
            case "darkSeaGreen":
                this.setState({
                    darkSeaGreen: false,
                });
                break;
            case "antiqueWhite":
                this.setState({
                    antiqueWhite: false,
                });
                break;
            case "darkKhaki":
                this.setState({
                    darkKhaki: false,
                });
                break;
            case "darkSlateBlue":
                this.setState({
                    darkSlateBlue: false,
                });
                break;
        }
    }
}

export default LockedThemes;
