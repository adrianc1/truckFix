import { MapPin, Search } from 'lucide-react';
import SectionTag from '../components/SectionTag';
import Features from '../features/shops/Features';
const LandingPage = () => {
	return (
		<div className="">
			<section className="w-[95%] mx-auto mt-8">
				<div className="hero-text-container">
					<h2 className="text-black font-bold text-3xl">Find Truck Repairs</h2>
					<h2 className="text-orange-400 font-bold text-3xl">
						Anytime, Anywhere
					</h2>
					<p>
						F.A.S.T. connects truckers with nearby repair shops in seconds. Get
						back on the road faster with our nationwide network of trusted
						mechanics.
					</p>
				</div>
				<form className="flex w-full flex-col gap-4 mx-auto">
					<div className="relative mt-4 w-full ">
						<input
							type="text"
							className="border w-full rounded-3xl py-2 pl-10 pr-4"
							placeholder="Enter City / Town"
						/>
						<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
					</div>
					<button className="bg-orange-400 flex items-center justify-center gap-4 py-3 w-full text-white rounded-3xl">
						<Search size={18} />
						Find Repairs
					</button>
				</form>
			</section>

			{/* Map on landing page */}
			<section className="w-[95%] h-96 border-gray-300  mx-auto mt-8">
				<div className="size-full rounded-2xl bg-gray-200"></div>
			</section>

			{/* Features section */}
			<section className="w-[95%] mx-auto mt-8 flex flex-col justify-center items-center">
				<SectionTag tagName="Features" />
				<Features />
			</section>
		</div>
	);
};

export default LandingPage;
