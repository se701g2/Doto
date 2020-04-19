// This function checks if the user has logged in by checking if an email
// is registered in the CookieManager. It then redirects to the home page if none present.
// Authors: Alex Monk and Shunji Takano

import React from "react";
import { Route, Redirect } from "react-router-dom";
import CookieManager from "./CookieManager";

function PrivateRoute({ component: Component, ...rest}) {
    let emailStr = CookieManager.get("email");
    let authed = false;
    if (emailStr !== undefined) {
        authed = true;
    }

    return (
        <Route
            {...rest}
            render={props =>
                authed ? ( // Want to replace authed with Calender.js customAuth.
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
            }
        />
    );
}

export default PrivateRoute;