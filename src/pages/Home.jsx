import { useEffect, useState } from 'react';
import MapWidget from '../features/shops/MapWidget';
import RepairSearchForm from '../features/shops/RepairSearchForm';
import ShopCard from '../features/shops/ShopCard';
import ShopList from '../features/shops/ShopList';
import useShops from '../features/shops/useShops';

export default function Home() {
	const shops = useShops();
	const [filterTag, setFilterTag] = useState('');
	const [filteredShops, setFilteredShops] = useState([]);

	useEffect(() => {
		let filtered = shops.filter((shop) =>
			shop.services.some((service) =>
				service.toLowerCase().includes(filterTag.toLowerCase())
			)
		);
		setFilteredShops(filtered);
	}, [shops, filterTag]);

	function handleFilterTagClick(tag) {
		setFilterTag(tag);
	}

	return (
		<>
			<RepairSearchForm handleFilterTagClick={handleFilterTagClick} />
			<MapWidget />
			<ShopList shops={filteredShops} />
		</>
	);
}
