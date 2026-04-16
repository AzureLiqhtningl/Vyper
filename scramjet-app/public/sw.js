importScripts("/scram/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

self.addEventListener("activate", (event) => {
	event.waitUntil(scramjet.loadConfig());
});

async function handleRequest(event) {
	if (scramjet.route(event)) {
		return scramjet.fetch(event);
	}
	return fetch(event.request);
}

self.addEventListener("fetch", (event) => {
	if (event.request.url.includes("luminsdk")) {
		return;
	}
	event.respondWith(handleRequest(event));
});
