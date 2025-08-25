import { useEffect, useState, useTransition } from 'react';
import { useLocation } from 'react-router-dom';
import MapWidget from '../features/shops/MapWidget';
import RepairSearchForm from '../features/shops/RepairSearchForm';
import useShops from '../features/shops/useShops';
import BottomSheetModal from '../features/shops/BottomSheetModal';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

export default function Results() {
	const shops = useShops();
	const [filterTag, setFilterTag] = useState('');
	const [filteredShops, setFilteredShops] = useState([]);
	const [searchCity, setSearchCity] = useState('');
	const [searchService, setSearchService] = useState('');
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const lat = parseFloat(params.get('lat'));
	const lng = parseFloat(params.get('lng'));
	const [center, setCenter] = useState({
		lat: 37.3346,
		lng: -122.009,
	});

	useEffect(() => {
		if (!isNaN(lat) && !isNaN(lng)) {
			setCenter({ lat, lng });
		}
	}, [lng, lat]);

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
		<div className="mt-14 overflow-y-hidden">
			<RepairSearchForm
				setFilterTag={setFilterTag}
				searchCity={searchCity}
				setSearchCity={setSearchCity}
				searchService={searchService}
				setSearchService={setSearchService}
			/>

			<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<Map
					style={{ width: '100vw', height: '100vh' }}
					mapId={import.meta.env.VITE_MAP_ID}
					defaultCenter={center}
					defaultZoom={9}
					gestureHandling={'greedy'}
					disableDefaultUI={true}
				>
					{/* Marker must be inside Map */}
					<AdvancedMarker position={center} />
				</Map>
			</APIProvider>

			<BottomSheetModal
				shops={shops}
				filteredShops={filteredShops}
				searchCity={searchCity}
				setFilteredShops={setFilteredShops}
			/>
		</div>
	);
}
