import { useState } from 'react';
import { Navigation, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
	const [typedLocation, setTypedLocation] = useState('');
	const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
	const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState<boolean>(false);
	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	const navigate = useNavigate();

	async function geocodedLocation(address: string) {
		try {
			const encodedAddress = encodeURIComponent(address);
			const res = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
			);
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			const data = await res.json();
			if (data.status === 'OK' && data.results.length > 0) {
				const coordinates = {
					lat: data.results[0].geometry.location.lat,
					lng: data.results[0].geometry.location.lng,
				};
				setCoords(coordinates);
				return coordinates;
			}
			return null;
		} catch (error) {
			console.error('Geocoding failed:', error);
			return null;
		}
	}

	const getUserLocation = () => {
		if (!navigator.geolocation) {
			alert('Please enable location services');
			return;
		}
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords;
				const coordinates = { lat: latitude, lng: longitude };
				setCoords(coordinates);
				setIsUsingCurrentLocation(true);
				try {
					const res = await fetch(
						`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
					);
					const data = await res.json();
					if (data.status === 'OK' && data.results.length > 0) {
						const components: { types: string[]; long_name: string; short_name: string }[] =
							data.results[0].address_components;
						const city =
							components.find((c) => c.types.includes('locality') || c.types.includes('administrative_area_level_3'))
								?.long_name ?? '';
						const state =
							components.find((c) => c.types.includes('administrative_area_level_1'))?.short_name ?? '';
						setTypedLocation(city && state ? `${city}, ${state}` : 'Current Location');
					} else {
						setTypedLocation('Current Location');
					}
				} catch {
					setTypedLocation('Current Location');
				}
			},
			() => alert('Unable to get your location. Please enter it manually.'),
		);
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!typedLocation.trim()) {
			alert('Please enter a location');
			return;
		}
		try {
			if (isUsingCurrentLocation && coords?.lat && coords?.lng) {
				navigate(`/results?lat=${coords.lat}&lng=${coords.lng}&city=${typedLocation}`);
			} else {
				const coordinates = await geocodedLocation(typedLocation);
				if (coordinates) {
					navigate(`/results?lat=${coordinates.lat}&lng=${coordinates.lng}&city=${typedLocation}`);
				}
			}
		} catch (error) {
			console.error('Failed to get location:', error);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTypedLocation(e.target.value);
		if (isUsingCurrentLocation) setIsUsingCurrentLocation(false);
	};

	return (
		<div className="px-4 pb-4">
			<form onSubmit={handleFormSubmit}>
				<div
					className="bg-white dark:bg-[#2a2a2a]"
					style={{ border: '1px solid #E0E0E0', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 8 }}
				>
					<div
						className="flex items-center overflow-hidden border border-gray-200 bg-white dark:bg-[#2a2a2a] dark:border-[#4a4a4a]"
						style={{ borderRadius: 8 }}
					>
						<button
							type="button"
							onClick={getUserLocation}
							className="h-[46px] px-4 flex items-center gap-1.5 shrink-0 cursor-pointer border-r border-gray-300 dark:border-[#4a4a4a]"
							style={{ color: '#E8721A', fontSize: 13 }}
						>
							<Navigation className="w-4 h-4" />
							<span className="hidden sm:inline">Use Location</span>
						</button>
						<input
							type="text"
							className="flex-1 bg-transparent h-[46px] pl-4 pr-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none text-sm"
							placeholder="Enter City / Town"
							value={typedLocation}
							onChange={handleInputChange}
						/>
						<button
							type="submit"
							className="h-[46px] px-4 sm:px-5 text-white font-medium flex items-center gap-2 shrink-0 cursor-pointer"
							style={{ backgroundColor: '#E8721A', borderRadius: 0 }}
						>
							<Search size={16} />
							<span className="hidden sm:inline">Find Repairs</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SearchForm;
