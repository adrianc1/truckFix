const Categories = () => {
	const shopCategories = [
		'All Services',
		'Engine Repair',
		'Tire Service',
		'Brake Service',
		'Electrical',
	];
	return (
		<div className="flex overflow-x-scroll w-full gap-2 px-2">
			{shopCategories.map((cat) => (
				<button className="border border-gray-300 rounded-4xl px-4 py-2 min-w-max">
					{cat}
				</button>
			))}
		</div>
	);
};
export default Categories;
