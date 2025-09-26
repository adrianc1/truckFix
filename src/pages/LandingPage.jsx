import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Navigation } from 'lucide-react';
import Footer from '../components/layout/Footer';
import MapImg from '../assets/images/map.png';
import SectionTag from '../components/SectionTag';
import Features from '../features/shops/Features';
import HowToFindShops from '../features/shops/HowToFindShops';

const LandingPage = () => {
	// States
	const [coords, setCoords] = useState({ lat: '', lng: '' });
	const [typedLocation, setTypedLocation] = useState('');

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
				return coordinates; // Return the coordinates
			} else {
				console.error('No results found for address:', address);
				return null;
			}
		} catch (error) {
			console.error('Geocoding failed:', error);
			return null;
		}
	}

	function getUserLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setCoords({ lat: latitude, lng: longitude });
				},
				(error) => console.log(error)
			);
		} else {
			alert('please enable location services');
		}
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (!typedLocation.trim()) return;

		try {
			// Get coordinates and wait for them
			const coordinates = await geocodedLocation(typedLocation);

			if (coordinates) {
				// Navigate with the fresh coordinates
				navigate(
					`/results?lat=${coordinates.lat}&lng=${coordinates.lng}&city=${typedLocation}`
				);
			}
		} catch (error) {
			console.error('Failed to get location:', error);
		}
	};

	return (
		<div className="mt-24">
			<section className="w-[95%] mx-auto mt-8">
				<div className="hero-text-container md:text-center">
					<div className="md:flex md:flex-col md:items-center">
						<h2 className="text-black font-bold text-3xl md:text-5xl md:inline">
							Find Truck Repairs
						</h2>
						<h2 className="text-orange-500 font-bold text-3xl md:text-5xl md:inline md:ml-2 md:mt-4">
							Anytime, Anywhere
						</h2>
					</div>
					<p className="my-4 text-gray-500 md:w-1/2 md:mx-auto">
						RepairFind connects truckers with nearby repair shops in seconds.
						Get back on the road faster with our nationwide network of trusted
						mechanics.
					</p>
				</div>
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
							onChange={(e) => {
								setTypedLocation(e.target.value);
							}}
						/>
						<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
					</div>
					<span className="self-end gap-1 flex justify-center items-center">
						<Navigation className="w-4" />

						<div onClick={getUserLocation} className="pointer">
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
