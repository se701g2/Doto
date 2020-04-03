const cron = require("node-cron");
const Task = require("../models/Task");

require("google-closure-library");
const PriorityQueue = goog.require("goog.structs.PriorityQueue");

const reminderQueue = new goog.structs.PriorityQueue();

// Dump all the future tasks into a priority queue sorted by earliest date first
(async () => {
    const futureTasks = await Task.find({ reminderDate: { $gte: new Date() } });
    for (let task of futureTasks) {
        reminderQueue.enqueue(task.reminderDate, task);
    }
})();

// Every 5 minutes check if the earliest task should fire off reminder
cron.schedule("*/5 * * * *", () => {
    const currDate = new Date();
    while (reminderQueue.peek().reminderDate <= currDate) {
        console.log("Fire off notification for" + reminderQueue.dequeue());
    }
});
