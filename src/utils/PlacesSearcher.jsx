import { useEffect } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

// Component that searches for places and passes results to parent
export function PlacesSearcher({
	onPlacesFound,
	center,
	query = 'semi truck repair',
	searchTrigger,
}) {
	const map = useMap();
	const placesLib = useMapsLibrary('places');
	const coreLib = useMapsLibrary('core');

	useEffect(() => {
		async function searchPlaces() {
			console.log('PlacesSearcher - checking libraries...', {
				placesLib: !!placesLib,
				coreLib: !!coreLib,
				map: !!map,
				center,
			});

			if (!placesLib || !coreLib || !map || !center) {
				console.log('PlacesSearcher - waiting for libraries to load...');
				return;
			}

			console.log('PlacesSearcher - starting search with query:', query);

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
				],
				locationBias: center,
				language: 'en-US',
				maxResultCount: 5,
				region: 'us',
			};

			try {
				const { places: results } = await Place.searchByText(request);
				console.log('PlacesSearcher - raw results:', results);

				if (results && results.length) {
					// Debug: Check what opening hours data we're getting
					const testPlace = results[0];
					console.log('First place opening hours check:', {
						regularOpeningHours: testPlace.regularOpeningHours,
					});

					// Transform to match your data structure
					const transformedPlaces = results.map((place) => {
						// Try to get opening hours
						const hours = place.regularOpeningHours;
						let isOpenNow = false;

						if (hours) {
							console.log('Hours object for', place.displayName, ':', hours);
							// Try different ways to access open status
							if (typeof hours.isOpen === 'function') {
								try {
									isOpenNow = hours.isOpen();
								} catch (e) {
									console.error('Error calling isOpen():', e);
								}
							} else if (hours.openNow !== undefined) {
								isOpenNow = hours.openNow;
							}
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
							user_ratings_total: place.userRatingCount || 0,
							business_status: place.businessStatus || 'OPERATIONAL',
							services: (place.types || []).filter(Boolean),
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
						};
					});

					console.log(
						'PlacesSearcher - transformed places:',
						transformedPlaces
					);
					onPlacesFound(transformedPlaces);
				} else {
					console.log('PlacesSearcher - no results found');
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
