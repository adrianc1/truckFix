import { useEffect, useState } from 'react';
import MapWidget from '../features/shops/MapWidget';
import RepairSearchForm from '../features/shops/RepairSearchForm';
import ShopList from '../features/shops/ShopList';
import ShopDetailsPage from './ShopDetailsPage';
import useShops from '../features/shops/useShops';

export default function Home() {
	const shops = useShops();
	const [filterTag, setFilterTag] = useState('');
	const [filteredShops, setFilteredShops] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedShop, setSelectedShop] = useState(null);
	const [showShopDetails, setShowShopDetails] = useState(false);
	const [searchCity, setSearchCity] = useState('');
	const [searchService, setSearchService] = useState('');

	useEffect(() => {
		console.log(searchService);
		let filtered = shops.filter((shop) =>
			shop.services.some(
				(service) =>
					service.toLowerCase().includes(filterTag.toLowerCase()) &&
					service.toLowerCase().includes(searchService.toLowerCase())
			)
		);
		setFilteredShops(filtered);
	}, [shops, filterTag, searchService]);

	useEffect(() => {
		let filtered = shops.filter((shop) =>
			shop.vicinity.toLowerCase().includes(searchCity.toLowerCase())
		);
		setFilteredShops(filtered);
	}, [shops, searchCity]);

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

	// Remove these unused functions
	// const handleModalContentClick = (e) => {
	// 	e.stopPropagation();
	// };

	// const handleBackdropClick = (e) => {
	// 	if (e.target === e.currentTarget) {
	// 		closeModal();
	// 	}
	// };

	function handleFilterTagClick(tag) {
		setFilterTag(tag);
	}

	return (
		<div className="mt-24">
			<RepairSearchForm
				handleFilterTagClick={handleFilterTagClick}
				searchCity={searchCity}
				setSearchCity={setSearchCity}
				searchService={searchService}
				setSearchService={setSearchService}
			/>
			<MapWidget />

			{/* Bottom Sheet Modal */}
			<div
				className={`
					fixed bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-2xl border border-gray-300 
					transition-transform duration-300 z-50
					${isModalOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}
				`}
				style={{ maxHeight: '90vh' }}
			>
				{/* Handle/Tab Area - Always visible */}
				<div
					className="p-4 cursor-pointer select-none"
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
		</div>
	);
}
