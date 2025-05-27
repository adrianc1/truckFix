export default function Cards() {
	return (
		<div className="w-full">
			<h1 className="font-bold text-center w-full my-4 text-2xl">
				Featured Shops Nearby
			</h1>
			<div className="bg-gray-100 rounded-xl shadow hover:shadow-lg transition mt-8 h-auto">
				<img
					src="../../public/shop2-card.jpg"
					alt="Project Portfolio"
					className="w-full h-56 object-cover object-top rounded-t-xl"
				/>
				<div className="p-4">
					<h3 className="text-xl font-semibold mb-2">Road King Truck Repair</h3>
					<p className="text-sm text-gray-600 mb-3">
						4232 Fonopi Street Rancho Margarita, CA 97641
					</p>
					<p>(232) 545 - 9088 </p>
					<a
						href=""
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 hover:underline text-sm font-medium"
					>
						View Shop →
					</a>
				</div>
			</div>

			<div className="bg-gray-100 rounded-xl shadow hover:shadow-lg transition mt-8 h-auto">
				<img
					src="../../public/semi-truck-card.jpg"
					alt="Project Portfolio"
					className="w-full h-56 object-cover object-top rounded-t-xl"
				/>
				<div className="p-4">
					<h3 className="text-xl font-semibold mb-2">Joe’s Diesel & Truck</h3>
					<p className="text-sm text-gray-600 mb-3">
						9732 4th Street Carrington, CA 96654
					</p>
					<p>(672) 455 - 1223 </p>
					<a
						href=""
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 hover:underline text-sm font-medium"
					>
						View Shop →
					</a>
				</div>
			</div>
		</div>
	);
}
