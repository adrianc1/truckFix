import { useEffect, useState } from 'react';
import shopData from '../../data/mocks/shopData';

export default function useShops(realShops = null) {
	const [shops, setShops] = useState([]);

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
