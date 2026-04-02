import { useEffect, useRef, useState } from 'react';
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
	// set states for keeping track of shop results
	const [allPlaces, setAllPlaces] = useState<Shop[]>([]);
	const [displayLimit, setDisplayLimit] = useState<number>(10);

	// set ref for last search
	const lastSearchRef = useRef<string | null>(null);

	useEffect(() => {
		async function searchPlaces() {
			// Create a unique key for this search
			const searchKey = `${center.lat}-${center.lng}-${query}-${searchTrigger}`;

			// Skip if already did search
			if (lastSearchRef.current === searchKey) {
				return;
			}

			lastSearchRef.current = searchKey;

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
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/places`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(request),
					},
				);

				if (!response.ok) {
					const error = await response.text();
					console.error('PlacesSearcher - API error:', error);
					setAllPlaces([]);
					onPlacesFound([]);
					return;
				}

				const data = await response.json();
				const { places: results } = data;

				if (results && results.length) {
					// Transform to match data structure on details page
					const transformedPlaces = await Promise.all(
						results.map(async (place: any) => {
							const placeLat = place.location.latitude ?? place.location.lat;
							const placeLng = place.location.longitude ?? place.location.lng;
							const distance = calculateDistance(
								center.lat,
								center.lng,
								typeof placeLat === 'function' ? placeLat() : placeLat,
								typeof placeLng === 'function' ? placeLng() : placeLng,
							);
							const hours = place.regularOpeningHours;
							let isOpenNow: boolean | undefined = undefined;

							if (hours) {
								isOpenNow = checkIfOpen(hours);
							}

							return {
								placeId: place.id,
								name: place.displayName?.text || place.displayName,
								geometry: {
									location: {
										lat:
											typeof placeLat === 'function'
												? placeLat()
												: Number(placeLat),
										lng:
											typeof placeLng === 'function'
												? placeLng()
												: Number(placeLng),
									},
								},
								formatted_address: place.formattedAddress || '',
								vicinity: place.formattedAddress || '',
								rating: place.rating || 0,
								user_ratings_total: place.userRatingCount || 0,
								reviews: (place.reviews || []).map((r: any) => ({
									rating: r.rating,
									text: r.text?.text ?? r.text ?? '',
									authorAttribution: {
										displayName: r.authorAttribution?.displayName ?? '',
									},
									relativePublishTimeDescription:
										r.relativePublishTimeDescription ?? '',
									publishTime: r.publishTime,
								})),
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
						(a: { distance: number }, b: { distance: number }) =>
							a.distance - b.distance,
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
	}, [center, searchTrigger, query]);

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
		if (allPlaces.length > 0) {
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
	}, [displayLimit, allPlaces.length]);

	return null;
}
