import star from '../../assets/images/star.svg';
export default function ShopCard({ shop, onShopSelect }) {
	return (
		<>
			<div
				key={shop.place_id}
				onClick={onShopSelect}
				className="flex w-full px-3 py-4 border-2 border-gray-200 rounded-xl h-auto mb-0.5 dark:text-gray-100"
			>
				{/* SHOP GENERAL INFORMATION */}
				<div className="shop-info flex-grow min-w-0 flex flex-col">
					<h5 className="repair-shop-name font-bold  text-lg mb-1">
						{shop.name}
					</h5>

					<span className="text-gray-700 dark:text-gray-100">
						{shop.formatted_address}
					</span>

					{/* SHOP SERVICES */}
					<div className="flex flex-wrap gap-1 mt-2">
						{/* {shop.services.map((service, index) => (
							<span
								key={index}
								className="border border-gray-300 rounded-full px-2 py-1 text-xs bg-gray-50 hover:bg-gray-100 transition-colors text-center"
								style={{ minWidth: '60px' }}
							>
								{service.length > 12
									? `${service.substring(0, 12)}...`
									: service}
							</span>
						))} */}
						<span className="rating flex justify-center items-center gap-1">
							<div className="star w-4 h-4">
								<img src={star} alt="" className="w-full h-full" />
							</div>
							{shop.rating}
						</span>
					</div>
				</div>

				{/* Rating and is open */}
				<div className="rating-status-container flex-shrink-0 w-24 flex flex-col gap-2 justify-center items-center ml-4">
					<span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-medium">
						{shop.distance.toFixed(1)} mi
					</span>

					<span
						className={`is-open text-sm font-medium ${
							shop.opening_hours?.open_now ? 'text-green-600' : 'text-red-600'
						}`}
					>
						{shop.opening_hours?.open_now ? 'Open Now' : 'Closed'}
					</span>
				</div>
			</div>
		</>
	);
}
