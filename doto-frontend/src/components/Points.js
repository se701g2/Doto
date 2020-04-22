import React from "react";
import Avatar from "@material-ui/core/Avatar";

class Points extends React.Component {
    constructor(props) {
        super(props);
        this.state = { points: 200 };
    }

    changePoints(change) {
        console.log(change);
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
