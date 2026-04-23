import { useState } from 'react';
import { FilterTag } from '../../types';

export default function RepairFilters({
	setFilterTag,
	sortBy,
	setSortBy,
}: {
	setFilterTag: (tag: FilterTag) => void;
	sortBy: 'distance' | 'rating';
	setSortBy: (sort: 'distance' | 'rating') => void;
}) {
	const [shopCategories, setShopCategories] = useState<
		{
			category: string;
			value: FilterTag;
			isActive: boolean;
		}[]
	>([
		{ category: 'All Services', value: '', isActive: true },
		{ category: 'Open Now', value: 'open_now', isActive: false },
		{ category: 'Brakes', value: 'brakes', isActive: false },
		{ category: 'Engine', value: 'engine', isActive: false },
		{ category: 'DEF System', value: 'def', isActive: false },
		{ category: 'Tires', value: 'tires', isActive: false },
		{ category: 'Diesel', value: 'diesel', isActive: false },
		{ category: 'Electrical', value: 'electrical', isActive: false },
		{ category: 'Roadside', value: 'roadside', isActive: false },
	]);
	function handleFilterTagClick(tag: FilterTag) {
		setFilterTag(tag);
	}

	return (
		<>
			{/* Sort buttons */}
			<div className="flex items-center gap-2 px-2 pb-2 mb-4">
				<span className="text-xs text-gray-500 dark:text-vs-muted font-medium">Sort:</span>
				{(['distance', 'rating'] as const).map((option) => (
					<button
						key={option}
						onClick={() => setSortBy(option)}
						className={`text-xs px-3 py-1 rounded-full border cursor-pointer ${
							sortBy === option
								? 'bg-orange-500 text-white border-orange-500'
								: 'bg-white dark:bg-vs-input border-gray-300 dark:border-vs-border hover:bg-orange-100 dark:text-vs-text'
						}`}
					>
						{option === 'distance' ? 'Nearest' : 'Top Rated'}
					</button>
				))}
			</div>
			{/* Repair shop categories */}
			<div className="flex overflow-x-scroll w-full gap-4 px-2 pb-4 mt-4 mb-8 z-10 ">
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
										: { ...c, isActive: false },
								),
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
