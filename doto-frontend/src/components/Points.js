import React from "react";
import Avatar from "@material-ui/core/Avatar";

const Points = props => (
    <Avatar className={props.avatarClass}>
        <span>{props.value || 0}</span>
    </Avatar>
);

export default Points;
