/* ============================================================
   GLOBAL THEME SYSTEM (WORKS ON ALL PAGES)
   ============================================================ */

const VYPER_THEMES = {
    neon: {
        accent: "#58F00C",
        bg: "#000000",
        text: "#C4C4C4"
    },
    red: {
        accent: "#FF3B3B",
        bg: "#0A0000",
        text: "#FFD6D6"
    },
    blue: {
        accent: "#4DA3FF",
        bg: "#000814",
        text: "#D0E7FF"
    },
    gray: {
        accent: "#AAAAAA",
        bg: "#000000",
        text: "#E0E0E0"
    }
};

const THEME_KEY = "vyper-theme-name";
const SCHOOLOGY_KEY = "vyper-schoology-enabled";

/* APPLY THEME BY NAME */
function applyThemeByName(name) {
    const theme = VYPER_THEMES[name] || VYPER_THEMES.neon;

    document.documentElement.style.setProperty("--accent", theme.accent);
    document.documentElement.style.setProperty("--bg", theme.bg);
    document.documentElement.style.setProperty("--text", theme.text);

    localStorage.setItem(THEME_KEY, name);
}

/* APPLY SCHOOLOGY OVERRIDE IF ENABLED */
function applySchoologyOverrideIfNeeded() {
    const enabled = localStorage.getItem(SCHOOLOGY_KEY) === "true";
    if (!enabled) return;

    document.documentElement.style.setProperty("--accent", "#1976d2");
    document.documentElement.style.setProperty("--bg", "#f5f7fa");
    document.documentElement.style.setProperty("--text", "#1a1a1a");
}

/* LOAD THEME ON EVERY PAGE */
document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem(THEME_KEY) || "neon";
    applyThemeByName(savedName);
    applySchoologyOverrideIfNeeded();

    // Wire theme buttons (only exists on settings page)
    document.querySelectorAll(".theme-option").forEach(btn => {
        btn.addEventListener("click", () => {
            const themeName = btn.dataset.theme;
            if (themeName && VYPER_THEMES[themeName]) {
                applyThemeByName(themeName);
                applySchoologyOverrideIfNeeded();
            }
        });
    });
});

/* ============================================================
   SETTINGS MENU SWITCHING
   ============================================================ */

document.querySelectorAll(".settings-item").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".settings-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const section = item.dataset.section;
        document.querySelectorAll(".content-section").forEach(sec => sec.classList.remove("active"));
        document.getElementById(section).classList.add("active");
    });
});
