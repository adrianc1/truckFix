import { useNavigate } from 'react-router';
import { MapPin, Search, Navigation } from 'lucide-react';
import Footer from '../components/layout/Footer';
import MapImg from '../assets/images/map.png';
import SectionTag from '../components/SectionTag';
import Features from '../features/shops/Features';
import HowToFindShops from '../features/shops/HowToFindShops';
const LandingPage = () => {
	let navigate = useNavigate();
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position.coords.latitude, position.coords.longitude);
		});
	} else {
		/* geolocation IS NOT available */
	}
	return (
		<div className="mt-24">
			<section className="w-[95%] mx-auto mt-8">
				<div className="hero-text-container">
					<h2 className="text-black font-bold text-3xl">Find Truck Repairs</h2>
					<h2 className="text-orange-500 font-bold text-3xl">
						Anytime, Anywhere
					</h2>
					<p className="my-4 text-gray-500">
						TruckFix connects truckers with nearby repair shops in seconds. Get
						back on the road faster with our nationwide network of trusted
						mechanics.
					</p>
				</div>
				<form
					className="flex w-full flex-col gap-4 mx-auto"
					onSubmit={() => {
						navigate('/results');
					}}
				>
					<div className="relative mt-4 w-full ">
						<input
							type="text"
							className="border w-full rounded-3xl py-2 pl-10 pr-4"
							placeholder="Enter City / Town"
							value="Dallas, TX"
						/>
						<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
					</div>
					<span className="self-end gap-1 flex justify-center items-center">
						<Navigation className="w-4" />
						<a href="">Use Current Location</a>
					</span>
					<button className="bg-orange-500 flex items-center justify-center gap-4 py-3 w-full text-white rounded-3xl">
						<Search size={18} />
						Find Repairs
					</button>
				</form>
			</section>

			{/* Map on landing page */}
			<section className="w-[95%] mx-auto mt-8">
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
