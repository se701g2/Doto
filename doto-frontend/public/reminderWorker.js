self.addEventListener("push", ev => {
    const data = ev.data.json();
    console.log("Got push", data);
    self.registration.showNotification(data.title, {
        body: "Hello, World!",
        icon: "/favicon.ico",
    });
});
