import { useEffect, useRef } from 'react';

import { LatLng, Shop } from '../types';

export function ShopSearcher({
	onPlacesFound,
	center,
	searchTrigger,
	onSearchCapabilityReady,
}: {
	onPlacesFound: (places: Shop[]) => void;
	center: LatLng;
	searchTrigger: number;
}) {
	const lastSearchRef = useRef<string | null>(null);

	useEffect(() => {
		async function searchPlaces() {
			const searchKey = `${center.lat}-${center.lng}-${searchTrigger}`;

			if (lastSearchRef.current === searchKey) return;
			lastSearchRef.current = searchKey;

			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/shops/nearby?lat=${center.lat}&lng=${center.lng}&radius=25`,
				);

				if (!response.ok) {
					const error = await response.text();
					console.error('ShopSearcher - API error:', error);
					onPlacesFound([]);
					return;
				}

				const data = await response.json();
				const { places: results } = data;

				if (results && results.length) {
					const sorted: Shop[] = [...results].sort(
						(a: Shop, b: Shop) => a.distance - b.distance,
					);
					onPlacesFound(sorted);
				} else {
					onPlacesFound([]);
				}
			} catch (err) {
				console.error('PlacesSearcher - Error searching places:', err);
				onPlacesFound([]);
			}
		}
		searchPlaces();
	}, [center, searchTrigger]);

	useEffect(() => {
		lastSearchRef.current = null;
	}, [center, searchTrigger]);

	return null;
}
