import { useEffect, useState } from 'react';
import shopData from '../../data/mocks/shopData';
import { Shop } from '../../types';

export default function useShops(realShops: Shop[] | null = null): Shop[] {
	const [shops, setShops] = useState<Shop[]>([]);

	useEffect(() => {
		if (realShops && realShops.length > 0) {
			// Use real Places API data when available
			setShops(realShops);
		} else {
			// Fallback to demo data
			setShops(shopData);
		}
	}, [realShops]);

	return shops;
}
