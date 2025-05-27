import { useState } from 'react';
import {
	MapPin,
	Phone,
	Clock,
	Wrench,
	Plus,
	X,
	AlertCircle,
} from 'lucide-react';

export default function ReportMissingShop() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [userLocation, setUserLocation] = useState(null);

	const [formData, setFormData] = useState({
		shopName: '',
		address: '',
		phone: '',
		hours: '',
		services: [],
		notes: '',
		lat: null,
		lng: null,
	});

	const serviceOptions = [
		'Engine Repair',
		'Brake Service',
		'Tire Service',
		'Transmission',
		'Electrical',
		'A/C Repair',
		'DOT Inspections',
		'Trailer Repair',
		'Mobile Service',
		'Emergency/24hr',
	];

	const getCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setFormData((prev) => ({
						...prev,
						lat: latitude,
						lng: longitude,
					}));
					setUserLocation({ lat: latitude, lng: longitude });
				},
				(error) => {
					console.error('Location error:', error);
				}
			);
		}
	};

	const handleServiceToggle = (service) => {
		setFormData((prev) => ({
			...prev,
			services: prev.services.includes(service)
				? prev.services.filter((s) => s !== service)
				: [...prev.services, service],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Simulate API call
			const response = await fetch('/api/shops/report', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					reportedAt: new Date().toISOString(),
					status: 'pending_verification',
					reportedByLocation: userLocation,
				}),
			});

			if (response.ok) {
				setShowSuccess(true);
				setTimeout(() => {
					setIsModalOpen(false);
					setShowSuccess(false);
					setFormData({
						shopName: '',
						address: '',
						phone: '',
						hours: '',
						services: [],
						notes: '',
						lat: null,
						lng: null,
					});
				}, 2000);
			}
		} catch (error) {
			console.error('Error submitting shop:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			{/* Main app interface */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<h1 className="text-2xl font-bold mb-4">Find Truck Repair Shops</h1>

				{/* Search results would go here */}
				<div className="space-y-4 mb-6">
					<div className="border rounded-lg p-4">
						<h3 className="font-semibold">Big Rig Repair Center</h3>
						<p className="text-gray-600">123 Highway Blvd • 2.3 miles</p>
						<p className="text-sm text-gray-500">Engine, Brakes, Tires</p>
					</div>
					<div className="border rounded-lg p-4">
						<h3 className="font-semibold">Diesel Doctor</h3>
						<p className="text-gray-600">456 Truck Route • 4.1 miles</p>
						<p className="text-sm text-gray-500">24/7 Emergency Service</p>
					</div>
				</div>

				{/* Report Missing Shop Button */}
				<div className="text-center">
					<button
						onClick={() => {
							setIsModalOpen(true);
							getCurrentLocation();
						}}
						className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
					>
						<Plus className="w-5 h-5" />
						Report Missing Shop
					</button>
					<p className="text-sm text-gray-500 mt-2">
						Know a shop that should be listed? Help other truckers find it!
					</p>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-2xl font-bold">Report Missing Shop</h2>
								<button
									onClick={() => setIsModalOpen(false)}
									className="text-gray-500 hover:text-gray-700"
								>
									<X className="w-6 h-6" />
								</button>
							</div>

							{showSuccess ? (
								<div className="text-center py-8">
									<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
										<svg
											className="w-8 h-8 text-green-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5 13l4 4L19 7"
											></path>
										</svg>
									</div>
									<h3 className="text-xl font-semibold text-green-800 mb-2">
										Thanks for your report!
									</h3>
									<p className="text-gray-600">
										We'll verify this shop and add it to our listings within
										24-48 hours.
									</p>
								</div>
							) : (
								<div className="space-y-6">
									{/* Shop Name */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Shop Name *
										</label>
										<input
											type="text"
											required
											value={formData.shopName}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													shopName: e.target.value,
												}))
											}
											className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="e.g., Joe's Truck Repair"
										/>
									</div>

									{/* Address */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											<MapPin className="w-4 h-4 inline mr-1" />
											Address *
										</label>
										<input
											type="text"
											required
											value={formData.address}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													address: e.target.value,
												}))
											}
											className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="123 Highway Blvd, City, State 12345"
										/>
									</div>

									{/* Phone */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											<Phone className="w-4 h-4 inline mr-1" />
											Phone Number
										</label>
										<input
											type="tel"
											value={formData.phone}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													phone: e.target.value,
												}))
											}
											className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="(555) 123-4567"
										/>
									</div>

									{/* Hours */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											<Clock className="w-4 h-4 inline mr-1" />
											Hours
										</label>
										<input
											type="text"
											value={formData.hours}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													hours: e.target.value,
												}))
											}
											className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="e.g., Mon-Fri 8AM-6PM, 24/7, Emergency only"
										/>
									</div>

									{/* Services */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-3">
											<Wrench className="w-4 h-4 inline mr-1" />
											Services Offered
										</label>
										<div className="grid grid-cols-2 gap-2">
											{serviceOptions.map((service) => (
												<label
													key={service}
													className="flex items-center space-x-2 cursor-pointer"
												>
													<input
														type="checkbox"
														checked={formData.services.includes(service)}
														onChange={() => handleServiceToggle(service)}
														className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
													/>
													<span className="text-sm">{service}</span>
												</label>
											))}
										</div>
									</div>

									{/* Notes */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Additional Notes
										</label>
										<textarea
											value={formData.notes}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													notes: e.target.value,
												}))
											}
											className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											rows="3"
											placeholder="Any other details that would help truckers (parking info, specialties, etc.)"
										/>
									</div>

									{/* Location Status */}
									{userLocation && (
										<div className="bg-green-50 border border-green-200 rounded-lg p-3">
											<div className="flex items-center gap-2 text-green-700 text-sm">
												<MapPin className="w-4 h-4" />
												Your location captured to help verify this shop
											</div>
										</div>
									)}

									{/* Disclaimer */}
									<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
										<div className="flex items-start gap-2">
											<AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
											<div className="text-sm text-yellow-800">
												<p className="font-medium mb-1">Verification Process</p>
												<p>
													We'll verify this information before adding it to our
													listings. This helps ensure accurate information for
													all truckers.
												</p>
											</div>
										</div>
									</div>

									{/* Submit Button */}
									<div className="flex gap-3 pt-4">
										<button
											type="button"
											onClick={() => setIsModalOpen(false)}
											className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
										>
											Cancel
										</button>
										<button
											type="button"
											onClick={handleSubmit}
											disabled={
												isSubmitting || !formData.shopName || !formData.address
											}
											className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
										>
											{isSubmitting ? (
												<>
													<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
													Submitting...
												</>
											) : (
												'Submit Report'
											)}
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
