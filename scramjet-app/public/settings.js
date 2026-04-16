// Settings page menu interaction
document.querySelectorAll('.settings-item').forEach(item => {
	item.addEventListener('click', function() {
		const section = this.getAttribute('data-section');

		// Remove active class from all items and sections
		document.querySelectorAll('.settings-item').forEach(i => i.classList.remove('active'));
		document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));

		// Add active class to clicked item and corresponding section
		this.classList.add('active');
		document.getElementById(section).classList.add('active');
	});
});
