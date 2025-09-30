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
						background={'#ff6900'}
						glyphColor={'#000'}
						borderColor={'#000'}
					/>
				</AdvancedMarker>
			))}
		</>
	);
};
