// TIME + DATE
function updateDateTime() {
    const now = new Date();

    const timeOptions = {
        hour: "numeric",
        minute: "numeric"
    };

    const dateOptions = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };

    const timeEl = document.getElementById("current-time");
    const dateEl = document.getElementById("current-date");

    if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString("en-US", timeOptions);
    }
    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString("en-US", dateOptions);
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);

// USERS ONLINE COUNTER
function updateUsersOnline() {
    const el = document.getElementById("online-count");
    if (!el) return;

    const min = 50;
    const max = 250;
    const count = Math.floor(Math.random() * (max - min + 1)) + min;

    el.textContent = "Users Online: " + count;
}

updateUsersOnline();
setInterval(updateUsersOnline, 5000);
