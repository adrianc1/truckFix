import { useEffect, useRef, useState } from 'react';
import { calculateDistance } from './distanceCalculator';
import checkIfOpen from './checkIfOpen';

import { LatLng, SearchCapability, Shop } from '../types';

export function ShopSearcher({
	onPlacesFound,
	center,
	searchTrigger,
	onSearchCapabilityReady,
}: {
	onPlacesFound: (places: Shop[]) => void;
	center: LatLng;
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
			const searchKey = `${center.lat}-${center.lng}-${searchTrigger}`;

			// Skip if already did search
			if (lastSearchRef.current === searchKey) {
				return;
			}

			lastSearchRef.current = searchKey;

			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/shops/nearby?lat=${center.lat}&lng=${center.lng}&radius=50`,
				);

				console.log('ShopSearcher - API response:', response);

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
					// Store all shops
					setAllPlaces(results);
					// Only send the first 'displayLimit' to parent for display
					onPlacesFound(results.slice(0, displayLimit));
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
	}, [center, searchTrigger]);

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
	}, [center, searchTrigger]);

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
