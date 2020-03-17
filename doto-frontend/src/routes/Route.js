import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SettingsPage from "../components/pages/Settings/SettingsPage";
import Login from "../components/pages/Login/Login";
import Calendar from "../components/pages/Calendar/Calendar";
import NotFound from "../components/pages/NotFound";
import { ThemeContext } from "../context/ThemeContext";
import "../tailwind-generated.css";

const Routes = () => {
    const [theme, setTheme] = React.useState(true);

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/settings">
                        <ThemeContext.Provider value={[theme, setTheme]}>
                            <SettingsPage />
                        </ThemeContext.Provider>
                    </Route>
                    <Route path="/calendar">
                        <ThemeContext.Provider value={[theme, setTheme]}>
                            <Calendar />
                        </ThemeContext.Provider>
                    </Route>
                    <Route path="/login" component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default Routes;
