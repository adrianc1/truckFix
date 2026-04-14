import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../features/shops/Filters';
import BottomSheetModal from '../features/shops/BottomSheetModal';
import { ShopSearcher } from '../utils/ShopSearcher';
import CurrentLocationMarker from '../components/CurrentLocationMarker';
import PoiMarkers from '../components/PoiMarkers';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { extractServicesFromShop } from '../utils/serviceExtractor';
import { calculateDistance } from '../utils/distanceCalculator';
import { SearchCapability, Shop } from '../types';

export default function Results({ darkMode }: { darkMode: boolean }) {
	const [filterTag, setFilterTag] = useState<string>('');
	const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
	const [searchCity, setSearchCity] = useState<string>('');
	const [searchParams] = useSearchParams();
	const [shops, setShops] = useState<Shop[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [searchTrigger, setSearchTrigger] = useState<number>(0);
	const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
	const [showShopDetails, setShowShopDetails] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [mapCenter, setMapCenter] = useState<{
		lat: number;
		lng: number;
	} | null>(null);
	const [mapKey, setMapKey] = useState<number>(0);
	const [searchCapability, setSearchCapability] =
		useState<SearchCapability | null>(null);

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	const handlePlacesFound = useCallback((places: Shop[]) => {
		// Update each shop with extracted services
		const extractServices = places.map((shop: Shop) => ({
			...shop,
			services: extractServicesFromShop(shop),
		}));

		setShops(extractServices);
		setLoading(false);
	}, []);

	const searchLocation = useMemo(() => {
		const lat = parseFloat(searchParams.get('lat') ?? '');
		const lng = parseFloat(searchParams.get('lng') ?? '');
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
		if (!filterTag) {
			const sortedShops = [...shops].sort((a, b) => a.distance - b.distance);
			setFilteredShops(sortedShops);
			return;
		}

		const filtered = shops.filter((shop: Shop) =>
			shop.services?.some((service) =>
				service?.toLowerCase().includes(filterTag.toLowerCase()),
			),
		);
		setFilteredShops(filtered);
	}, [shops, filterTag]);

	return (
		<div className="mt-14 overflow-y-hidden">
			<Filters setFilterTag={setFilterTag} />

			{searchLocation && (
				<ShopSearcher
					onPlacesFound={handlePlacesFound}
					center={searchLocation}
					searchTrigger={searchTrigger}
					onSearchCapabilityReady={setSearchCapability}
				/>
			)}
			<APIProvider
				apiKey={apiKey}
				onLoad={() => console.log('Maps has loaded.')}
			>
				<div style={{ width: '100vw', height: '100vh' }}>
					<Map
						key={mapKey}
						defaultZoom={13}
						defaultCenter={mapCenter ?? searchLocation ?? { lat: 0, lng: 0 }}
						mapId={import.meta.env.VITE_MAP_ID}
						colorScheme={darkMode ? 'DARK' : undefined}
					>
						<PoiMarkers
							pois={filteredShops}
							onMarkerClick={setSelectedShop}
							setShowShopDetails={setShowShopDetails}
							setIsModalOpen={setIsModalOpen}
						/>
						{searchLocation && (
							<CurrentLocationMarker position={searchLocation} />
						)}
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
				searchCapability={searchCapability}
				loading={loading}
			/>
		</div>
	);
}
