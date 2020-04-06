const cron = require("node-cron");
const Task = require("../models/Task");
const webpush = require("web-push");
const { logger } = require("../common/logging");

webpush.setVapidDetails("mailto:Se701group2@gmail.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

// Maps user.email to a push manager subscription so we know which client to
// send a reminder to.
const subscriptions = new Map();

// Every minute query the database to check if there are tasks that should be
// fired off via notification. Note this means in the worst case a notification
// will be delivered one minute late.
cron.schedule("* * * * *", () => {
    Task.find({ reminderDate: { $lte: new Date() }, user: { $in: [...subscriptions.keys()] } }, (err, tasks) => {
        if (err) {
            logger.error(err);
            return;
        }
        for (let task of tasks) {
            const subscription = subscriptions.get(task.user);
            if (subscription) {
                // const payload = JSON.stringify({ title: task.title, description: task.description });
                webpush
                    .sendNotification(subscription, JSON.stringify(task))
                    .then(() => {
                        logger.info(`Fired notification id=${task.id} title=${task.title}`);

                        // This is a bit of a hack.
                        // Unsetting the field means the notification is fired
                        // so we can avoid duplicating.
                        task.reminderDate = undefined;
                        task.save();
                    })
                    .catch((err) => {
                        console.error(err.stack);
                    });
            } else {
                logger.error("Subscription not found. This should never occur.");
            }
        }
    });
});

const reminderService = {
    subscribe: (id, subscription) => {
        if (typeof id === "string" && subscription && subscription.endpoint) {
            subscriptions.set(id, subscription);
            logger.info(`Registered subscription for ${id}`);
        }
    },
    unsubscribe: (id) => {
        subscriptions.delete(id);
        logger.info(`Removed subscription for ${id}`);
    },
};

module.exports = reminderService;
