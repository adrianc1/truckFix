import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import RepairSearchForm from '../features/shops/RepairSearchForm';
import BottomSheetModal from '../features/shops/BottomSheetModal';
import { PlacesSearcher } from '../utils/PlacesSearcher';
import CurrentLocationMarker from '../components/CurrentLocationMarker';
import PoiMarkers from '../components/PoiMarkers';
import {
	APIProvider,
	Map,
	AdvancedMarker,
	Pin,
} from '@vis.gl/react-google-maps';

export default function Results() {
	const [filterTag, setFilterTag] = useState('');
	const [filteredShops, setFilteredShops] = useState([]);
	const [searchCity, setSearchCity] = useState('');
	const [searchService, setSearchService] = useState('semi truck repair');
	const [searchParams] = useSearchParams();
	const lat = parseFloat(searchParams.get('lat'));
	const lng = parseFloat(searchParams.get('lng'));
	const [shops, setShops] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchLocation, setSearchLocation] = useState({ lat, lng });
	const [searchTrigger, setSearchTrigger] = useState(0);
	const [selectedShop, setSelectedShop] = useState(null);
	const [showShopDetails, setShowShopDetails] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [maxDistance, setMaxDistance] = useState(50); // Add this state

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	const shopsWithinRange = shops.filter((shop) => shop.distance <= maxDistance);

	const handlePlacesFound = useCallback((places) => {
		console.log('Results - received places:', places);
		setShops(places);
		setLoading(false);
	}, []);

	console.log('new lat', lat, 'new lng', lng);

	useEffect(() => {
		if (!isNaN(lat) && !isNaN(lng)) {
			setSearchLocation({ lat, lng });
			setSearchTrigger((prev) => prev + 1);
		}
	}, [lat, lng]);

	useEffect(() => {
		let filtered = shops.filter((shop) =>
			shop.services?.some((service) =>
				service?.toLowerCase().includes(filterTag.toLowerCase())
			)
		);
		setFilteredShops(filtered);
	}, [shops, filterTag]);

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
				setSearchService={setSearchService}
			/>

			<APIProvider
				apiKey={apiKey}
				onLoad={() => console.log('Maps API has loaded.')}
			>
				<div style={{ width: '100vw', height: '100vh' }}>
					<Map
						defaultZoom={13}
						center={{ lat, lng }}
						mapId={import.meta.env.VITE_MAP_ID}
						onCameraChanged={(ev) =>
							console.log(
								'camera changed:',
								ev.detail.center,
								'zoom:',
								ev.detail.zoom
							)
						}
					>
						<PlacesSearcher
							onPlacesFound={handlePlacesFound}
							center={searchLocation}
							query={searchService || 'truck repair shop'}
							searchTrigger={searchTrigger}
						/>
						<PoiMarkers
							pois={shops}
							onMarkerClick={setSelectedShop}
							setShowShopDetails={setShowShopDetails}
							setIsModalOpen={setIsModalOpen}
						/>
						<CurrentLocationMarker position={searchLocation} />
					</Map>
				</div>
			</APIProvider>

			<BottomSheetModal
				shops={shops}
				filteredShops={filteredShops}
				searchCity={searchCity}
				setFilteredShops={setFilteredShops}
				selectedShop={selectedShop}
				setSelectedShop={setSelectedShop}
				showShopDetails={showShopDetails}
				setShowShopDetails={setShowShopDetails}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</div>
	);
}
