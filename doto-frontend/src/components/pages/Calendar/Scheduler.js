/**
 * Takes in a single new unscheduled task as well as a list of existing scheduled tasks and returns
 * a newly-scheduled, full list of tasks. The existing tasks may have their schedules modified.
 * NOTE: This function assumes existingTasks are ordered chronologically by startDate, i.e. have been
 * processed using this function.
 *
 * @param {object} newTasks The new tasks to schedule, with no start/end datetimes present
 * @param {Array<object>} existingTasks The existing scheduled tasks, with start/end datetimes present
 * @param {Date} datetime The datetime after which the task should be scheduled (usually the current datetime)
 * @returns A chronologically ordered (based on startDate) array of all tasks scheduled with start/end
 * datetimes - essentially existingTasks + newTasks
 */
const AddTaskToSchedule = (newTask, existingTasks, datetime) => {
    // TODO: Take into account any possible gap between datetime and startDate of the first task in oldTasks
    // TODO: Take into account priority of tasks
    // TODO: Take into account location of tasks, add time gaps to allow for travel

    const competingTasks = [];
    const oldTasks = [];

    // Separate existing tasks with a startDate > current datetime from older tasks (which won't be considered)
    existingTasks.forEach(task => {
        task.startDate > datetime && competingTasks.push(task);
        task.startDate <= datetime && oldTasks.push(task);
    });

    let cTask;

    // Schedule tasks based on earliest deadline (Earliest Deadline First)
    for (let i = 0; i < competingTasks.length; i++) {
        cTask = competingTasks[i];

        if (newTask.deadline < cTask.deadLine) {
            const newTaskStartDate = cTask.startDate;

            // Shift all subsequent competing tasks forward and insert the new task at the start
            for (let j = i; j < competingTasks.length; j++) {
                competingTasks[j].startDate = new Date(competingTasks[j].startDate.getTime() + newTask.duration * 1000);
                competingTasks[j].endDate = new Date(competingTasks[j].endDate.getTime() + newTask.duration * 1000);
            }

            // Schedule the new task in place of the existing one
            newTask.startDate = newTaskStartDate;
            newTask.endDate = new Date(newTaskStartDate.getTime() + newTask.duration * 1000);

            return [...oldTasks, ...competingTasks.splice(i, 0, newTask)];
        }
    }

    // Schedule the new task after all others
    newTask.startDate = cTask.endDate;
    newTask.endDate = new Date(cTask.endDate.getTime() + newTask.duration * 1000);

    return [...existingTasks, newTask];
};

export default AddTaskToSchedule;
