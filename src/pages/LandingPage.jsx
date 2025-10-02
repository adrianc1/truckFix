import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Navigation } from 'lucide-react';
import Footer from '../components/layout/Footer';
import MapImg from '../assets/images/map.png';
import SectionTag from '../components/SectionTag';
import Features from '../features/shops/Features';
import HowToFindShops from '../features/shops/HowToFindShops';
import HeroSection from '../components/HeroSection';

const LandingPage = () => {
	// States
	const [coords, setCoords] = useState({ lat: '', lng: '' });
	const [typedLocation, setTypedLocation] = useState('');
	const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);

	// API Key Import
	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	let navigate = useNavigate();

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

	async function reverseGeocode(lat, lng) {
		try {
			const res = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
			);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			const data = await res.json();

			if (data.status === 'OK' && data.results.length > 0) {
				const addressComponents = data.results[0].address_components;
				const city =
					addressComponents.find(
						(component) =>
							component.types.includes('locality') ||
							component.types.includes('administrative_area_level_3')
					)?.long_name || '';

				const state =
					addressComponents.find((component) =>
						component.types.includes('administrative_area_level_1')
					)?.short_name || '';

				return {
					cityState:
						city && state
							? `${city}, ${state}`
							: data.results[0].formatted_address,
				};
			}
			return null;
		} catch (error) {
			console.error('Reverse geocoding failed:', error);
			return null;
		}
	}

	const getUserLocation = async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					const coordinates = { lat: latitude, lng: longitude };
					setCoords(coordinates);
					setIsUsingCurrentLocation(true); // Mark that we're using current location

					// Get the address name and put it in the input field
					try {
						const addressInfo = await reverseGeocode(latitude, longitude);
						const cityName = addressInfo?.cityState || 'Current Location';

						// Put the city name in the input field
						setTypedLocation(cityName);
					} catch (error) {
						console.error('Reverse geocoding failed:', error);
						// Put generic text in input field
						setTypedLocation('Current Location');
					}
				},
				(error) => {
					console.log('Geolocation error:', error);
					alert('Unable to get your location. Please enter it manually.');
				}
			);
		} else {
			alert('Please enable location services');
		}
	};

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
		<div className="mt-24">
			<section className="w-[95%] mx-auto mt-8">
				<HeroSection />
				<form
					className="flex w-full flex-col gap-4 mx-auto lg:w-4/5"
					onSubmit={handleFormSubmit}
				>
					<div className="relative mt-4 w-full ">
						<input
							type="text"
							className="border w-full rounded-3xl py-2 pl-10 pr-4 text-gray-500"
							placeholder="Enter City / Town"
							value={typedLocation}
							onChange={handleInputChange}
						/>
						<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
					</div>
					<span className="self-end gap-1 flex justify-center items-center">
						<Navigation className="w-4" />

						<div onClick={getUserLocation} className="pointer cursor-pointer">
							Use Current Location
						</div>
					</span>
					<button className="bg-orange-500 flex items-center justify-center gap-4 py-3 w-full text-white rounded-3xl cursor-pointer">
						<Search size={18} />
						Find Repairs
					</button>
				</form>
			</section>

			{/* Map on landing page */}
			<section className="w-[95%] mx-auto mt-8 lg:w-4/5">
				<div className="h-96 rounded-2xl bg-gray-200 overflow-hidden">
					<img
						src={MapImg}
						alt=""
						className="w-full h-full object-cover rounded-2xl"
					/>
				</div>
			</section>

			{/* Features section */}
			<section className="w-[95%] mx-auto mt-8 flex flex-col justify-center items-center">
				<SectionTag tagName="Features" />
				<Features />
			</section>

			{/* How It Works section */}
			<section className="w-[95%] mx-auto mt-8 flex flex-col justify-center items-center">
				<SectionTag tagName="How It Works" />
				<HowToFindShops />
			</section>
			<Footer />
		</div>
	);
};

export default LandingPage;
