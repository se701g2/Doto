import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import Route from "./Route";
import NotFound from "../components/pages/NotFound";
import App from "../App";
import Settings from "../components/pages/Settings";
import Calendar from "../components/pages/Calendar/CalendarPage";
import Login from "../components/pages/Login/Login";

test("initial landing page should be App", () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={["/"]}>
            <Route />
        </MemoryRouter>,
    );
    expect(wrapper.find(App)).toHaveLength(1);
});

test("Settings page should be loeaded correctly", () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={["/settings"]}>
            <Route />
        </MemoryRouter>,
    );
    expect(wrapper.find(Settings)).toHaveLength(1);
});

test("Login page should be loeaded correctly", () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={["/login"]}>
            <Route />
        </MemoryRouter>,
    );
    expect(wrapper.find(Login)).toHaveLength(1);
});

test("Calendar page should be loeaded correctly", () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={["/calendar"]}>
            <Route />
        </MemoryRouter>,
    );
    expect(wrapper.find(Calendar)).toHaveLength(1);
});

test("invalid path should redirect to 404", () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={["/random"]}>
            <Route />
        </MemoryRouter>,
    );
    expect(wrapper.find(NotFound)).toHaveLength(1);
});
