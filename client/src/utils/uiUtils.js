class UIUtils {
	static isStandalone() {
		return window.matchMedia("(display-mode: standalone)").matches;
	}

	static isFullScreen() {
		const isWidthMatch = window.innerWidth === window.screen.width;
		const isHeightMatch = window.innerHeight === window.screen.height;
		return isWidthMatch && isHeightMatch;
	}
}

export default UIUtils;
