import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Routes from "./routes/Route";
import * as serviceWorker from "./serviceWorker";
import "typeface-roboto";

const RouteWrapper = () => {
    return (
        <Router>
            <Routes />
        </Router>
    );
};

ReactDOM.render(<RouteWrapper />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
