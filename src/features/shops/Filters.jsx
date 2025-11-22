import RepairFilters from './RepairFilters';

export default function RepairSearchForm({ setFilterTag }) {
	// const getUserLocation = async () => {
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(
	// 			async (position) => {
	// 				const { latitude, longitude } = position.coords;
	// 				const coordinates = { lat: latitude, lng: longitude };
	// 				setCoords(coordinates);
	// 				setIsUsingCurrentLocation(true);

	// 				// Get the address name and put it in the input field
	// 				try {
	// 					const addressInfo = await reverseGeocode(latitude, longitude);
	// 					const cityName = addressInfo?.cityState || 'Current Location';
	// 					setCoords(coordinates);

	// 					// Put the city name in the input field
	// 					setTypedLocation(cityName);
	// 				} catch (error) {
	// 					console.error('Reverse geocoding failed:', error);
	// 					// Put generic text in input field
	// 					setTypedLocation('Current Location');
	// 				}
	// 			},
	// 			(error) => {
	// 				console.log('Geolocation error:', error);
	// 				alert('Unable to get your location. Please enter it manually.');
	// 			}
	// 		);
	// 	} else {
	// 		alert('Please enable location services');
	// 	}
	// };

	return (
		<div className="absolute mt-16 z-100 w-full flex flex-col justify-center px-2 gap-4">
			<RepairFilters setFilterTag={setFilterTag} />
		</div>
	);
}
