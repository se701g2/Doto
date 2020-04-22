import React from "react";
import { Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import lockImage from "./images/lock.png";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state"; // added dependency
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

class AvailableTheme extends React.Component {
    constructor(props) {
        super(props);
        if (props.cost === 0) {
            this.state = {
                locked: false,
            };
        } else {
            this.state = {
                locked: true,
            };
        }
    }

    unlockTheme() {
        this.setState({
            locked: false,
        });
    }

    handleClick() {
        if (!this.state.locked) {
            this.props.handleThemeClick(this.props.colour, this.props.cost);
        } else {
            this.unlockTheme();
        }
    }

    render() {
        return (
            <div className="theme-content-box">
                <div className="available-theme-container">
                    <ThemeProvider>
                        {this.state.locked ? (
                            <PopupState variant="popper" popupId="demo-popup-popper">
                                {popupState => (
                                    <div>
                                        <Button
                                            id="color-palette"
                                            style={{ backgroundColor: this.props.htmlColour }}
                                            {...bindToggle(popupState)}
                                        >
                                            {this.state.locked && <img src={lockImage} style={{ height: "2em" }} />}
                                        </Button>
                                        {this.state.locked && (
                                            <Popper {...bindPopper(popupState)} transition>
                                                {({ TransitionProps }) => (
                                                    <Fade {...TransitionProps} timeout={350}>
                                                        <Paper>
                                                            <Button
                                                                startIcon={<VpnKeyIcon fontSize="small" />}
                                                                onClick={() => this.handleClick()}
                                                            >
                                                                Unlock for {this.props.cost} points
                                                            </Button>
                                                        </Paper>
                                                    </Fade>
                                                )}
                                            </Popper>
                                        )}
                                    </div>
                                )}
                            </PopupState>
                        ) : (
                            <Button
                                onClick={() => this.handleClick()}
                                id="color-palette"
                                style={{ backgroundColor: this.props.htmlColour }}
                            >
                                {this.state.locked && <img src={lockImage} style={{ height: "2em" }} />}
                            </Button>
                        )}
                    </ThemeProvider>
                </div>

                <h2 style={{ textAlign: "right" }}>{this.state.locked ? "Cost:" + this.props.cost : "Owned"}</h2>
            </div>
        );
    }
}

export default AvailableTheme;
