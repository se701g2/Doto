import React from "react";
import Avatar from "@material-ui/core/Avatar";

class Points extends React.Component {
    constructor(props) {
        super(props);
        // TODO: get points from userdata & store it there
        this.state = { points: 0 };
    }

    changePoints(change) {
        this.setState({
            points: this.state.points + change,
        });
    }

    render() {
        return (
            <Avatar className={this.props.avatarClass}>
                <span>{this.state.points}</span>
            </Avatar>
        );
    }
}

export default Points;
