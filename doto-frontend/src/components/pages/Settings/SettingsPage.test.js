import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import SettingsPage from "./SettingsPage";
import { ThemeContext } from "../../../context/ThemeContext";
import { ActiveHoursContext } from "../../../context/ActiveHoursContext";

describe("<SettingsPage /> component being rendered", () => {
    let theme;
    let activeHourStartTime;
    let activeHourEndTime;
    const setTheme = jest.fn();
    const setActiveHourStartTime = jest.fn();
    const setActiveHourEndTime = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(theme => [theme, setTheme]);
    useStateSpy.mockImplementation(activeHourStartTime => [activeHourStartTime, setActiveHourStartTime]);
    useStateSpy.mockImplementation(activeHourEndTime => [activeHourEndTime, setActiveHourEndTime]);

    const Wrapper = () => {
        return (
            <Router>
                <ThemeContext.Provider value={[theme, setTheme]}>
                    <ActiveHoursContext.Provider
                        value={{
                            activeHoursStart: [activeHourStartTime, setActiveHourStartTime],
                            activeHoursEnd: [activeHourEndTime, setActiveHourEndTime],
                        }}
                    >
                        <SettingsPage />
                    </ActiveHoursContext.Provider>
                </ThemeContext.Provider>
            </Router>
        );
    };

    beforeEach(() => {
        useStateSpy.mockImplementation(theme => [theme, setTheme]);
        useStateSpy.mockImplementation(activeHourStartTime => [activeHourStartTime, setActiveHourStartTime]);
        useStateSpy.mockImplementation(activeHourEndTime => [activeHourEndTime, setActiveHourEndTime]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("SettingsPage component rendered without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Wrapper />, div);
    });

    it("Make sure render matches snapshot", () => {
        const tree = renderer.create(<Wrapper />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
