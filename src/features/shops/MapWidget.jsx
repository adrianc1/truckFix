import mockMap from '../../assets/images/mockmap.png';
export default function MapWidget({ mapHeight = 128 }) {
	return (
		<div className="flex relative flex-col mx-auto items-center w-full  ">
			<div className="w-full absolute"></div>
			<div
				className={`map-container border border-gray-400 rounded-xl w-full h-${mapHeight} bg-gray-200 overflow-hidden`}
			>
				<img
					src={mockMap}
					alt="Map showing nearby repair shops"
					className="w-full h-full object-cover"
				/>
			</div>
		</div>
	);
}
