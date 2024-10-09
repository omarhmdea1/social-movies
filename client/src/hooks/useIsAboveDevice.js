import { useState, useEffect } from "react";

import { DEVICE_SIZES } from "../constants/responsive-breakpoints";

function useIsAboveDevice(deviceSize) {
	const deviceSizesList = Object.values(DEVICE_SIZES);
	const [isAbove, setIsAbove] = useState(getIsAbove());

	function getIsAbove() {
		const targetSize = deviceSizesList.find(
			(value) => deviceSize === value
		);
		if (getWindowSize() > targetSize) {
			return true;
		}
		return false;
	}

	function getWindowSize() {
		return document.documentElement.clientWidth;
	}

	useEffect(() => {
		function listener() {
			setIsAbove(getIsAbove());
		}
		window.addEventListener("resize", listener);

		return () => window.removeEventListener("resize", listener);
	}, []);

	return isAbove;
}

export { useIsAboveDevice, DEVICE_SIZES };
