import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import SettingsPage from "./SettingsPage";
import { ThemeContext } from "../../../context/ThemeContext";

describe("<SettingsPage /> component being rendered", () => {
    let theme;
    const setTheme = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(theme => [theme, setTheme]);

    let subject;

    const Wrapper = () => {
        return (
            <Router>
                <ThemeContext.Provider value={[theme, setTheme]}>
                    <SettingsPage />
                </ThemeContext.Provider>
            </Router>
        );
    };

    beforeEach(() => {
        useStateSpy.mockImplementation(theme => [theme, setTheme]);

        subject = mount(<Wrapper />);
    });

    afterEach(() => {
        jest.clearAllMocks();
        subject.unmount();
    });

    it("SettingsPage component rendered without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Wrapper />, div);
    });

    it("Make sure render matches snapshot", () => {
        expect(subject).toMatchSnapshot();
    });
});
