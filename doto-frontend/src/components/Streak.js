import React from "react";
import streakImage from "./images/streak.png";

class Streak extends React.Component {
    constructor(props) {
        super(props);
        this.state = { points: 0 };
    }

    incrementStreak(change) {
        this.setState({
            points: this.state.points + change,
        });
    }

    resetStreak() {
        this.setState({
            points: 0,
        });
    }

    updateStreak() {
        const currentDateTime = new Date();
        let latestDate = null;

        // find the last, previous uncompleted task
        this.props.tasks.forEach(task => {
            if (task.endDate < currentDateTime) {
                if (!task.isComplete) {
                    if (!latestDate && latestDate < task.startDate) {
                        latestDate = task.endDate;
                    }
                }
            }
        });

        // Steak = sum the values of every task completed since then
        this.resetStreak();
        this.props.tasks.forEach(task => {
            if (!currentDateTime || task.endDate < currentDateTime) {
                if (task.startDate >= latestDate) {
                    this.incrementStreak(1);
                    console.log("^", task.title);
                }
            }
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.updateStreak(), 1000);
    }

    render() {
        return (
            <div>
                <h2>Streak</h2>
                <div className="streak-container">
                    <img src={streakImage} width="55em" alt={`streak: ${this.state.points}`} />
                    <span className="centered">{this.state.points}</span>
                </div>
            </div>
        );
    }
}

export default Streak;
