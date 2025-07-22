import { useState, useEffect } from 'react';
import ShopDetailsPage from '../../pages/ShopDetailsPage';
import ShopList from './ShopList';

export default function BottomSheetModal({
	shops,
	filteredShops,
	searchCity,
	setFilteredShops,
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedShop, setSelectedShop] = useState(null);
	const [showShopDetails, setShowShopDetails] = useState(false);

	useEffect(() => {
		let filtered = shops.filter((shop) =>
			shop.vicinity.toLowerCase().includes(searchCity.toLowerCase())
		);
		setFilteredShops(filtered);
	}, [shops, searchCity, setFilteredShops]);

	const closeModal = () => {
		setIsModalOpen(false);
		setShowShopDetails(false);
		setTimeout(() => {
			setSelectedShop(null);
		}, 300);
	};

	const openModal = () => {
		setIsModalOpen(true);
		setShowShopDetails(false);
	};

	// Handle shop selection - transition from list to details
	const handleShopSelect = (shop) => {
		console.log(shop);
		setSelectedShop(shop);
		setShowShopDetails(true);
	};

	// Go back to shop list from details
	const handleBackToList = () => {
		setShowShopDetails(false);
		setSelectedShop(null);
	};

	return (
		<>
			{/* Bottom Sheet Modal */}
			<div
				className={`
    fixed bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-2xl border border-gray-300
    transition-transform duration-300 z-50 flex flex-col
    ${isModalOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}
  `}
				style={{ maxHeight: '60vh' }} // outer container half screen height
			>
				{/* Handle/Tab Area - Always visible */}
				<div
					className="p-4 cursor-pointer select-none flex-shrink-0"
					onClick={isModalOpen ? closeModal : openModal}
				>
					{/* Handle bar */}
					<div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3"></div>

					{/* Preview content when collapsed */}
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-2">
							{showShopDetails && selectedShop ? (
								<>
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleBackToList();
										}}
										className="text-blue-500 hover:text-blue-700 mr-2"
									>
										← Back
									</button>
									<h2 className="text-lg font-semibold">{selectedShop.name}</h2>
								</>
							) : (
								<>
									<h2 className="text-lg font-semibold">Repair Shops</h2>
									<span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
										{filteredShops.length} found
									</span>
								</>
							)}
						</div>

						<div className="text-gray-400">{isModalOpen ? '▼' : '▲'}</div>
					</div>
				</div>

				{/* Modal Content - Only visible when expanded */}
				<div
					className={`
						overflow-y-auto transition-opacity duration-200
						${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
					`}
					style={{ maxHeight: 'calc(90vh - 80px)' }}
				>
					{showShopDetails && selectedShop ? (
						<ShopDetailsPage selectedShop={selectedShop} />
					) : (
						<ShopList
							shops={filteredShops}
							handleShopSelect={handleShopSelect}
						/>
					)}
				</div>
			</div>
		</>
	);
}
