export default function HeroSection() {
	return (
		<div className="hero-text-container md:text-center">
			<div className="md:flex md:flex-col md:items-center">
				<h1 className="text-black dark:text-vs-heading font-bold text-3xl md:text-5xl md:inline">
					Find Semi Truck & Diesel Repair
				</h1>
				<h1 className="text-orange-500 font-bold text-3xl md:text-5xl md:inline md:ml-2 md:mt-4">
					Near You — Right Now
				</h1>
			</div>
			<p className="my-4 text-gray-500 dark:text-vs-muted md:w-1/2 md:mx-auto">
				TruckFix helps commercial drivers instantly locate nearby diesel
				mechanics, brake shops, tire repair, DEF system service, and roadside
				assistance across all 48 states — no sign-up required.
			</p>
		</div>
	);
}
