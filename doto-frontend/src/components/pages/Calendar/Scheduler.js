/**
 * Takes in a single new unscheduled task as well as a list of existing scheduled tasks and returns
 * a newly-scheduled, full list of tasks. The existing tasks may have their schedules modified.
 *
 * @param {object} newTasks The new tasks to schedule, with no start/end datetimes present
 * @param {Array<object>} existingTasks The existing scheduled tasks, with start/end datetimes present
 * @returns An array of all tasks scheduled with start/end datetimes - essentially existingTasks + newTasks
 */
const AddTaskToSchedule = (newTask, existingTasks) => {};

export default AddTaskToSchedule;
