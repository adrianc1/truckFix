import { FilterTag } from '../../types';
import RepairFilters from './RepairFilters.tsx';

export default function RepairSearchForm({
	setFilterTag,
}: {
	setFilterTag: (tag: FilterTag) => void;
}) {
	return (
		<div className="absolute mt-16 z-100 w-full flex flex-col justify-center px-2 gap-4">
			<RepairFilters setFilterTag={setFilterTag} />
		</div>
	);
}
