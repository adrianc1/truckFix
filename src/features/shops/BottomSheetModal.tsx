import { useEffect, useRef, useState } from 'react';
import SearchForm from './SearchForm.tsx';
import RepairFilters from './RepairFilters.tsx';
import { useSwipeable } from 'react-swipeable';
import ShopDetailsPage from '../../pages/ShopDetailsPage.tsx';
import ShopList from './ShopList.tsx';
import { Shop, FilterTag } from '../../types';

export default function Modal({
	filteredShops,
	setSelectedShop,
	selectedShop,
	showShopDetails,
	setShowShopDetails,
	isModalOpen,
	setIsModalOpen,

	searchCity,
	shops,
	setFilteredShops,
	setFilterTag,
	sortBy,
	setSortBy,
	loading,
}: {
	filteredShops: Shop[];
	setSelectedShop: (shop: Shop | null) => void;
	selectedShop: Shop | null;
	showShopDetails: boolean;
	setShowShopDetails: (show: boolean) => void;
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
	searchCity: string;
	shops: Shop[];
	setFilteredShops: (shops: Shop[]) => void;
	setFilterTag: (tag: FilterTag) => void;
	sortBy: 'distance' | 'rating';
	setSortBy: (sort: 'distance' | 'rating') => void;
	loading: boolean;
}) {
	const modalContentRef = useRef<HTMLDivElement>(null);
	const [isBreakdownOpen, setIsBreakdownOpen] = useState<boolean>(false);
	const [breakdownInput, setBreakdownInput] = useState<string>('');
	const [isBreakdownLoading, setIsBreakdownLoading] = useState<boolean>(false);
	const [breakdownActive, setBreakdownActive] = useState<boolean>(false);

	useEffect(() => {
		let filtered = shops.filter((shop) =>
			shop.formatted_address?.toLowerCase().includes(searchCity.toLowerCase()),
		);
		setFilteredShops(filtered);
	}, [shops, searchCity, setFilteredShops]);

	// Clear breakdown mode when a new search loads new shops
	useEffect(() => {
		setBreakdownActive(false);
		setIsBreakdownOpen(false);
		setBreakdownInput('');
	}, [shops]);

	const handleBreakdownSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!breakdownInput.trim()) return;
		setIsBreakdownLoading(true);
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/api/claude/breakdown-filters`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ problem: breakdownInput }),
				},
			);
			const filters = await res.json();

			let filtered = [...shops];
			if (filters.services && filters.services.length > 0) {
				const withServices = filtered.filter((shop) =>
					filters.services.some((s: string) => shop.services?.includes(s)),
				);
				// Only apply service filter if it returns results
				if (withServices.length > 0) filtered = withServices;
			}
			if (filters.sortBy === 'rating') {
				filtered.sort((a, b) => b.rating - a.rating);
			} else {
				filtered.sort((a, b) => a.distance - b.distance);
			}
			setFilteredShops(filtered);
			setBreakdownActive(true);
			setIsBreakdownOpen(false);
		} catch (error) {
			console.error('Breakdown filter error:', error);
		} finally {
			setIsBreakdownLoading(false);
		}
	};

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
	const handleShopSelect = (shop: Shop) => {
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
    fixed bottom-0 left-0 right-0 bg-white dark:bg-vs-panel shadow-xl rounded-t-2xl border border-gray-300 dark:border-vs-border
    transition-transform duration-300 z-50 flex flex-col
    ${isModalOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}
  `}
				style={{ maxHeight: '60vh' }}
			>
				{/* Handle/Tab Area - Always visible */}
				<div
					{...handlers}
					className="py-[10px] px-4 cursor-pointer select-none flex-shrink-0 bg-[#F7F7F7] dark:bg-vs-panel rounded-t-2xl"
					onClick={isModalOpen ? closeModal : openModal}
				>
					{/* Handle bar */}
					<div className="w-12 h-[5px] bg-[#CCCCCC] dark:bg-vs-border rounded-full mx-auto mb-3"></div>

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
									<h2 className="text-lg font-semibold dark:text-vs-heading">
										{selectedShop.name}
									</h2>
								</>
							) : (
								<>
									<span className="text-sm text-gray-500 dark:text-vs-muted bg-gray-100 dark:bg-vs-card px-2 py-1 rounded-full">
										{shops.length} Results
									</span>
									<button
										onClick={(e) => {
											e.stopPropagation();
											setIsBreakdownOpen((prev) => !prev);
											setIsModalOpen(true);
										}}
										className="ml-2 text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full font-medium cursor-pointer"
									>
										Broken Down?
									</button>
								</>
							)}
						</div>

						<div className="text-gray-400 dark:text-vs-muted">
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
							{/* Breakdown input replaces SearchForm when active */}
							{isBreakdownOpen ? (
								<form
									onSubmit={handleBreakdownSubmit}
									className="px-4 py-4"
								>
									<div className="flex items-center justify-between mb-2">
										<p className="text-xs text-gray-500 dark:text-vs-muted">
											Describe what's happening — we'll find the right shops.
										</p>
										<button
											type="button"
											onClick={() => setIsBreakdownOpen(false)}
											className="text-xs text-gray-400 hover:text-gray-600 ml-3 shrink-0"
										>
											✕ Cancel
										</button>
									</div>
									<div
										className="bg-white dark:bg-[#2a2a2a]"
										style={{ border: '1px solid #E0E0E0', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 8 }}
									>
										<div
											className="flex items-center overflow-hidden border border-gray-200 bg-white dark:bg-[#2a2a2a] dark:border-[#4a4a4a]"
											style={{ borderRadius: 8 }}
										>
											<input
												autoFocus
												type="text"
												value={breakdownInput}
												onChange={(e) => setBreakdownInput(e.target.value)}
												placeholder="e.g. brakes went out, can't move the truck"
												className="flex-1 bg-transparent h-[46px] pl-4 pr-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none text-sm"
											/>
											<button
												type="submit"
												disabled={isBreakdownLoading}
												className="h-[46px] px-4 sm:px-5 text-white font-medium flex items-center gap-2 shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
												style={{ backgroundColor: '#DC2626', borderRadius: 0 }}
											>
												{isBreakdownLoading ? '...' : 'Find Help'}
											</button>
										</div>
									</div>
								</form>
							) : (
								<>
									{breakdownActive && (
										<div className="mx-4 mt-3 mb-1 flex items-center justify-between bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-3 py-2">
											<span className="text-xs text-red-600 dark:text-red-400 font-medium">
												Showing {filteredShops.length} results for your situation
											</span>
											<button
												onClick={() => {
													setBreakdownActive(false);
													setBreakdownInput('');
													setFilteredShops(
														[...shops].sort((a, b) =>
															sortBy === 'rating'
																? b.rating - a.rating
																: a.distance - b.distance,
														),
													);
												}}
												className="text-xs text-red-400 hover:text-red-600 ml-2"
											>
												✕ Clear
											</button>
										</div>
									)}
									<SearchForm />
								</>
							)}
							<RepairFilters setFilterTag={setFilterTag} sortBy={sortBy} setSortBy={setSortBy} />
							<ShopList
								shops={filteredShops}
								handleShopSelect={handleShopSelect}
								loading={loading}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
