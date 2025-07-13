import { useEffect, useState } from 'react';
import shopData from '../../data/mocks/shopData';

export default function useShops() {
	const [shops, setShops] = useState([]);

	useEffect(() => {
		setShops(shopData);
	}, []);

	return shops;
}
