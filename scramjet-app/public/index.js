"use strict";

/* ELEMENTS */
const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");
const browserTab = document.getElementById("browser-tab");
const tabDomain = document.getElementById("tab-domain");
const tabCenter = document.getElementById("tab-center");
const tabInput = document.getElementById("tab-input");
const btnBack = document.getElementById("btn-back");
const btnForward = document.getElementById("btn-forward");
const btnRefresh = document.getElementById("btn-refresh");
const btnHome = document.getElementById("btn-home");
const tabLogoMenu = document.getElementById("tab-logo-menu");
const topNav = document.querySelector(".top-nav-buttons");

/* FRAME REFERENCE */
let currentFrame = null;

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

/* BROWSER CONTROLS */
function updateTabButtons() {
    if (!currentFrame) return;
    btnBack.disabled = !currentFrame.historyCanGoBack();
    btnForward.disabled = !currentFrame.historyCanGoForward();
}

function goBack() {
    if (currentFrame && currentFrame.historyCanGoBack()) {
        currentFrame.historyGoBack();
        updateTabButtons();
    }
}

function goForward() {
    if (currentFrame && currentFrame.historyCanGoForward()) {
        currentFrame.historyGoForward();
        updateTabButtons();
    }
}

function refresh() {
    if (currentFrame) {
        currentFrame.reload();
    }
}

function goHome() {
    if (currentFrame) {
        currentFrame.frame.remove();
        currentFrame = null;
        address.value = "";
        address.focus();
        browserTab.classList.add("hidden");
        btnBack.disabled = true;
        btnForward.disabled = true;
        // Show nav buttons again when returning home
        if (topNav) topNav.style.display = "";
    }
}

function editDomain() {
    tabDomain.classList.add("hidden");
    tabInput.classList.remove("hidden");
    tabInput.value = tabDomain.textContent;
    tabInput.focus();
    tabInput.select();
}

function cancelEdit() {
    tabInput.classList.add("hidden");
    tabDomain.classList.remove("hidden");
}

function submitEdit() {
    const newUrl = tabInput.value.trim();
    if (newUrl) {
        cancelEdit();
        navigateToUrl(newUrl);
    }
}

tabDomain.addEventListener("click", editDomain);

tabInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitEdit();
    } else if (e.key === "Escape") {
        cancelEdit();
    }
});

tabInput.addEventListener("blur", () => {
    setTimeout(cancelEdit, 150);
});

btnBack.addEventListener("click", goBack);
btnForward.addEventListener("click", goForward);
btnRefresh.addEventListener("click", refresh);

/* CUSTOM SEARCH LOGIC */
function buildURL(input, engine) {
    try {
        if (input.startsWith("http://") || input.startsWith("https://")) {
            return input;
        }
        if (input.includes(".")) {
            return "https://" + input;
        }
        return engine.replace("%s", encodeURIComponent(input));
    } catch {
        return engine.replace("%s", encodeURIComponent(input));
    }
}

async function navigateToUrl(urlInput) {
    const url = buildURL(urlInput, searchEngine.value);

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
            await connection.setTransport("/libcurl/index.mjs", [
                { websocket: wispUrl },
            ]);
        }
    } catch (err) {
        hideSpinner();
        error.textContent = "Failed to initialize proxy transport.";
        errorCode.textContent = err.toString();
        return;
    }

    if (currentFrame) {
        currentFrame.frame.remove();
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

        try {
            const urlObj = new URL(url);
            const domain = urlObj.hostname;
            tabDomain.textContent = domain;
            browserTab.classList.remove("hidden");
            updateTabButtons();
            // Hide nav buttons when proxy frame is active
            if (topNav) topNav.style.display = "none";
        } catch (e) {
            console.error("Failed to parse URL for tab:", e);
        }

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
    await navigateToUrl(address.value);
});
