import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "../App";
import Settings from "../components/pages/Settings";
import Calendar from "../components/pages/Calendar/CalendarPage";
import Login from "../components/pages/Login/Login";
import NotFound from "../components/pages/NotFound";

export default (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/settings" component={Settings} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);
