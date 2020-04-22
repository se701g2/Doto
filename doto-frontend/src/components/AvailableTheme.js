import React from "react";
import { Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import lockImage from "./images/lock.png";

class AvailableTheme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locked: true,
        };
    }

    unlockTheme() {
        this.setState({
            locked: false,
        });
    }

    render() {
        return (
            <div className="theme-content-box">
                <div className="available-theme-container">
                    <ThemeProvider>
                        <Button
                            onClick={event => this.props.handleThemeClick(this.props.colour, this.props.cost)}
                            id="color-palette"
                            style={{ backgroundColor: this.props.htmlColour }}
                        >
                            {this.state.locked && <img src={lockImage} style={{ height: "2em" }} />}
                        </Button>
                    </ThemeProvider>
                </div>

                <h2 style={{ textAlign: "right" }}>Cost: {this.props.cost}</h2>
            </div>
        );
    }
}

export default AvailableTheme;
