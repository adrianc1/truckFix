import { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
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

	const handleFormSubmit = async (e) => {
		e.preventDefault();

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
		<div className="flex items-center justify-center px-4 pb-4">
			<form className="w-full flex flex-col gap-4" onSubmit={handleFormSubmit}>
				<div className="relative">
					<input
						type="text"
						className="border w-full rounded-3xl py-2 pl-10 pr-12 text-gray-500 bg-white"
						placeholder="Enter City / Town"
						// value={typedLocation}
						onChange={handleInputChange}
					/>
					<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
					<button
						type="submit"
						className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center"
					>
						<ArrowRight className="w-4 h-4 text-white" />
					</button>
				</div>
			</form>
		</div>
	);
};

export default SearchForm;
