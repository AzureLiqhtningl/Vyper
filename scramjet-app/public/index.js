"use strict";

/* ELEMENTS */
const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");

/* BROWSER NAV ELEMENTS */
const browserNav = document.getElementById("browser-nav");
const navBack = document.getElementById("nav-back");
const navForward = document.getElementById("nav-forward");
const navRefresh = document.getElementById("nav-refresh");
const navUrlInput = document.getElementById("nav-url-input");
const navHomeBtn = document.getElementById("nav-home-btn");
const navHideBtn = document.getElementById("nav-hide-btn");
const navShowTab = document.getElementById("nav-show-tab");
const homeTransition = document.getElementById("home-transition");

/* FRAME REFERENCE */
let currentFrame = null;
let navHidden = false;

/* SCRAMJET */
const { ScramjetController } = $scramjetLoadController();
const scramjet = new ScramjetController({
    files: {
        wasm: "/scram/scramjet.wasm.wasm",
        all: "/scram/scramjet.all.js",
        sync: "/scram/scramjet.sync.js",
    },
});
scramjet.init();

/* BAREMUX */
const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

/* NEON SPINNER */
function showSpinner() {
    const spinner = document.createElement("div");
    spinner.id = "neon-spinner";
    spinner.innerHTML = `<div class="spinner-ring"></div>`;
    document.body.appendChild(spinner);
}
function hideSpinner() {
    const spinner = document.getElementById("neon-spinner");
    if (spinner) spinner.remove();
}

/* CUSTOM SEARCH LOGIC */
function buildURL(input, engine) {
    try {
        if (input.startsWith("http://") || input.startsWith("https://")) return input;
        if (input.includes(".")) return "https://" + input;
        return engine.replace("%s", encodeURIComponent(input));
    } catch {
        return engine.replace("%s", encodeURIComponent(input));
    }
}

/* BROWSER NAV LOGIC */
function showBrowserNav(url) {
    browserNav.classList.add("visible");
    browserNav.classList.remove("hidden-bar");
    navShowTab.classList.remove("visible");
    navHidden = false;
    try {
        const parsed = new URL(url);
        navUrlInput.value = parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "");
    } catch {
        navUrlInput.value = url;
    }
    updateNavButtons();
}

function hideBrowserNav() {
    browserNav.classList.remove("visible");
    browserNav.classList.remove("hidden-bar");
    navShowTab.classList.remove("visible");
    navUrlInput.value = "";
    navHidden = false;
}

function updateNavButtons() {
    if (!currentFrame) return;
    try {
        navBack.disabled = !currentFrame.historyCanGoBack?.();
        navForward.disabled = !currentFrame.historyCanGoForward?.();
    } catch {
        navBack.disabled = true;
        navForward.disabled = true;
    }
}

/* HIDE NAV BAR */
navHideBtn.addEventListener("click", () => {
    browserNav.classList.add("hidden-bar");
    navShowTab.classList.add("visible");
    navHidden = true;
});

/* SHOW NAV BAR AGAIN */
navShowTab.addEventListener("click", () => {
    browserNav.classList.remove("hidden-bar");
    navShowTab.classList.remove("visible");
    navHidden = false;
});

navBack.addEventListener("click", () => {
    if (currentFrame) { try { currentFrame.historyGoBack?.(); updateNavButtons(); } catch {} }
});

navForward.addEventListener("click", () => {
    if (currentFrame) { try { currentFrame.historyGoForward?.(); updateNavButtons(); } catch {} }
});

navRefresh.addEventListener("click", () => {
    if (currentFrame) { try { currentFrame.reload?.(); } catch {} }
});

/* HOME BUTTON WITH TRANSITION */
navHomeBtn.addEventListener("click", () => {
    // Show transition overlay with spinner and logo
    homeTransition.classList.add("active");

    setTimeout(() => {
        if (currentFrame) {
            currentFrame.frame.remove();
            currentFrame = null;
        }
        hideBrowserNav();
        address.value = "";
        error.textContent = "";
        errorCode.textContent = "";

        // Fade out transition overlay
        homeTransition.style.transition = "opacity 0.4s ease";
        homeTransition.style.opacity = "0";
        setTimeout(() => {
            homeTransition.classList.remove("active");
            homeTransition.style.opacity = "";
            homeTransition.style.transition = "";
        }, 400);
    }, 900);
});

/* Navigate from nav url bar */
navUrlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const input = navUrlInput.value.trim();
        if (input) navigateProxy(buildURL(input, searchEngine.value));
    }
});

/* NAVIGATE PROXY */
async function navigateProxy(url) {
    showSpinner();

    try {
        await registerSW();
    } catch (err) {
        hideSpinner();
        error.textContent = "Failed to register service worker.";
        errorCode.textContent = err.toString();
        return;
    }

    let wispUrl =
        (location.protocol === "https:" ? "wss" : "ws") +
        "://" +
        location.host +
        "/wisp/";

    try {
        if ((await connection.getTransport()) !== "/libcurl/index.mjs") {
            await connection.setTransport("/libcurl/index.mjs", [{ websocket: wispUrl }]);
        }
    } catch (err) {
        hideSpinner();
        error.textContent = "Failed to initialize proxy transport.";
        errorCode.textContent = err.toString();
        return;
    }

    if (currentFrame) {
        currentFrame.frame.remove();
        currentFrame = null;
    }

    const frame = scramjet.createFrame();
    frame.frame.id = "sj-frame";
    frame.frame.style.opacity = "0";
    frame.frame.style.transition = "opacity 0.6s ease";
    document.body.appendChild(frame.frame);
    currentFrame = frame;

    try {
        await frame.go(url);
        hideSpinner();
        showBrowserNav(url);
        setTimeout(() => {
            frame.frame.style.opacity = "1";
        }, 50);
    } catch (err) {
        hideSpinner();
        error.textContent = "Failed to load the requested site.";
        errorCode.textContent = err.toString();
    }
}

/* FORM SUBMIT */
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error.textContent = "";
    errorCode.textContent = "";
    const url = buildURL(address.value, searchEngine.value);
    await navigateProxy(url);
});
