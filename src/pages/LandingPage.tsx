import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Navigation } from 'lucide-react';
import Footer from '../components/layout/Footer.tsx';
import MapImg from '../assets/images/map.png';
import SectionTag from '../components/SectionTag.tsx';
import Features from '../features/shops/Features.tsx';
import HowToFindShops from '../features/shops/HowToFindShops.tsx';
import HeroSection from '../components/HeroSection.tsx';

const LandingPage = () => {
	const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
		null,
	);
	const [typedLocation, setTypedLocation] = useState<string>('');
	const [isUsingCurrentLocation, setIsUsingCurrentLocation] =
		useState<boolean>(false);

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	let navigate = useNavigate();

	async function geocodedLocation(address: string) {
		try {
			const encodedAddress = encodeURIComponent(address);

			let res = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
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

	async function reverseGeocode(lat: number, lng: number) {
		try {
			const res = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`,
			);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			const data = await res.json();

			if (data.status === 'OK' && data.results.length > 0) {
				const addressComponents: {
					types: string[];
					long_name: string;
					short_name: string;
				}[] = data.results[0].address_components;
				const city =
					addressComponents.find(
						(component) =>
							component.types.includes('locality') ||
							component.types.includes('administrative_area_level_3'),
					)?.long_name || '';

				const state =
					addressComponents.find((component) =>
						component.types.includes('administrative_area_level_1'),
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
					setIsUsingCurrentLocation(true);

					try {
						const addressInfo = await reverseGeocode(latitude, longitude);
						const cityName = addressInfo?.cityState || 'Current Location';
						setCoords(coordinates);
						setTypedLocation(cityName);
					} catch (error) {
						console.error('Reverse geocoding failed:', error);
						setTypedLocation('Current Location');
					}
				},
				(error) => {
					console.log('Geolocation error:', error);
					alert('Unable to get your location. Please enter it manually.');
				},
			);
		} else {
			alert('Please enable location services');
		}
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!typedLocation.trim()) {
			alert('Please enter a location');
			return;
		}

		try {
			if (isUsingCurrentLocation && coords?.lat && coords?.lng) {
				navigate(
					`/results?lat=${coords.lat}&lng=${coords.lng}&city=${typedLocation}&radius=25`,
				);
			} else {
				const coordinates = await geocodedLocation(typedLocation);
				if (coordinates) {
					navigate(
						`/results?lat=${coordinates.lat}&lng=${coordinates.lng}&city=${typedLocation}&radius=25`,
					);
				}
			}
		} catch (error) {
			console.error('Failed to get location:', error);
		}
	};

	// Reset the flag when user starts typing manually
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTypedLocation(e.target.value);
		if (isUsingCurrentLocation) {
			setIsUsingCurrentLocation(false);
		}
	};

	return (
		<div className="pt-24 dark:bg-vs-bg">
			<section className="w-[95%] mx-auto mt-8">
				<HeroSection />

				{/* Location form for submission */}
				<form
					className="flex w-full flex-col gap-4 mx-auto lg:w-4/5"
					onSubmit={handleFormSubmit}
				>
					<div className="relative mt-4 w-full ">
						<input
							type="text"
							className="border w-full rounded-xl py-2 pl-10 pr-4 text-gray-500 dark:text-vs-text dark:bg-vs-input dark:border-vs-border dark:placeholder-vs-muted"
							placeholder="Enter City / Town"
							value={typedLocation}
							onChange={handleInputChange}
						/>
						<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
					</div>
					<span className="self-end dark:text-white gap-1 flex justify-center items-center">
						<Navigation className="w-4" />

						<div onClick={getUserLocation} className="pointer cursor-pointer ">
							Use Current Location
						</div>
					</span>
					<button className="bg-orange-500 flex items-center justify-center gap-4 py-3 w-full text-white rounded-xl cursor-pointer">
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
