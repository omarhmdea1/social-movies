import { useState, useEffect } from "react";

import { DEVICE_SIZES } from "../constants/responsive-breakpoints";

function useIsOnDevice(deviceSize) {
	const deviceSizesList = Object.values(DEVICE_SIZES);
	const [isOn, setIsOn] = useState(getIsOn());

	function getIsOn() {
		const currentSizeIndex = deviceSizesList.findIndex(
			(value) => deviceSize === value
		);
		if (currentSizeIndex === 0) {
			return getWindowSize() <= deviceSize;
		}
		if (currentSizeIndex === deviceSizesList.length - 1) {
			return getWindowSize() >= deviceSize;
		}
		const outOfPreviousSizeRange =
			getWindowSize() > deviceSizesList[currentSizeIndex - 1];
		const inCurrentSizeRange = getWindowSize() <= deviceSize;
		return outOfPreviousSizeRange && inCurrentSizeRange;
	}

	function getWindowSize() {
		return document.documentElement.clientWidth;
	}

	useEffect(() => {
		function listener() {
			setIsOn(getIsOn());
		}
		window.addEventListener("resize", listener);

		return () => window.removeEventListener("resize", listener);
	}, []);

	return isOn;
}

export { useIsOnDevice, DEVICE_SIZES };
