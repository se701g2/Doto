import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "typeface-roboto";
import "./index.css";
import Routes from "./routes/Route";

const RouteWrapper = () => {
    return (
        <Router>
            <Routes />
        </Router>
    );
};

ReactDOM.render(<RouteWrapper />, document.getElementById("root"));

/**
 * We disable the service worker from CRA and use a custom service worker
 * which will handle displaying notifications for reminders
 */

// serviceWorker.unregister();

Notification.requestPermission(perm => {
    if (perm === "granted" && "serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("reminderWorker.js").then(
                reg => reg && reg.active && console.log("Service worker registered", reg),
                err => console.err(err),
            );
        });
    }
});
