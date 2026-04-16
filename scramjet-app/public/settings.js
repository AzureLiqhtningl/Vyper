// THEME DEFINITIONS
const themes = {
    neon: {
        accent: "#58F00C",
        bg: "#000000",
        text: "#C4C4C4"
    },
    blue: {
        accent: "#4DA3FF",
        bg: "#000814",
        text: "#D0E7FF"
    },
    red: {
        accent: "#FF3B3B",
        bg: "#0A0000",
        text: "#FFD6D6"
    },
    gray: {
        accent: "#AAAAAA",
        bg: "#000000",
        text: "#E0E0E0"
    }
};

// APPLY + SAVE THEME
function applyTheme(theme) {
    document.documentElement.style.setProperty("--accent", theme.accent);
    document.documentElement.style.setProperty("--bg", theme.bg);
    document.documentElement.style.setProperty("--text", theme.text);

    localStorage.setItem("vyper-theme", JSON.stringify(theme));
}

// THEME BUTTONS
document.querySelectorAll(".theme-option").forEach(btn => {
    btn.addEventListener("click", () => {
        const themeName = btn.dataset.theme;
        applyTheme(themes[themeName]);
    });
});

// SETTINGS MENU SWITCHING
document.querySelectorAll(".settings-item").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".settings-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const section = item.dataset.section;
        document.querySelectorAll(".content-section").forEach(sec => sec.classList.remove("active"));
        document.getElementById(section).classList.add("active");
    });
});
// CLOAKING BUTTON — OPEN VYPER IN ABOUT:BLANK
const cloakBtn = document.getElementById("cloak-btn");

if (cloakBtn) {
    cloakBtn.addEventListener("click", () => {
        const win = window.open("about:blank", "_blank");
        if (win) {
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
            alert("Your browser blocked the popup. Allow popups to use cloaking.");
        }
    });
}
