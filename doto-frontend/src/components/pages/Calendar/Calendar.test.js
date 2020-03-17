import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import Calendar from "./Calendar";

describe("<Calendar /> component being rendered", () => {
    let subject;

    beforeEach(() => {
        subject = mount(<Calendar />);
    });

    afterEach(() => {
        subject.unmount();
    });

    it("Calendar component rendered without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Calendar />, div);
    });
});
