// Load saved theme on every page AFTER DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("vyper-theme");
    if (!savedTheme) return;

    try {
        const theme = JSON.parse(savedTheme);

        document.documentElement.style.setProperty("--accent", theme.accent);
        document.documentElement.style.setProperty("--bg", theme.bg);
        document.documentElement.style.setProperty("--text", theme.text);
    } catch (err) {
        console.error("Theme load error:", err);
    }
});


