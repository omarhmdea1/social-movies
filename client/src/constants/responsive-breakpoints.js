export const DEVICE_SIZES = {
	mobileDevices: 480,
	iPadsAndTablets: 768,
	smallScreensAndLaptops: 1024,
	desktopsAndLargeScreens: 1200,
	extraLargeScreens: 1201,
};

export const DEVICES = {
	mobileDevices: `${DEVICE_SIZES.mobileDevices}px`,
	iPadsAndTablets: `${DEVICE_SIZES.iPadsAndTablets}px`,
	smallScreensAndLaptops: `${DEVICE_SIZES.smallScreensAndLaptops}px`,
	desktopsAndLargeScreens: `${DEVICE_SIZES.desktopsAndLargeScreens}px`,
	extraLargeScreens: `${DEVICE_SIZES.extraLargeScreens}px`,
};

export const BREAKPOINTS = {
	mobileDevices: `(max-width: ${DEVICES.mobileDevices})`,
	iPadsAndTablets: `(max-width: ${DEVICES.iPadsAndTablets})`,
	smallScreensAndLaptops: `(max-width: ${DEVICES.smallScreensAndLaptops})`,
	desktopsAndLargeScreens: `(max-width: ${DEVICES.desktopsAndLargeScreens})`,
	extraLargeScreens: `(min-width: ${DEVICES.extraLargeScreens})`,
};
