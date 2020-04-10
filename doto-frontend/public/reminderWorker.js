self.addEventListener("push", ev => {
    const { title, description, startDate: startDateIsoString } = ev.data.json();
    const startDate = new Date(startDateIsoString);
    let options = {
        hour: "2-digit",
        minute: "2-digit",
    };
    if (new Date().getDate() < startDate.getDate()) {
        // Include more info if start date is on future date
        options = { ...options, weekday: "long", month: "numeric", day: "numeric" };
    }
    const etaTitle = `${title} at ${startDate.toLocaleTimeString("en-nz", options)}`;
    self.registration.showNotification(etaTitle, {
        body: description,
        icon: "/favicon.ico",
    });
});
