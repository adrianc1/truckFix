import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const libraries = ['places'];

const mapContainerStyle = {
	width: '100%',
	height: '500px',
};
export default function NearbyShopsMap() {
	const location = useLocation();
	const userLocation = location.state?.location;

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	const [map, setMap] = useState(/** @type google.maps.Map*/ (null));
	const [markers, setMarkers] = useState([]);
	// const [currentLocation, setCurrentLocation] = { lat, lng };

	// useEffect(() => {
	// 	if (currentLocation) {
	// 		const lat = currentLocation.lat;
	// 		const lng = currentLocation.lng;
	// 		setUserLocation({ lat, lng });
	// 	} else {
	// 		console.log(userLocation);
	// 		setUserLocation({ lat: 30.0131, lng: 31.2089 });
	// 	}
	// }, [currentLocation]);
	// Get current location

	// useEffect(() => {
	// 	if (!locationString) {
	// 		navigator.geolocation.getCurrentPosition(
	// 			(position) => {
	// 				setUserLocation({
	// 					lat: position.coords.latitude,
	// 					lng: position.coords.longitude,
	// 				});
	// 			},
	// 			(error) => {
	// 				console.error('Error getting user location:', error);
	// 				setUserLocation({ lat: 37.7749, lng: -122.4194 });
	// 			}
	// 		);
	// 	}
	// }, []);

	// Search nearby places when map and location are ready
	console.log('im here');
	useEffect(() => {
		if (!map || !userLocation) return;

		const service = new window.google.maps.places.PlacesService(map);

		const request = {
			location: userLocation,
			radius: '3000',
			keyword: 'shop',
		};

		service.nearbySearch(request, (results, status) => {
			if (
				status === window.google.maps.places.PlacesServiceStatus.OK &&
				results
			) {
				const places = results.map((place) => ({
					id: place.place_id,
					name: place.name,
					position: {
						lat: place.geometry.location.lat(),
						lng: place.geometry.location.lng(),
					},
				}));
				setMarkers(places);
			}
		});
	}, [map, userLocation]);
	console.log(isLoaded, userLocation);

	if (!isLoaded || !userLocation) return <div>Loading Map...</div>;

	return (
		<div className="w-full max-w-5xl mx-auto">
			<h2 className="text-xl font-bold mb-4 text-center">Shops Near You</h2>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={userLocation}
				zoom={14}
				onLoad={(map) => setMap(map)}
			>
				{/* User's current location marker */}
				<Marker
					position={userLocation}
					icon={{
						url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
					}}
				/>
				{/* Places markers */}
				{markers.map((marker) => (
					<Marker
						key={marker.id}
						position={marker.position}
						title={marker.name}
					/>
				))}
			</GoogleMap>
			<button onClick={() => map.panTo(userLocation)}>Recenter Map</button>
		</div>
	);
}
