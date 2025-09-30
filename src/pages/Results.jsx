import { useEffect, useState, useTransition } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import MapWidget from '../features/shops/MapWidget';
import demoMap from '../assets/images/demomap2.png';
import RepairSearchForm from '../features/shops/RepairSearchForm';
import useShops from '../features/shops/useShops';
import BottomSheetModal from '../features/shops/BottomSheetModal';
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
	const [searchService, setSearchService] = useState('');
	const [searchParams] = useSearchParams();
	const lat = parseFloat(searchParams.get('lat'));
	const lng = parseFloat(searchParams.get('lng'));
	const [nearbyShops, setNearbyShops] = useState([]);
	const [loading, setLoading] = useState(false);
	const [center, setCenter] = useState();

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
	const shops = useShops(nearbyShops);

	useEffect(() => {
		if (!isNaN(lat) && !isNaN(lng)) {
			setCenter({ lat, lng });

			const fetchNearbyShops = async () => {
				setLoading(true);
				try {
					const results = await searchNearbyRepairShops(lat, lng);
					setNearbyShops(results); // This will trigger useShops to use real data
				} catch (error) {
					console.error('Error fetching nearby shops:', error);
					setNearbyShops([]); // This will make useShops fall back to demo data
				} finally {
					setLoading(false);
				}
			};

			fetchNearbyShops();
		}
	}, [lat, lng]);

	const searchNearbyRepairShops = async (
		lat,
		lng,
		query = 'truck repair shop',
		radius = 10000
	) => {
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
					query
				)}&location=${lat},${lng}&radius=${radius}&key=${apiKey}`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			if (data.status === 'OK') {
				const nearbyShops = data.results.map((place) => ({
					id: place.place_id,
					name: place.name,
					vicinity: place.formatted_address,
					address: place.formatted_address,
					rating: place.rating || 0,
					coordinates: {
						lat: place.geometry.location.lat,
						lng: place.geometry.location.lng,
					},
					services: ['General Repair', 'Truck Service'],
					phone: 'Call for info',
					isOpen: place.opening_hours?.open_now || null,
					photoUrl: place.photos?.[0]
						? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${apiKey}`
						: null,
					placeId: place.place_id,
				}));

				return nearbyShops;
			} else {
				console.error('Places Text Search error:', data.status);
				return [];
			}
		} catch (error) {
			console.error('Text search failed:', error);
			return [];
		}
	};

	useEffect(() => {
		let filtered = shops.filter((shop) =>
			shop.services.some((service) =>
				service.toLowerCase().includes(filterTag.toLowerCase())
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
						defaultCenter={{ lat, lng }}
						mapId="320c16fbbeb5efaf348d661f"
						onCameraChanged={(ev) =>
							console.log(
								'camera changed:',
								ev.detail.center,
								'zoom:',
								ev.detail.zoom
							)
						}
					>
						<PoiMarkers pois={shops} />
					</Map>
				</div>
			</APIProvider>

			{/* <div className="demo-map" style={{ width: '100vw', height: '100vh' }}>
				<img
					src={demoMap}
					alt=""
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
			</div> */}

			<BottomSheetModal
				shops={shops}
				filteredShops={filteredShops}
				searchCity={searchCity}
				setFilteredShops={setFilteredShops}
			/>
		</div>
	);
}

const PoiMarkers = ({ pois }) => {
	return (
		<>
			{pois.map((poi) => (
				<AdvancedMarker key={poi.place_id} position={poi.geometry.location}>
					<Pin
						background={'#FBBC04'}
						glyphColor={'#000'}
						borderColor={'#000'}
					/>
				</AdvancedMarker>
			))}
		</>
	);
};
