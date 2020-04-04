const cron = require("node-cron");
const Task = require("../models/Task");
const webpush = require("web-push");

require("google-closure-library");
goog.require("goog.structs.PriorityQueue");

const reminderQueue = new goog.structs.PriorityQueue();
const subscriptions = new Map();

webpush.setVapidDetails("mailto:asdfasdfasdf@gmail.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

// Dump all the future tasks into a priority queue sorted by earliest date first
(async () => {
    const futureTasks = await Task.find({ reminderDate: { $gte: new Date() } });
    for (let task of futureTasks) {
        reminderQueue.enqueue(task.reminderDate, task);
    }
})();

// Every minute check if the earliest task should fire off reminder
cron.schedule("* * * * *", () => {
    const currDate = new Date();
    const payload = JSON.stringify({ title: "test" });
    webpush.sendNotification(subscription, payload).catch((err) => {
        console.error(err.stack);
    });
    // while (reminderQueue.peek().reminderDate <= currDate) {
    //     const subscription = subscriptions.get(reminderQueue.poll().user);
    //     webpush.sendNotification(subscription, payload).catch((err) => {
    //         console.error(err.stack);
    //     });
    // }
});

module.exports.subscribe = (id, subscription) => {
    console.log(subscription);
    subscriptions.set(id, subscription);
};

module.exports.unsubscribe = (id) => {
    subscriptions.delete(id);
};

module.exports.enqueue = (task) => {
    if (task.reminderDate) {
        reminderQueue.enqueue(task.reminderDate, task);
    }
};
