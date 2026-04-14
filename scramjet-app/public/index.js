"use strict";

/* ELEMENTS */
const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");

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

/* FORM SUBMIT */
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    error.textContent = "";
    errorCode.textContent = "";

    showSpinner();

    try {
        await registerSW();
    } catch (err) {
        hideSpinner();
        error.textContent = "Failed to register service worker.";
        errorCode.textContent = err.toString();
        return;
    }

    const url = buildURL(address.value, searchEngine.value);

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

    const frame = scramjet.createFrame();
    frame.frame.id = "sj-frame";

    frame.frame.style.opacity = "0";
    frame.frame.style.transition = "opacity 0.6s ease";

    document.body.appendChild(frame.frame);

    try {
        await frame.go(url);

        hideSpinner();

        setTimeout(() => {
            frame.frame.style.opacity = "1";
        }, 50);
    } catch (err) {
        hideSpinner();
        error.textContent = "Failed to load the requested site.";
        errorCode.textContent = err.toString();
    }
});
