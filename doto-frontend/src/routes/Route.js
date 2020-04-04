import React from "react";
import { Route, Switch } from "react-router-dom";
import SettingsPage from "../components/pages/Settings/SettingsPage";
import Login from "../components/pages/Login/Login";
import Calendar from "../components/pages/Calendar/Calendar";
import NotFound from "../components/pages/NotFound";
import { ThemeContext } from "../context/ThemeContext";
import CookieManager from "../helpers/CookieManager";
import "../tailwind-generated.css";

/**
 * When the user is redirected after they are logged in to their google account
 * We take the current url and extract the Email and JWT Token from the query parameters
 *
 * There was also a weird issue where the JWT token with emails ending with "gmail.com" had a
 * "#" character at the end but the emails ending with "aucklanduni.ac.nz" did not have this issue
 * and that is why we are doing a hacky check to see if the email domain starts with "a".
 */
const extractEmailAndJwt = url => {
    const [endPoint, queryParams] = url.split("/")[3].split("?");
    if (endPoint !== "calendar" || !queryParams) return;
    const [base64Email, jwt] = queryParams.split("&").map(param => param.split("=")[1]);
    const email = atob(base64Email);

    const isUoAEmail = email.split("@")[1].substring(0, 1) === "a";
    return [email, isUoAEmail ? jwt : jwt.substring(0, jwt.length - 1)];
};

// Saving the email and jwt cookies to the current session
const saveToCookies = params => {
    if (!params) return;
    const [email, jwt] = params;
    CookieManager.set("email", email);
    CookieManager.set("jwt", jwt);
};

const setupReminders = params => {
    if (!params) return;
    // navigator.serviceWorker.getRegistration().then(function(registration) {
    //     if (registration) {
    //         console.log("found service worker registration", registration);
    //     }
    // });
};

// Sets the routing to the appropriate pages, passing in the colour theme based on user setting
const Routes = () => {
    const [theme, setTheme] = React.useState(true);
    // Only when backend returns JWT and email then we save
    const params = extractEmailAndJwt(window.location.href);
    saveToCookies(params);
    setupReminders(params);
    return (
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
    );
};

export default Routes;
