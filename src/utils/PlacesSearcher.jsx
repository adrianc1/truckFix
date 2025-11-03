import { useEffect, useRef } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { calculateDistance } from './distanceCalculator';
import checkIfOpen from './checkIfOpen';

export function PlacesSearcher({
	onPlacesFound,
	center,
	query = 'semi truck repair',
	searchTrigger,
}) {
	// Load libraries
	const map = useMap();
	const placesLib = useMapsLibrary('places');
	const coreLib = useMapsLibrary('core');

	// set ref for last search
	const lastSearchRef = useRef(null);

	useEffect(() => {
		async function searchPlaces() {
			if (!placesLib || !coreLib || !map || !center) {
				console.log('PlacesSearcher - waiting for libraries to load...');
				return;
			}

			// Create a unique key for this search
			const searchKey = `${center.lat}-${center.lng}-${query}-${searchTrigger}`;

			// Skip if we already did this exact search
			if (lastSearchRef.current === searchKey) {
				console.log('[PlacesSearcher] Skipping duplicate search');
				return;
			}

			lastSearchRef.current = searchKey;
			console.log('[PlacesSearcher] 🚀 MAKING API CALL #' + searchTrigger);

			const { Place } = placesLib;

			const request = {
				textQuery: query,
				fields: [
					'displayName',
					'location',
					'formattedAddress',
					'id',
					'businessStatus',
					'rating',
					'userRatingCount',
					'types',
					'regularOpeningHours',
					'reviews',
					'editorialSummary',
				],
				locationBias: center,
				language: 'en-US',
				maxResultCount: 10,
				region: 'us',
			};

			try {
				const { places: results } = await Place.searchByText(request);
				console.log('PlacesSearcher - raw results:', results);

				if (results && results.length) {
					// Transform to match data structure on details page
					const transformedPlaces = await Promise.all(
						results.map(async (place) => {
							const distance = calculateDistance(
								center.lat,
								center.lng,
								typeof place.location.lat === 'function'
									? place.location.lat()
									: place.location.lat,
								typeof place.location.lng === 'function'
									? place.location.lng()
									: place.location.lng
							);
							const hours = place.regularOpeningHours;
							let isOpenNow = undefined;

							if (hours) {
								isOpenNow = checkIfOpen(hours);
							}

							return {
								place_id: place.id,
								name: place.displayName,
								geometry: {
									location: {
										lat:
											typeof place.location.lat === 'function'
												? place.location.lat()
												: place.location.lat,
										lng:
											typeof place.location.lng === 'function'
												? place.location.lng()
												: place.location.lng,
									},
								},
								formatted_address: place.formattedAddress || '',
								rating: place.rating || 0,
								reviews: place.reviews || [],
								editorial_summary: place.editorialSummary || null,
								user_ratings_total: place.userRatingCount || 0,
								business_status: place.businessStatus || 'OPERATIONAL',
								services: (place.types || []).filter(Boolean),
								currentOpeningHours: place.regularOpeningHours,
								opening_hours: {
									open_now: isOpenNow,
								},
								current_opening_hours: place.regularOpeningHours
									? {
											weekday_text:
												place.regularOpeningHours.weekdayDescriptions || [],
									  }
									: null,
								source: 'google_places',
								distance: distance,
							};
						})
					);
					onPlacesFound(transformedPlaces);
				} else {
					onPlacesFound([]);
				}
			} catch (err) {
				console.error('PlacesSearcher - Error searching places:', err);
				onPlacesFound([]);
			}
		}

		searchPlaces();
	}, [placesLib, coreLib, map, center, searchTrigger, query]);

	return null;
}
