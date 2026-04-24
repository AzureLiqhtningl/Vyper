// Apply saved theme immediately on every page load
(function() {
    const saved = localStorage.getItem('vyper-theme');
    if (saved && saved !== 'default') {
        document.documentElement.setAttribute('data-theme', saved);
    }
})();

function setTheme(theme) {
    if (theme === 'default') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('vyper-theme', theme);
}
