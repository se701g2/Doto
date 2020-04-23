import React from "react";
import { Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import lockImage from "./images/lock.png";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state"; // added dependency
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

const AvailableTheme = props => {
    const handleClick = () => {
        if (!props.locked) {
            props.handleThemeClick(props.colour, props.cost);
        } else {
            // TODO: Error if not enough points
            props.buyItem(props.cost, props.colour);
        }
    };

    return (
        <div className="theme-content-box">
            <ThemeProvider>
                {props.locked ? (
                    <PopupState variant="popper" popupId="demo-popup-popper">
                        {popupState => (
                            <div>
                                <Button
                                    id="color-palette"
                                    style={{ backgroundColor: props.htmlColour }}
                                    {...bindToggle(popupState)}
                                >
                                    <img src={lockImage} style={{ height: "2em" }} alt="locked" />
                                </Button>
                                <Popper {...bindPopper(popupState)} transition>
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={350}>
                                            <Paper>
                                                <Button
                                                    startIcon={<VpnKeyIcon fontSize="small" />}
                                                    onClick={() => handleClick()}
                                                >
                                                    Unlock for {props.cost} points
                                                </Button>
                                            </Paper>
                                        </Fade>
                                    )}
                                </Popper>
                            </div>
                        )}
                    </PopupState>
                ) : (
                    <Button
                        onClick={() => handleClick()}
                        id="color-palette"
                        style={{ backgroundColor: props.htmlColour }}
                    />
                )}
            </ThemeProvider>

            <h2 style={{ textAlign: "right" }}>{props.locked ? "Cost:" + props.cost : "Owned"}</h2>
        </div>
    );
};

export default AvailableTheme;
