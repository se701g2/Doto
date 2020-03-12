import React from "react";
import "./../../App.css";
import Paper from "@material-ui/core/Paper";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ViewState, EditingState, IntegratedEditing } from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    WeekView,
    MonthView,
    DayView,
    ViewSwitcher,
    Toolbar,
    DateNavigator,
    TodayButton,
    Appointments,
    AppointmentForm,
    ConfirmationDialog,
    EditRecurrenceMenu,
    AllDayPanel,
    AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { green } from "@material-ui/core/colors";
const theme = createMuiTheme({ palette: { type: "light", primary: green } });

let today = new Date();

// Calculating the current date
function getDate() {
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    today = year + "-" + month + "-" + day; // yyyy-mm-ddT24.00.000
}

// Current Tasks as appointments
export const appointments = [
    {
        title: "Lecture",
        descrition: "Lecture at Auckland Uni",
        startDate: new Date(2020, 2, 12, 9, 0), // 0 is January
        endDate: new Date(2020, 2, 12, 11, 0),
        id: 0,
        priority: 3,
        location: "Room 1",
    },
    {
        title: "Lecture",
        descrition: "Lecture at Auckland Uni",
        startDate: new Date(2020, 2, 10, 10, 0),
        endDate: new Date(2020, 2, 10, 12, 0),
        id: 1,
        priority: 2,
        location: "Room 2",
    },
    {
        title: "James' Birthday",
        descrition: "James' day of birth",
        startDate: new Date(2020, 2, 13, 0, 0),
        endDate: new Date(2020, 2, 14, 0, 0),
        id: 2,
        priority: 1,
        location: "Room 3",
    },
];

const CalendarComponent = () => {
    getDate();
    return (
        <div className="CalendarContainer">
            <MuiThemeProvider theme={theme}>
                <Paper>
                    <a className="Doto"></a>
                    <div className="DotoCalendar">
                        <header className="Calendar-header">
                            <div>Calendar</div>
                        </header>
                        <div className="Side">
                            <div className="Calendar">
                                <Scheduler
                                    data={appointments}
                                    currentView={WeekView}
                                    editable={true}
                                    height={700}
                                    className="Calendar"
                                >
                                    <ViewState defaultcurrentDate={today} deaultcurrentViewName="Week" />
                                    <DayView startDayHour={8} endDayHour={20} />
                                    <WeekView startDayHour={8} endDayHour={20} />
                                    <MonthView startDayHour={8} endDayHour={20} />
                                    <Toolbar />
                                    <ViewSwitcher />
                                    <DateNavigator />
                                    <TodayButton />
                                    <EditingState />
                                    <EditRecurrenceMenu />
                                    <IntegratedEditing />
                                    <AllDayPanel />
                                    <ConfirmationDialog />
                                    <Appointments />
                                    <AppointmentTooltip showCloseButton showOpenButton />
                                    <AppointmentForm />
                                </Scheduler>
                            </div>
                        </div>
                    </div>
                </Paper>
            </MuiThemeProvider>
        </div>
    );
};

// render(<App />, document.getElementById("root"));

export default CalendarComponent;
