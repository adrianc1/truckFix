import { useState } from 'react';

export default function RepairFilters({ setFilterTag }) {
	const [shopCategories, setShopCategories] = useState([
		{ category: 'All Services', value: '', isActive: true },
		{ category: 'Brakes', value: 'brakes', isActive: false },
		{ category: 'Engine', value: 'engine', isActive: false },
		{ category: 'DEF System', value: 'def', isActive: false },
		{ category: 'Tires', value: 'tires', isActive: false },
		{ category: 'Diesel', value: 'diesel', isActive: false },
		{ category: 'Electrical', value: 'electrical', isActive: false },
		{ category: 'Roadside', value: 'roadside', isActive: false },
	]);
	function handleFilterTagClick(tag) {
		setFilterTag(tag);
	}

	return (
		<>
			{/* Repair shop categories  */}
			<div className="flex overflow-x-scroll w-full gap-4 px-2 pb-4 mb-8 ">
				{shopCategories.map((cat, index) => (
					<button
						key={index}
						className={`border  border-gray-300 rounded-4xl px-4 py-2 min-w-max cursor-pointer  ${
							cat.isActive
								? 'bg-orange-500 text-white'
								: 'bg-white hover:bg-orange-100'
						}`}
						onClick={(e) => {
							e.preventDefault();
							handleFilterTagClick(cat.value);
							setShopCategories((prev) =>
								prev.map((c) =>
									c.value == cat.value
										? { ...c, isActive: true }
										: { ...c, isActive: false }
								)
							);
						}}
					>
						{cat.category}
					</button>
				))}
			</div>
		</>
	);
}
