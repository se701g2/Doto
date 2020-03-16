import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "../App";
import SettingsPage from "../components/pages/Settings/SettingsPage";
import Login from "../components/pages/Login/Login";
import Calendar from "../components/pages/Calendar/Calendar";
import NotFound from "../components/pages/NotFound";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;
