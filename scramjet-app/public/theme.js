(function() {
    const savedTheme = localStorage.getItem('vyper-theme');
    if (savedTheme && savedTheme !== 'default') {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    const defaultTitle = document.title;
    const faviconLink =
        document.querySelector("link[rel='shortcut icon']") ||
        document.querySelector("link[rel='icon']");
    const defaultFavicon = faviconLink ? faviconLink.getAttribute("href") : "logo.png";

    function ensureFaviconLink() {
        let link =
            document.querySelector("link[rel='shortcut icon']") ||
            document.querySelector("link[rel='icon']");

        if (!link) {
            link = document.createElement("link");
            link.rel = "shortcut icon";
            document.head.appendChild(link);
        }

        return link;
    }

    function applySavedCloak() {
        const savedTitle = localStorage.getItem("vyper-cloak-title");
        const savedFavicon = localStorage.getItem("vyper-cloak-favicon");

        document.title = savedTitle || defaultTitle;
        ensureFaviconLink().href = savedFavicon || defaultFavicon;
    }

    applySavedCloak();

    window.addEventListener("storage", (event) => {
        if (event.key === "vyper-theme") {
            if (event.newValue && event.newValue !== "default") {
                document.documentElement.setAttribute("data-theme", event.newValue);
            } else {
                document.documentElement.removeAttribute("data-theme");
            }
        }

        if (event.key === "vyper-cloak-title" || event.key === "vyper-cloak-favicon") {
            applySavedCloak();
        }
    });

    window.VyperCloak = {
        defaultTitle,
        defaultFavicon,
        applySavedCloak,
        setTitle(title) {
            const nextTitle = (title || "").trim();
            if (nextTitle) {
                localStorage.setItem("vyper-cloak-title", nextTitle);
            } else {
                localStorage.removeItem("vyper-cloak-title");
            }
            applySavedCloak();
        },
        setFavicon(url) {
            if (url && url !== defaultFavicon) {
                localStorage.setItem("vyper-cloak-favicon", url);
            } else {
                localStorage.removeItem("vyper-cloak-favicon");
            }
            applySavedCloak();
        },
        openAboutBlank() {
            const popup = window.open("about:blank", "_blank");
            if (!popup) return false;

            const title = localStorage.getItem("vyper-cloak-title") || defaultTitle;
            const favicon = localStorage.getItem("vyper-cloak-favicon") || defaultFavicon;
            const launchUrl = new URL("index.html", window.location.href).href;

            popup.document.write(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</title>
<link rel="shortcut icon" href="${favicon}">
<style>
html, body, iframe { margin: 0; width: 100%; height: 100%; border: 0; overflow: hidden; background: #000; }
</style>
</head>
<body>
<iframe src="${launchUrl}" referrerpolicy="no-referrer"></iframe>
<script>
(() => {
    const defaultTitle = ${JSON.stringify(defaultTitle)};
    const defaultFavicon = ${JSON.stringify(defaultFavicon)};

    function ensureFaviconLink() {
        let link =
            document.querySelector("link[rel='shortcut icon']") ||
            document.querySelector("link[rel='icon']");

        if (!link) {
            link = document.createElement("link");
            link.rel = "shortcut icon";
            document.head.appendChild(link);
        }

        return link;
    }

    function applySavedCloak() {
        const savedTitle = localStorage.getItem("vyper-cloak-title");
        const savedFavicon = localStorage.getItem("vyper-cloak-favicon");

        document.title = savedTitle || defaultTitle;
        ensureFaviconLink().href = savedFavicon || defaultFavicon;
    }

    applySavedCloak();
    window.addEventListener("storage", (event) => {
        if (event.key === "vyper-cloak-title" || event.key === "vyper-cloak-favicon") {
            applySavedCloak();
        }
    });
})();
</script>
</body>
</html>`);
            popup.document.close();
            return true;
        }
    };
})();

function setTheme(theme) {
    if (theme === 'default') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('vyper-theme', theme);
}
