const MILLISECONDS_PER_MINUTE = 60000;

/**
 * Takes in a single new unscheduled task as well as a list of existing scheduled tasks and returns
 * a newly-scheduled, full list of tasks. The existing tasks may have their schedules modified.
 *
 * NOTE: This function assumes existingTasks are ordered chronologically by startDate, i.e. have been
 * processed using this function.
 *
 * @param {object} newTasks The new tasks to schedule, with no start/end datetimes present
 * @param {Array<object>} existingTasks The existing scheduled tasks, with start/end datetimes present
 * @returns A chronologically ordered (based on startDate) array of all tasks scheduled with start/end
 * datetimes - essentially existingTasks + newTasks
 */
const addTaskToSchedule = (newTask, existingTasks) => {
    // TODO: Take into account any possible gap between datetime and startDate of the first task in oldTasks
    // TODO: Take into account priority of tasks
    // TODO: Take into account location of tasks, add time gaps to allow for travel

    const competingTasks = [];
    const oldTasks = [];

    // filter existing tasks to get tasks with a startDate > earliestDate
    existingTasks.forEach(task => {
        task.startDate > newTask.earliestDate ? competingTasks.push(task) : oldTasks.push(task);
    });

    // If the endDate of the latest oldTask is after earliest start date, then the earliest any new task can be scheduled is oldTask.endDate
    const minDate =
        (oldTasks[0] && oldTasks[oldTasks.length - 1].endDate) > newTask.earliestDate
            ? oldTasks[oldTasks.length - 1].endDate
            : newTask.earliestDate;

    let cTask;

    const earliestPossibleEnd = new Date(
        newTask.earliestDate.getTime() +
            newTask.duration * MILLISECONDS_PER_MINUTE +
            newTask.travelTime * MILLISECONDS_PER_MINUTE,
    );

    if (competingTasks.length > 0) {
        if (earliestPossibleEnd < competingTasks[0].startDate && newTask.dueDate < competingTasks[0].dueDate) {
            newTask.startDate = new Date(newTask.earliestDate.getTime());
            newTask.endDate = earliestPossibleEnd;

            if (newTask.reminder) {
                newTask.reminderDate = new Date(
                    newTask.startDate.getTime() - newTask.reminder * MILLISECONDS_PER_MINUTE,
                );
            }
            return {
                newTaskOrder: [...oldTasks, newTask, ...competingTasks],
                updatedTask: newTask,
            };
        }
    }

    // Schedule tasks based on earliest dueDate (Earliest Deadline First)
    for (let i = 0; i < competingTasks.length; i++) {
        cTask = competingTasks[i];

        if (newTask.dueDate < cTask.dueDate) {
            const newTaskStartDate = cTask.startDate;

            // Shift all subsequent competing tasks forward and insert the new task at the start
            for (let j = i; j < competingTasks.length; j++) {
                competingTasks[j].startDate = new Date(
                    competingTasks[j].startDate.getTime() +
                        newTask.duration * MILLISECONDS_PER_MINUTE +
                        newTask.travelTime * MILLISECONDS_PER_MINUTE,
                );
                competingTasks[j].endDate = new Date(
                    competingTasks[j].endDate.getTime() +
                        newTask.duration * MILLISECONDS_PER_MINUTE +
                        newTask.travelTime * MILLISECONDS_PER_MINUTE,
                );
            }

            // Schedule the new task in place of the existing one
            newTask.startDate = newTaskStartDate;
            newTask.endDate = new Date(
                newTaskStartDate.getTime() +
                    newTask.duration * MILLISECONDS_PER_MINUTE +
                    newTask.travelTime * MILLISECONDS_PER_MINUTE,
            );

            if (newTask.reminder) {
                newTask.reminderDate = new Date(
                    newTask.startDate.getTime() - newTask.reminder * MILLISECONDS_PER_MINUTE,
                );
            }
            // Insert the new task at the specified index
            competingTasks.splice(i, 0, newTask);
            return {
                newTaskOrder: [...oldTasks, ...competingTasks],
                updatedTask: newTask,
            };
        }
    }

    newTask.startDate = cTask ? newTask.dueDate : minDate;

    newTask.startDate = new Date(newTask.startDate.getTime());

    if (newTask.reminder) {
        newTask.reminderType = newTask.reminder;
        newTask.reminderDate = new Date(newTask.startDate.getTime() - newTask.reminder * MILLISECONDS_PER_MINUTE);
    }

    newTask.endDate =
        (cTask && new Date(newTask.dueDate.getTime() + newTask.duration * MILLISECONDS_PER_MINUTE)) ||
        new Date(minDate.getTime() + newTask.duration * MILLISECONDS_PER_MINUTE);

    return {
        newTaskOrder: [...existingTasks, newTask],
        updatedTask: newTask,
    };
};

export { addTaskToSchedule };
