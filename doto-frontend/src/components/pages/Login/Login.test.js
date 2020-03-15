import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import Login from "./Login";
import renderer from "react-test-renderer";

describe("<Login /> component being rendered", () => {
    let subject;

    beforeEach(() => {
        subject = mount(<Login />);
    });

    afterEach(() => {
        subject.unmount();
    });

    it("Login component rendered without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Login />, div);
    });

    it("Make sure render matches snapshot", () => {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
