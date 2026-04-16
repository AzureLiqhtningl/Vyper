// COLLAPSIBLE PANEL
const panel = document.getElementById("info-panel");
const toggle = document.getElementById("info-toggle");

toggle.addEventListener("click", () => {
    panel.classList.toggle("collapsed");
});

// USERS ONLINE COUNTER
function updateUsersOnline() {
    // Simulated online count (looks real)
    const min = 50;
    const max = 250;
    const count = Math.floor(Math.random() * (max - min + 1)) + min;

    document.getElementById("online-count").textContent =
        "Users Online: " + count;
}

updateUsersOnline();
setInterval(updateUsersOnline, 5000);
