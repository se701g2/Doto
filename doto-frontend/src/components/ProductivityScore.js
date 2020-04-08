import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import "./ProductivityScore.css";
import { Themes } from "../constants/Themes";

const useStyles = makeStyles(theme => ({
    root: {
        width: 400,
        margin: theme.spacing(5),
    },
}));

const ProductivityScore = props => {
    const classes = useStyles();

    const marks = [
        {
            value: 0,
            label: "Lazy",
        },
        {
            value: 5,
            label: "Procrastinator",
        },
        {
            value: 10,
            label: "Caffeinator",
        },
        {
            value: 15,
            label: "V Mana",
        },
        {
            value: 20,
            label: "Work God",
        },
    ];

    return (
        // Setting .css properties based on theme selected
        <div className={props.scoreBackground === Themes.DARK ? "score-p" : "score-g"}>
            <div className="forum-content">
                <Typography id="discrete-slider-custom" gutterBottom>
                    Productivity Mode
                </Typography>
                <div className={classes.root}>
                    <div>
                        <Slider
                            defaultValue={5}
                            step={5}
                            max={20}
                            aria-labelledby="discrete-slider-custom"
                            valueLabelDisplay="off"
                            marks={marks}
                            track="inverted"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductivityScore.propTypes = {
    addNewTask: PropTypes.func.isRequired,
};

export default ProductivityScore;
