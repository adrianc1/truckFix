import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import RepairSearchForm from '../features/shops/RepairSearchForm';
import BottomSheetModal from '../features/shops/BottomSheetModal';
import { PlacesSearcher } from '../utils/PlacesSearcher';
import CurrentLocationMarker from '../components/CurrentLocationMarker';
import PoiMarkers from '../components/PoiMarkers';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { extractServicesFromShop } from '../utils/serviceExtractor';

export default function Results() {
	const [filterTag, setFilterTag] = useState('');
	const [filteredShops, setFilteredShops] = useState([]);
	const [searchCity, setSearchCity] = useState('');
	const [searchService, setSearchService] = useState('semi truck repair');
	const [searchParams] = useSearchParams();
	const [shops, setShops] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchTrigger, setSearchTrigger] = useState(0);
	const [selectedShop, setSelectedShop] = useState(null);
	const [showShopDetails, setShowShopDetails] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [mapCenter, setMapCenter] = useState();
	const [mapKey, setMapKey] = useState(0);

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	const handlePlacesFound = useCallback((places) => {
		console.log('Results - received places:', places);

		// Enhance each shop with extracted services
		const filteredPlaces = places.map((shop) => ({
			...shop,
			services: extractServicesFromShop(shop),
		}));

		console.log('Enhanced places with services:', filteredPlaces);
		setShops(filteredPlaces);
		setLoading(false);
	}, []);

	const searchLocation = useMemo(() => {
		const lat = parseFloat(searchParams.get('lat'));
		const lng = parseFloat(searchParams.get('lng'));
		return !isNaN(lat) && !isNaN(lng) ? { lat, lng } : null;
	}, [searchParams]);

	useEffect(() => {
		if (searchLocation) {
			setMapCenter(searchLocation);
			setMapKey((prev) => prev + 1);
			setSearchTrigger((prev) => prev + 1);
		}
	}, [searchLocation]);

	useEffect(() => {
		console.log('[Results] Filtering shops');

		if (!filterTag) {
			setFilteredShops(shops);
			return;
		}

		const filtered = shops.filter((shop) =>
			shop.services?.some((service) =>
				service?.toLowerCase().includes(filterTag.toLowerCase())
			)
		);
		setFilteredShops(filtered);
	}, [shops, filterTag]);

	console.log('hey i rendered');

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
						key={mapKey}
						defaultZoom={13}
						defaultCenter={mapCenter || searchLocation}
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
