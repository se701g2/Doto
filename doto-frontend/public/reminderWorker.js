self.addEventListener("push", ev => {
    const data = ev.data.json();
    self.registration.showNotification(data.title, {
        body: data.description,
        icon: "/favicon.ico",
    });
});
