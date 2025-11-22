import { useEffect, useRef } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import RepairSearchForm from './RepairSearchForm';
import RepairFilters from './RepairFilters';
import SearchForm from './SearchForm';
import { useSwipeable } from 'react-swipeable';
import ShopDetailsPage from '../../pages/ShopDetailsPage';
import ShopList from './ShopList';

export default function BottomSheetModal({
	filteredShops,
	setSelectedShop,
	selectedShop,
	showShopDetails,
	setShowShopDetails,
	isModalOpen,
	setIsModalOpen,
	searchCapability,
	setFilterTag,
	currentCity, // Add this prop - pass from URL params
	onCityChange,
}) {
	const modalContentRef = useRef(null);
	useEffect(() => {
		console.log('searchCapability:', searchCapability);
	}, [searchCapability]);

	//   useEffect(() => {
	//     let filtered = shops.filter((shop) =>
	//       shop.formatted_address?.toLowerCase().includes(searchCity.toLowerCase())
	//     );
	//     setFilteredShops(filtered);
	//   }, [shops, searchCity, setFilteredShops]);

	// Scroll to top when showing shop details
	useEffect(() => {
		if (showShopDetails && modalContentRef.current) {
			modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}, [showShopDetails, selectedShop]);

	// Open and Close Modal behavior
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
		setSelectedShop(shop);
		setShowShopDetails(true);
	};

	// Go back to shop list from details
	const handleBackToList = () => {
		setShowShopDetails(false);
		setSelectedShop(null);
	};

	// Make bottom sheet modal swipeable
	const handlers = useSwipeable({
		onSwipedUp: () => {
			setIsModalOpen(true);
		},
		onSwipedDown: () => {
			setIsModalOpen(false);
		},
	});

	return (
		<>
			{/* Bottom Sheet Modal */}
			<div
				className={`
    fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-xl rounded-t-2xl border border-gray-300
    transition-transform duration-300 z-50 flex flex-col
    ${isModalOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}
  `}
				style={{ maxHeight: '60vh' }}
			>
				{/* Handle/Tab Area - Always visible */}
				<div
					{...handlers}
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
									<h2 className="text-lg font-semibold dark:text-gray-100">
										{selectedShop.name}
									</h2>
								</>
							) : (
								<>
									<h2 className="text-lg font-semibold dark:text-gray-100">
										Repair Shops
									</h2>
									<span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
										{filteredShops.length} Results
									</span>
								</>
							)}
						</div>

						<div className="text-gray-400 dark:text-gray-100">
							{isModalOpen ? '▼' : '▲'}
						</div>
					</div>
				</div>

				{/* Modal Content - Only visible when expanded */}
				<div
					ref={modalContentRef}
					className={`
						overflow-y-auto transition-opacity duration-200
						${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
					`}
					style={{ maxHeight: 'calc(90vh - 80px)' }}
				>
					{showShopDetails && selectedShop ? (
						<ShopDetailsPage selectedShop={selectedShop} />
					) : (
						<div>
							<SearchForm />
							<div className="px-2">
								<RepairFilters setFilterTag={setFilterTag} />
							</div>
							<ShopList
								shops={filteredShops.sort((a, b) => a.distance - b.distance)}
								handleShopSelect={handleShopSelect}
							/>
							<div className="p-4">
								<button
									onClick={() => {
										console.log(
											'Button clicked, searchCapability:',
											searchCapability
										);
										searchCapability?.loadMore();
									}}
									disabled={!searchCapability?.canLoadMore}
									className="bg-orange-500 flex items-center justify-center gap-4 mx-auto my-4 py-3 w-2/3 text-white rounded-3xl cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
								>
									{searchCapability?.canLoadMore
										? `Show More Results`
										: 'No More Results'}
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
