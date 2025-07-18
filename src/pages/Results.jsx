import { useEffect, useState } from 'react';
import MapWidget from '../features/shops/MapWidget';
import RepairSearchForm from '../features/shops/RepairSearchForm';
import useShops from '../features/shops/useShops';
import BottomSheetModal from '../features/shops/BottomSheetModal';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

export default function Results({ currentLocation, setCurrentLocation }) {
	const shops = useShops();
	const [filterTag, setFilterTag] = useState('');
	const [filteredShops, setFilteredShops] = useState([]);
	const [searchCity, setSearchCity] = useState('');
	const [searchService, setSearchService] = useState('');
	const { latitude, longitude } = currentLocation;

	console.log(latitude, longitude);

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

	console.log(currentLocation.longitude, currentLocation.latitude);

	// const handleModalContentClick = (e) => {
	// 	e.stopPropagation();
	// };

	// const handleBackdropClick = (e) => {
	// 	if (e.target === e.currentTarget) {
	// 		closeModal();
	// 	}
	// };

	return (
		<div className="mt-14 overflow-y-hidden">
			<RepairSearchForm
				setFilterTag={setFilterTag}
				searchCity={searchCity}
				setSearchCity={setSearchCity}
				searchService={searchService}
				setSearchService={setSearchService}
			/>
			{/* <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<Map
					style={{ width: '100vw', height: '100vh' }}
					mapId={import.meta.env.VITE_MAP_ID}
					defaultCenter={{ lat: 36.1718, lng: -115.1458 }}
					defaultZoom={9}
					gestureHandling={'greedy'}
					disableDefaultUI={true}
				/>
				<AdvancedMarker
					position={{ lat: 36.1718, lng: -115.1458 }}
				></AdvancedMarker>
			</APIProvider> */}

			<BottomSheetModal
				shops={shops}
				filteredShops={filteredShops}
				searchCity={searchCity}
				setFilteredShops={setFilteredShops}
			/>
		</div>
	);
}
