let isLoaded = false;
let isLoading = false;
let loadPromise = null;

export const loadGoogleMapsScript = () => {
	// Return existing promise if already loading
	if (loadPromise) {
		return loadPromise;
	}

	// Return resolved promise if already loaded
	if (isLoaded) {
		return Promise.resolve();
	}

	// Start loading
	isLoading = true;
	loadPromise = new Promise((resolve, reject) => {
		// Check if script is already loaded
		if (window.google?.maps?.places?.PlacesService) {
			isLoaded = true;
			isLoading = false;
			resolve();
			return;
		}

		// Create script element
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${
			import.meta.env.VITE_GOOGLE_MAPS_API_KEY
		}&libraries=places`;
		script.async = true;

		script.onload = () => {
			isLoaded = true;
			isLoading = false;
			resolve();
		};

		script.onerror = () => {
			isLoading = false;
			loadPromise = null;
			reject(new Error('Failed to load Google Maps script'));
		};

		document.head.appendChild(script);
	});

	return loadPromise;
};

export const isGoogleMapsLoaded = () => {
	return isLoaded && window.google?.maps?.places?.PlacesService;
};
