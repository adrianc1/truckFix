import { Wrench, Navigation, MapPin } from 'lucide-react';

export default function RepairSearchForm() {
	const shopCategories = [
		'All Services',
		'Engine Repair',
		'Tire Service',
		'Brake Service',
		'Electrical',
	];
	return (
		<form className="w-full flex flex-col justify-center px-2 gap-4">
			<div className="flex flex-col">
				{/* Location Search Bar */}
				<div className="relative mt-4">
					<input
						type="text"
						className="border w-full rounded-xl py-2 pl-10 pr-4"
						placeholder="Enter City / Town"
					/>
					<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
				</div>
				{/* Get current location  */}
				<span className="self-end gap-1 flex justify-center items-center">
					<Navigation className="w-4" />
					<a href="">Use Current Location</a>
				</span>
			</div>

			{/* Type of repair shop search bar */}
			<div className="relative">
				<input
					type="text"
					className="border w-full rounded-xl py-2 pl-10 pr-4"
					placeholder="Engine, Brakes, Repair..."
				/>
				<Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
			</div>

			{/* Repair shop categories  */}
			<div className="flex overflow-x-scroll w-full gap-2 px-2 pb-4">
				{shopCategories.map((cat, index) => (
					<button
						key={index}
						className="border border-gray-300 rounded-4xl px-4 py-2 min-w-max"
					>
						{cat}
					</button>
				))}
			</div>
			<button className="border mb-4 bg-black text-white font-bold rounded-2xl py-2 w-1/2 mx-auto">
				Search
			</button>
		</form>
	);
}
