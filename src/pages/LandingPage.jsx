import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Navigation } from 'lucide-react';
import Footer from '../components/layout/Footer';
import MapImg from '../assets/images/map.png';
import SectionTag from '../components/SectionTag';
import Features from '../features/shops/Features';
import HowToFindShops from '../features/shops/HowToFindShops';

const LandingPage = () => {
	const [coords, setCoords] = useState({ lat: '', lng: '' });
	const [manualLocation, setManualLocation] = useState('');

	let navigate = useNavigate();

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
						TruckFix connects truckers with nearby repair shops in seconds. Get
						back on the road faster with our nationwide network of trusted
						mechanics.
					</p>
				</div>
				<form
					className="flex w-full flex-col gap-4 mx-auto lg:w-4/5"
					onSubmit={(e) => {
						e.preventDefault();
						navigate(`/results?lat=${coords.lat}&lng=${coords.lng}`);
					}}
				>
					<div className="relative mt-4 w-full ">
						<input
							type="text"
							className="border w-full rounded-3xl py-2 pl-10 pr-4 text-gray-500"
							placeholder="Enter City / Town"
							value="Demo Only. Please click 'Find Repairs' below to continue demo."
							readOnly
							onChange={(e) => {
								setManualLocation(e.target.value);
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
					<button className="bg-orange-500 flex items-center justify-center gap-4 py-3 w-full text-white rounded-3xl">
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
