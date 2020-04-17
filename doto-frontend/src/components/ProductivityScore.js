import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import "./ProductivityScore.css";

const useStyles = makeStyles(theme => ({
    root: {
        height: 400,
        width: 200,
        paddingBottom: 30,
        paddingTop: 30,
    },
    title: {
        paddingLeft: 20,
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
            value: 10,
            label: "Recovering Procrastinator",
        },
        {
            value: 20,
            label: "Caffeine Machine",
        },
        {
            value: 30,
            label: "Energy Drinkaholic",
        },
        {
            value: 40,
            label: "Workhorse God",
        },
    ];

    return (
        // Setting .css properties based on theme selected

        <div>
            <Typography id="discrete-slider-custom" gutterBottom className={classes.title}>
                Productivity Mode
            </Typography>
            <div className={classes.root}>
                <Slider
                    defaultValue={10}
                    orientation="vertical"
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    max={40}
                    marks={marks}
                />
            </div>
        </div>
    );
};

export default ProductivityScore;
