import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, Navigation, MapPin } from 'lucide-react';
import RepairFilters from './RepairFilters';

export default function RepairSearchForm({
	searchCity,
	setSearchCity,
	setFilterTag,
}) {
	const [typedLocation, setTypedLocation] = useState('');
	const [coords, setCoords] = useState({ lat: '', lng: '' });
	const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState();

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	const navigate = useNavigate();

	async function geocodedLocation(address) {
		try {
			const encodedAddress = encodeURIComponent(address);

			let res = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
			);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			let data = await res.json();

			if (data.status === 'OK' && data.results.length > 0) {
				const coordinates = {
					lat: data.results[0].geometry.location.lat,
					lng: data.results[0].geometry.location.lng,
				};

				setCoords(coordinates);
				return coordinates;
			} else {
				console.error('No results found for address:', address, data.status);
				return null;
			}
		} catch (error) {
			console.error('Geocoding failed:', error);
			return null;
		}
	}

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

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		console.log('heyyooo');

		if (!typedLocation.trim()) {
			alert('Please enter a location');
			return;
		}

		try {
			// If using current location, use existing coordinates (no API call needed!)
			if (isUsingCurrentLocation && coords.lat && coords.lng) {
				navigate(
					`/results?lat=${coords.lat}&lng=${coords.lng}&city=${typedLocation}`
				);
			} else {
				// Only geocode if it's a manually typed address
				const coordinates = await geocodedLocation(typedLocation);
				if (coordinates) {
					navigate(
						`/results?lat=${coordinates.lat}&lng=${coordinates.lng}&city=${typedLocation}`
					);
				}
			}
		} catch (error) {
			console.error('Failed to get location:', error);
		}
	};

	// Reset the flag when user starts typing manually
	const handleInputChange = (e) => {
		setTypedLocation(e.target.value);
		if (isUsingCurrentLocation) {
			setIsUsingCurrentLocation(false);
		}
	};
	return (
		<form
			className="absolute mt-8 z-100 w-full flex flex-col justify-center px-2 gap-4"
			onSubmit={handleFormSubmit}
		>
			<div className="flex flex-col">
				{/* Location Search Bar */}
				<div className="relative mt-4">
					<input
						type="text"
						className="border w-full rounded-3xl py-2 pl-10 pr-4 text-gray-500 bg-white"
						placeholder="Enter City / Town"
						value={typedLocation}
						onChange={handleInputChange}
					/>
					<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
				</div>
				<button>Search City</button>
			</div>

			<RepairFilters setFilterTag={setFilterTag} />
		</form>
	);
}
