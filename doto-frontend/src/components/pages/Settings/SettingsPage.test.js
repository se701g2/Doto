import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import SettingsPage from "./SettingsPage";
import { ThemeContext } from "../../../context/ThemeContext";

describe("<SettingsPage /> component being rendered", () => {
    let theme;
    const setTheme = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(theme => [theme, setTheme]);

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
