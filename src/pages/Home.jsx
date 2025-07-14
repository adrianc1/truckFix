import { useEffect, useState } from 'react';
import MapWidget from '../features/shops/MapWidget';
import RepairSearchForm from '../features/shops/RepairSearchForm';
import ShopCard from '../features/shops/ShopCard';
import ShopList from '../features/shops/ShopList';
import useShops from '../features/shops/useShops';

export default function Home() {
	const shops = useShops();
	const [filterTag, setFilterTag] = useState('Brakes');
	const [filteredShops, setFilteredShops] = useState([]);

	useEffect(() => {
		let filtered = [];
		shops.map((shop) => {
			const filteredShop = shop.services.includes(filterTag) ? shop : null;
			if (!filteredShop) return;
			filtered.push(filteredShop);
		});
		console.log(filtered);

		setFilteredShops(filtered);
	}, [shops, filterTag]);

	return (
		<>
			<RepairSearchForm />
			<MapWidget />
			<ShopList shops={filteredShops} />
		</>
	);
}
