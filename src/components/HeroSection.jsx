export default function HeroSection() {
	return (
		<>
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
					RepairFind connects truckers with nearby repair shops in seconds. Get
					back on the road faster with our nationwide network of trusted
					mechanics.
				</p>
			</div>
		</>
	);
}
