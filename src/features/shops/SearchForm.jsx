import { ArrowRight, MapPin } from 'lucide-react';
const SearchForm = () => {
	return (
		<div className="flex items-center justify-center px-4 pb-4">
			<form
				className="w-full flex flex-col gap-4"
				// onSubmit={handleFormSubmit}
			>
				<div className="relative">
					<input
						type="text"
						className="border w-full rounded-3xl py-2 pl-10 pr-12 text-gray-500 bg-white"
						placeholder="Enter City / Town"
						// value={typedLocation}
						// onChange={handleInputChange}
					/>
					<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
					<button
						type="submit"
						className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center"
					>
						<ArrowRight className="w-4 h-4 text-white" />
					</button>
				</div>
			</form>
		</div>
	);
};

export default SearchForm;
