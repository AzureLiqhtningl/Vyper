/* ============================================================
   VYPER DEV TOOLS — SAFE DEVELOPMENT FEATURES
   These tools are for testing UI behavior, themes, and window
   handling in your own project. Nothing here is for evasion.
   ============================================================ */

/* ============================================================
   CONFIG — TURN FEATURES ON/OFF
   ============================================================ */
const DEV_FEATURES = {
    hotkeyCloak: true,          // Press F to open Vyper in about:blank
    autoCloakOnBlur: true,      // Auto-open Vyper when tab loses focus
    fakeTabTitle: true,         // Change tab title for UI testing
    schoologyTheme: false,      // Enable Schoology-style theme
    hotkeyCloseAll: true        // Press X to close all cloak windows
};

/* ============================================================
   INTERNAL — TRACK OPENED WINDOWS
   ============================================================ */
let vyperWindows = [];

/* ============================================================
   1. FUNCTION — OPEN VYPER IN ABOUT:BLANK
   ============================================================ */
function openVyperCloak() {
    const win = window.open("about:blank", "_blank");

    if (win) {
        vyperWindows.push(win); // Track window so we can close it later

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
    } else {
        console.warn("Popup blocked — allow popups for dev testing.");
    }
}

/* ============================================================
   2. HOTKEY CLOAK — PRESS F TO OPEN ABOUT:BLANK
   ============================================================ */
if (DEV_FEATURES.hotkeyCloak) {
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "f") {
            openVyperCloak();
        }
    });
}

/* ============================================================
   3. HOTKEY CLOSE ALL — PRESS X TO CLOSE ALL OPENED WINDOWS
   ============================================================ */
if (DEV_FEATURES.hotkeyCloseAll) {
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "x") {
            vyperWindows.forEach(win => {
                try { win.close(); } catch {}
            });
            vyperWindows = [];
        }
    });
}

/* ============================================================
   4. AUTO-CLOAK WHEN TAB LOSES FOCUS
   ============================================================ */
if (DEV_FEATURES.autoCloakOnBlur) {
    window.addEventListener("blur", () => {
        openVyperCloak();
    });
}

/* ============================================================
   5. FAKE TAB TITLE (UI TESTING ONLY)
   ============================================================ */
if (DEV_FEATURES.fakeTabTitle) {
    document.title = "Schoology | Home";
}

/* ============================================================
   6. SCHOOLGY-STYLE THEME (VISUAL ONLY)
   ============================================================ */
if (DEV_FEATURES.schoologyTheme) {
    document.documentElement.style.setProperty("--accent", "#1976d2");
    document.documentElement.style.setProperty("--bg", "#f5f7fa");
    document.documentElement.style.setProperty("--text", "#1a1a1a");
}
