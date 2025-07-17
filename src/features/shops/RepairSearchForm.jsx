import { Wrench, Navigation, MapPin } from 'lucide-react';
import RepairFilters from './RepairFilters';

export default function RepairSearchForm({
	searchCity,
	setSearchCity,
	setFilterTag,
}) {
	return (
		<form className="absolute z-100 w-full flex flex-col justify-center px-2 gap-4">
			<div className="flex flex-col">
				{/* Location Search Bar */}
				<div className="relative mt-4">
					<input
						type="text"
						className="border bg-white w-full rounded-xl py-2 pl-10 pr-4"
						placeholder="Enter City / Town"
						value={searchCity}
						onChange={(e) => {
							setSearchCity(e.target.value);
						}}
					/>
					<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
				</div>
				{/* Get current location  */}
				<span className="self-end flex mr-2 h-8 w-8 items-center justify-center rounded-full bg-white text-orange-500 ">
					<Navigation className="w-4" />
					{/* <a href="">Use Current Location</a> */}
				</span>
			</div>

			<RepairFilters setFilterTag={setFilterTag} />
		</form>
	);
}
