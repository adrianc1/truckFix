import { useEffect, useRef, useState } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { calculateDistance } from './distanceCalculator';
import checkIfOpen from './checkIfOpen';

import { LatLng, SearchCapability, Shop } from '../types';
export function PlacesSearcher({
	onPlacesFound,
	center,
	query = 'diesel truck mechanic near me',
	searchTrigger,
	onSearchCapabilityReady,
}: {
	onPlacesFound: (places: Shop[]) => void;
	center: LatLng;
	query?: string;
	searchTrigger: number;
	onSearchCapabilityReady?: (capability: SearchCapability) => void;
}) {
	// Load libraries
	const map = useMap();
	const placesLib = useMapsLibrary('places');
	const coreLib = useMapsLibrary('core');

	// set states for keeping track of shop results
	const [allPlaces, setAllPlaces] = useState<Shop[]>([]);
	const [displayLimit, setDisplayLimit] = useState(10);

	// set ref for last search
	const lastSearchRef = useRef<string | null>(null);

	useEffect(() => {
		async function searchPlaces() {
			if (!placesLib || !coreLib || !map || !center) {
				return;
			}

			// Create a unique key for this search
			const searchKey = `${center.lat}-${center.lng}-${query}-${searchTrigger}`;

			// Skip if already did search
			if (lastSearchRef.current === searchKey) {
				// console.log('[PlacesSearcher] Skipping duplicate search');
				return;
			}

			lastSearchRef.current = searchKey;

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
					'reviews',
					'regularOpeningHours',
					'internationalPhoneNumber',
				],
				locationBias: center,
				language: 'en-US',
				maxResultCount: 20,
				region: 'us',
			};

			try {
				const { places: results } = await Place.searchByText(request);
				// console.log('PlacesSearcher - raw results:', results);

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
									: place.location.lng,
							);
							const hours = place.regularOpeningHours;
							let isOpenNow: boolean | undefined = undefined;

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
								vicinity: place.formattedAddress || '',
								rating: place.rating || 0,
								user_ratings_total: place.userRatingCount || 0,
								reviews: place.reviews || [],
								business_status: place.businessStatus || 'OPERATIONAL',
								types: place.types || [],
								services: (place.types || []).filter(Boolean),
								regularOpeningHours: place.regularOpeningHours,
								opening_hours: {
									open_now: isOpenNow ?? false,
								},
								current_opening_hours: {
									open_now: isOpenNow ?? false,
									weekday_text:
										place.regularOpeningHours?.weekdayDescriptions ?? [],
								},
								photos: [],
								source: 'google_places',
								distance: distance,
								phone: place.internationalPhoneNumber,
							} satisfies Shop;
						}),
					);
					// Sort by distance after transforming data
					const sortedPlaces = transformedPlaces.sort(
						(a, b) => a.distance - b.distance,
					);

					// Store all  places
					setAllPlaces(sortedPlaces);
					// Only send the first 'displayLimit' to parent for display
					onPlacesFound(sortedPlaces.slice(0, displayLimit));
				} else {
					setAllPlaces([]);
					onPlacesFound([]);
				}
			} catch (err) {
				console.error('PlacesSearcher - Error searching places:', err);
				setAllPlaces([]);
				onPlacesFound([]);
			}
		}

		searchPlaces();
	}, [placesLib, coreLib, map, center, searchTrigger, query]);

	// When displayLimit changes, send update to parent
	useEffect(() => {
		if (allPlaces.length > 0) {
			onPlacesFound(allPlaces.slice(0, displayLimit));
		}
	}, [displayLimit, allPlaces]);

	// Reset shops when search parameters change
	useEffect(() => {
		setAllPlaces([]);
		setDisplayLimit(10);
		lastSearchRef.current = null;
	}, [center, query, searchTrigger]);

	useEffect(() => {
		if (placesLib && coreLib && map) {
			const loadMore = () => {
				if (displayLimit === 10) {
					setDisplayLimit(15);
				} else if (displayLimit === 15) {
					setDisplayLimit(20);
				}
			};

			if (onSearchCapabilityReady) {
				onSearchCapabilityReady({
					loadMore,
					canLoadMore: displayLimit < 20 && allPlaces.length > displayLimit,
					currentLimit: displayLimit,
				});
			}
		}
	}, [placesLib, coreLib, map, displayLimit, allPlaces.length]);

	return null;
}
