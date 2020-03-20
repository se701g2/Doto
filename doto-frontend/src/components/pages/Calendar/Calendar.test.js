import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Calendar from "./Calendar";
import CalendarListView from "./CalendarListView";
import { ThemeContext } from "../../../context/ThemeContext";

describe("<Calendar /> component being rendered", () => {
    let theme;
    const setTheme = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(theme => [theme, setTheme]);

    const Wrapper = () => {
        return (
            <Router>
                <ThemeContext.Provider value={[theme, setTheme]}>
                    <Calendar />
                </ThemeContext.Provider>
            </Router>
        );
    };

    beforeEach(() => {
        useStateSpy.mockImplementation(theme => [theme, setTheme]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Calendar component rendered without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Wrapper />, div);
    });

    it("Make sure render matches snapshot", () => {
        const tree = shallow(<Wrapper />);
        expect(tree.debug()).toMatchSnapshot();
        tree.unmount();
    });

    it("Click on List View button should open CalendarListView while changing its icon", () => {
        const subject = mount(<Wrapper />);

        const button = () => {
            // search for List View button
            return subject.find('button[title="List View"]');
        };

        expect(subject.find(CalendarListView)).toHaveLength(0);
        expect(button().find(FormatListBulletedIcon)).toHaveLength(1);
        expect(button().find(CalendarTodayIcon)).toHaveLength(0);

        button().simulate("click");

        expect(subject.find(CalendarListView)).toHaveLength(1);
        expect(button().find(FormatListBulletedIcon)).toHaveLength(0);
        expect(button().find(CalendarTodayIcon)).toHaveLength(1);

        subject.unmount();
    });
});
