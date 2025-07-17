import { useEffect, useState } from 'react';
import MapWidget from '../features/shops/MapWidget';
import RepairSearchForm from '../features/shops/RepairSearchForm';
import ShopList from '../features/shops/ShopList';
import ShopDetailsPage from './ShopDetailsPage';
import useShops from '../features/shops/useShops';
import BottomSheetModal from '../features/shops/BottomSheetModal';

export default function Home() {
	const shops = useShops();
	const [filterTag, setFilterTag] = useState('');
	const [filteredShops, setFilteredShops] = useState([]);

	const [searchCity, setSearchCity] = useState('');
	const [searchService, setSearchService] = useState('');

	useEffect(() => {
		let filtered = shops.filter((shop) =>
			shop.services.some(
				(service) =>
					service.toLowerCase().includes(filterTag.toLowerCase()) &&
					service.toLowerCase().includes(searchService.toLowerCase())
			)
		);
		setFilteredShops(filtered);
	}, [shops, filterTag, searchService]);

	// const handleModalContentClick = (e) => {
	// 	e.stopPropagation();
	// };

	// const handleBackdropClick = (e) => {
	// 	if (e.target === e.currentTarget) {
	// 		closeModal();
	// 	}
	// };

	return (
		<div className="mt-14">
			<RepairSearchForm
				setFilterTag={setFilterTag}
				searchCity={searchCity}
				setSearchCity={setSearchCity}
				searchService={searchService}
				setSearchService={setSearchService}
			/>
			<MapWidget />
			<BottomSheetModal
				shops={shops}
				filteredShops={filteredShops}
				searchCity={searchCity}
				setFilteredShops={setFilteredShops}
			/>
		</div>
	);
}
