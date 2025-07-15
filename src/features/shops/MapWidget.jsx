import mockMap from '../../assets/images/mockmap.png';
export default function MapWidget({ mapHeight = 128 }) {
	return (
		<div className="flex flex-col mx-auto items-center mt-4 w-full px-2">
			<div
				className={`map-container border border-gray-400 rounded-xl w-full h-${mapHeight} bg-gray-200 overflow-hidden`}
			>
				<img
					src={mockMap}
					alt="Map showing nearby repair shops"
					className="w-full h-full object-cover"
				/>
			</div>
			{/* <div className="location-container border border-gray-400 rounded-xl w-full h-24 flex justify-around items-center ">
				<div className="location-details">
					<h5 className="font-bold">Location</h5>
					<span className="text-gray-500">Dallas, TX (25 mile radius)</span>
				</div>
				<div className="btn-container">
					<button className="border rounded-xl px-4 py-2 min-w-max">
						Change Radius
					</button>
				</div>
			</div> */}
		</div>
	);
}
