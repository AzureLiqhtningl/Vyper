/* ============================================================
   VYPER DEV TOOLS — CLEAN + GLOBAL + PERSISTENT
   ============================================================ */

const SCHOOLOGY_KEY = "vyper-schoology-enabled";
const THEME_KEY = "vyper-theme-name";

let vyperWindows = [];

/* ============================================================
   OPEN VYPER IN ABOUT:BLANK
   ============================================================ */
function openBlankCloak() {
    const win = window.open("about:blank", "_blank");

    if (win) {
        vyperWindows.push(win);

        win.document.write(`
            <iframe src="index.html" style="
                position:fixed;
                top:0;
                left:0;
                width:100vw;
                height:100vh;
                border:none;
                margin:0;
                padding:0;
                overflow:hidden;
                z-index:999999;
            "></iframe>
        `);

        win.document.close();
    }
}

/* ============================================================
   HOTKEY: PRESS F TO OPEN CLOAK
   ============================================================ */
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "f") openBlankCloak();
});

/* ============================================================
   HOTKEY: PRESS X TO CLOSE ALL CLOAK WINDOWS
   ============================================================ */
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "x") {
        vyperWindows.forEach(win => { try { win.close(); } catch {} });
        vyperWindows = [];
    }
});

/* ============================================================
   AUTO-CLOAK ON TAB BLUR
   ============================================================ */
window.addEventListener("blur", () => {
    if (localStorage.getItem("auto-cloak") === "true") {
        openBlankCloak();
    }
});

function toggleAutoCloak() {
    const enabled = localStorage.getItem("auto-cloak") === "true";
    localStorage.setItem("auto-cloak", enabled ? "false" : "true");
}

/* ============================================================
   FAKE TAB TITLE
   ============================================================ */
function toggleFakeTitle() {
    const enabled = localStorage.getItem("fake-title") === "true";
    const now = !enabled;

    localStorage.setItem("fake-title", now ? "true" : "false");

    document.title = now ? "Schoology | Home" : "Vyper";
}

if (localStorage.getItem("fake-title") === "true") {
    document.title = "Schoology | Home";
}

/* ============================================================
   SCHOOLOGY THEME (GLOBAL + PERSISTENT)
   ============================================================ */
function toggleSchoology() {
    const enabled = localStorage.getItem(SCHOOLOGY_KEY) === "true";
    const now = !enabled;

    localStorage.setItem(SCHOOLOGY_KEY, now ? "true" : "false");

    if (now) {
        document.documentElement.style.setProperty("--accent", "#1976d2");
        document.documentElement.style.setProperty("--bg", "#f5f7fa");
        document.documentElement.style.setProperty("--text", "#1a1a1a");
    } else {
        const savedName = localStorage.getItem(THEME_KEY) || "neon";
        const theme = VYPER_THEMES[savedName];

        document.documentElement.style.setProperty("--accent", theme.accent);
        document.documentElement.style.setProperty("--bg", theme.bg);
        document.documentElement.style.setProperty("--text", theme.text);
    }
}

/* APPLY SCHOOLOGY OVERRIDE ON PAGE LOAD */
if (localStorage.getItem(SCHOOLOGY_KEY) === "true") {
    document.documentElement.style.setProperty("--accent", "#1976d2");
    document.documentElement.style.setProperty("--bg", "#f5f7fa");
    document.documentElement.style.setProperty("--text", "#1a1a1a");
}
