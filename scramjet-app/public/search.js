"use strict";

/**
 * Converts user input into a fully qualified URL.
 * Falls back to a search engine query if input is not a valid URL.
 * @param {string} input
 * @param {string} engine Template for a search query, e.g. "https://search.brave.com/search?q=%s"
 * @returns {string} Fully qualified URL
 */
function buildURL(input, engine) {
	try {
		// input is a valid URL: e.g. https://example.com
		return new URL(input).toString();
	} catch (err) {
		// not a valid URL
	}

	try {
		// input is a valid URL when http:// is prepended: e.g. example.com
		const url = new URL(`http://${input}`);
		if (url.hostname.includes(".")) return url.toString();
	} catch (err) {
		// not a valid URL
	}

	// Treat input as a search query
	return engine.replace("%s", encodeURIComponent(input));
}
