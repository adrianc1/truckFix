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
				<input
					type="text"
					className="border w-full rounded-xl py-2 px-4 mt-4"
					placeholder="Enter City / Town"
				/>
				<span className="self-end">
					<a href="">Use Current Location</a>
				</span>
			</div>
			<input
				type="text"
				className="border w-full rounded-xl py-2 px-4 mb-2"
				placeholder="What Service are you looking for?"
			/>
			<div className="flex overflow-x-scroll w-full gap-2 px-2 pb-4">
				{shopCategories.map((cat) => (
					<button className="border border-gray-300 rounded-4xl px-4 py-2 min-w-max">
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
