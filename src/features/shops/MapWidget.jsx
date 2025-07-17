import mockMap from '../../assets/images/mockmap.png';
export default function MapWidget() {
	return (
		<div className="flex relative flex-col mx-auto items-center w-full  ">
			<div
				className={`map-container border border-gray-400 w-full h-full bg-gray-200 overflow-hidden`}
			>
				<img
					src={mockMap}
					alt="Map showing nearby repair shops"
					className="w-full h-full object-cover overflow-hidden"
				/>
			</div>
		</div>
	);
}
