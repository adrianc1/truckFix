export default function MapWidget() {
	return (
		<div className="flex flex-col mx-auto items-center mt-4 w-full px-2 ">
			<div className="map-container border rounded-t-xl w-full h-48 bg-gray-300">
				Loading Map...
			</div>
			<div className="location-container border rounded-b-xl w-full h-24 ">
				<h5 className="font-bold">Location</h5>
				<span className="text-gray-400">Dallas, TX (25 mile radius)</span>
				<button className="border ml-24 rounded-xl">Change Radius</button>
			</div>
		</div>
	);
}
