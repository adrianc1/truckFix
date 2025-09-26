import { useEffect, useState, useTransition } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import MapWidget from '../features/shops/MapWidget';
import demoMap from '../assets/images/demomap2.png';
import RepairSearchForm from '../features/shops/RepairSearchForm';
import useShops from '../features/shops/useShops';
import BottomSheetModal from '../features/shops/BottomSheetModal';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

export default function Results() {
	const shops = useShops();
	const [filterTag, setFilterTag] = useState('');
	const [filteredShops, setFilteredShops] = useState([]);
	const [searchCity, setSearchCity] = useState('');
	const [searchService, setSearchService] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const lat = parseFloat(searchParams.get('lat'));
	const lng = parseFloat(searchParams.get('lng'));
	const city = searchParams.get('city');
	const [center, setCenter] = useState({
		lat: 37.3346,
		lng: -122.009,
	});
	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	useEffect(() => {
		console.log(lat, lng, city);
	}, [lat, lng, city]);

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

			<APIProvider
				apiKey={apiKey}
				onLoad={() => console.log('Maps API has loaded.')}
			>
				<div style={{ width: '100vw', height: '100vh' }}>
					<Map
						defaultZoom={13}
						defaultCenter={{ lat, lng }}
						onCameraChanged={(ev) =>
							console.log(
								'camera changed:',
								ev.detail.center,
								'zoom:',
								ev.detail.zoom
							)
						}
					></Map>
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
