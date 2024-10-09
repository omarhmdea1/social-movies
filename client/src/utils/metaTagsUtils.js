export function updatePageTitle(title, options = {}) {
	const { withSiteName = true } = options;
	if (withSiteName) {
		title = `${title} - Social Movies`;
	}
	document.title = title;
}
