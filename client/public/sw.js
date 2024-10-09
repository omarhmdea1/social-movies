// ===== Config =====
const STATIC_CACHE_NAME = "site-static-v1";
// these files are used across the app
const GLOBAL_STATIC_FILES = [
	"/",
	"/index.html",
	"https://fonts.googleapis.com/icon?family=Material+Icons+Round",
	"https://fonts.gstatic.com/s/materialiconsround/v107/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmP.woff2",
	"icon/icon-16x16.png",
	"icon/icon-32x32.png",
	"icon/icon-48x48.png",
	"icon/icon-72x72.png",
	"icon/icon-96x96.png",
	"icon/icon-128x128.png",
	"icon/icon-144x144.png",
	"icon/icon-152x152.png",
	"icon/icon-192x192.png",
	"icon/icon-384x384.png",
	"icon/icon-512x512.png",
	"icon/monochrome/icon-monochrome-16x16.png",
	"icon/monochrome/icon-monochrome-32x32.png",
	"icon/monochrome/icon-monochrome-48x48.png",
	"icon/monochrome/icon-monochrome-72x72.png",
	"icon/monochrome/icon-monochrome-96x96.png",
	"icon/monochrome/icon-monochrome-128x128.png",
	"icon/monochrome/icon-monochrome-144x144.png",
	"icon/monochrome/icon-monochrome-152x152.png",
	"icon/monochrome/icon-monochrome-192x192.png",
	"icon/monochrome/icon-monochrome-384x384.png",
	"icon/monochrome/icon-monochrome-512x512.png",
	"splash/android/android-splash.png",
	"splash/apple/apple-splash-640-1136.jpg",
	"splash/apple/apple-splash-750-1334.jpg",
	"splash/apple/apple-splash-828-1792.jpg",
	"splash/apple/apple-splash-1125-2436.jpg",
	"splash/apple/apple-splash-1136-640.jpg",
	"splash/apple/apple-splash-1170-2532.jpg",
	"splash/apple/apple-splash-1179-2556.jpg",
	"splash/apple/apple-splash-1242-2208.jpg",
	"splash/apple/apple-splash-1242-2688.jpg",
	"splash/apple/apple-splash-1284-2778.jpg",
	"splash/apple/apple-splash-1290-2796.jpg",
	"splash/apple/apple-splash-1334-750.jpg",
	"splash/apple/apple-splash-1536-2048.jpg",
	"splash/apple/apple-splash-1620-2160.jpg",
	"splash/apple/apple-splash-1668-2224.jpg",
	"splash/apple/apple-splash-1668-2388.jpg",
	"splash/apple/apple-splash-1792-828.jpg",
	"splash/apple/apple-splash-2048-1536.jpg",
	"splash/apple/apple-splash-2048-2732.jpg",
	"splash/apple/apple-splash-2160-1620.jpg",
	"splash/apple/apple-splash-2208-1242.jpg",
	"splash/apple/apple-splash-2224-1668.jpg",
	"splash/apple/apple-splash-2388-1668.jpg",
	"splash/apple/apple-splash-2436-1125.jpg",
	"splash/apple/apple-splash-2532-1170.jpg",
	"splash/apple/apple-splash-2556-1179.jpg",
	"splash/apple/apple-splash-2688-1242.jpg",
	"splash/apple/apple-splash-2732-2048.jpg",
	"splash/apple/apple-splash-2778-1284.jpg",
	"splash/apple/apple-splash-2796-1290.jpg",
];
// these files used to act as a standalone pages
// for example the no-connection page that is viewed
// when the user is not connected to the internet
const STATIC_PAGES_FILES = [
	"/static-pages/logo.svg",
	"/static-pages/global-styles.css",
	"/static-pages/no-connection.html",
];

// ===== Events =====
self.addEventListener("install", (e) => {
	e.waitUntil(cacheStaticFiles());
});

self.addEventListener("activate", (e) => {
	e.waitUntil(deleteOldCache());
});

self.addEventListener("fetch", (e) => {
	if (e.request.url.includes("chrome-extension")) {
		return;
	}
	e.respondWith(handleOffline(e));
});

// ===== functions =====
async function cacheStaticFiles() {
	const cache = await caches.open(STATIC_CACHE_NAME);
	return cache.addAll([...GLOBAL_STATIC_FILES, ...STATIC_PAGES_FILES]);
}

async function deleteOldCache() {
	const keys = await caches.keys();
	const promiseArray = [];
	keys.forEach((key) => {
		if (key === STATIC_CACHE_NAME) {
			return;
		}
		promiseArray.push(caches.delete(key));
	});
	return Promise.all(promiseArray);
}

async function fetchWithTimeout(resource, options = {}) {
	const { timeout = 8000 } = options;

	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	const response = await fetch(resource, {
		...options,
		signal: controller.signal,
	});
	clearTimeout(id);
	return response;
}

async function isConnected() {
	try {
		const response = await fetchWithTimeout("/check-cnnection.txt", {
			timeout: 15000,
		});
		return response.ok;
	} catch (e) {
		return false;
	}
}

async function handleOffline(e) {
	const staticPage = STATIC_PAGES_FILES.find((fileUrl) =>
		e.request.url.includes(fileUrl)
	);
	if (staticPage) {
		return await caches.match(staticPage);
	}
	if (e.request.url.includes("/api/") || (await isConnected())) {
		return await fetch(e.request);
	}
	return await caches.match("/static-pages/no-connection.html");
}
