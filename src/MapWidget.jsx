export default function MapWidget() {
	return (
		<div className="flex flex-col mx-auto items-center mt-4 w-full px-2 ">
			<div className="map-container border border-gray-400 rounded-t-xl w-full h-96 bg-gray-200">
				<span className="flex size-full justify-center items-center my-auto">
					Loading Map...
				</span>
			</div>
			<div className="location-container border border-gray-400 rounded-b-xl w-full h-24 flex justify-around items-center ">
				<div className="location-details">
					<h5 className="font-bold">Location</h5>
					<span className="text-gray-500">Dallas, TX (25 mile radius)</span>
				</div>
				<div className="btn-container">
					<button className="border rounded-xl px-4 py-2 min-w-max">
						Change Radius
					</button>
				</div>
			</div>
		</div>
	);
}
