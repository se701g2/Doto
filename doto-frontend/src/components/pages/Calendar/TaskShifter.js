/**
 * shift tasks within working hours
 *
 * NOTE: This function assumes the duration of tasks is not exceeding the working hours
 *
 * @param {Array<object>} scheduledTasks The scheduled tasks to be shifted, without considering working hours
 * @param {Date} startTime the start working hour
 * @param {Date} endTime the end working hour
 * @returns An array of tasks and their startDate and endDate are modified based on working hours.
 */
const shiftTasks = (scheduledTasks, startTime, endTime) => {
    // TODO: Take into account the active hours the user specifies in the settings menu
    const tasks = scheduledTasks;
    const MILLISECONDS_PER_MINUTE = 60000;

    // transforming startTime and endTime to minutes format
    const startActingHour = startTime.getHours() * 60 + startTime.getMinutes();
    const endActingHour = endTime.getHours() * 60 + endTime.getMinutes();

    for (let i = 0; i < tasks.length; i++) {
        const taskStart = tasks[i].startDate.getHours() * 60 + tasks[i].startDate.getMinutes();
        const taskEnd = tasks[i].endDate.getHours() * 60 + tasks[i].endDate.getMinutes();
        const shiftToTomorrow = startActingHour + 1440 - taskStart;

        // if the start time of task is earlier than start working time, then shift it and all tasks after it based on startActingHour - taskStart
        // if the end time of task is later than end working time, then shift it and all tasks after it based on startActingHour + 1440 - taskStart
        if (taskStart < startActingHour) {
            for (let j = i; j < tasks.length; j++) {
                tasks[j].startDate = new Date(
                    tasks[j].startDate.getTime() + (startActingHour - taskStart) * MILLISECONDS_PER_MINUTE,
                );
                tasks[j].endDate = new Date(
                    tasks[j].endDate.getTime() + (startActingHour - taskStart) * MILLISECONDS_PER_MINUTE,
                );
            }
        } else if (taskEnd > endActingHour) {
            for (let j = i; j < tasks.length; j++) {
                tasks[j].startDate = new Date(tasks[j].startDate.getTime() + shiftToTomorrow * MILLISECONDS_PER_MINUTE);
                tasks[j].endDate = new Date(tasks[j].endDate.getTime() + shiftToTomorrow * MILLISECONDS_PER_MINUTE);
            }
        }
    }
    return {
        shiftedTasks: tasks,
    };
};
export { shiftTasks };
