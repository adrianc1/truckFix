import star from '../../assets/images/star.svg';
import { Shop } from '../../types';
export default function ShopCard({
	shop,
	onShopSelect,
}: {
	shop: Shop;
	onShopSelect: () => void;
}) {
	return (
		<>
			<div
				key={shop.place_id}
				onClick={onShopSelect}
				className="flex w-full px-3 py-4 border border-gray-200 dark:border-vs-border rounded-xl h-auto mb-0.5 dark:bg-vs-panel dark:text-vs-text hover:bg-gray-50 dark:hover:bg-vs-hover transition-colors cursor-pointer"
			>
				{/* SHOP GENERAL INFORMATION */}
				<div className="shop-info flex-grow min-w-0 flex flex-col">
					<h5 className="repair-shop-name font-bold text-lg mb-1 dark:text-vs-heading">
						{shop.name}
					</h5>

					<span className="text-gray-700 dark:text-vs-muted">
						{shop.formatted_address}
					</span>

					{/* SHOP SERVICES */}
					<div className="flex flex-wrap gap-1 mt-2">
						{shop.services.map((service, index) => (
							<span
								key={index}
								className="border border-gray-300 dark:border-vs-border rounded-full px-2 py-1 text-xs bg-gray-50 dark:bg-vs-hover dark:text-vs-muted hover:bg-gray-100 dark:hover:bg-vs-border transition-colors text-center"
								style={{ minWidth: '60px' }}
							>
								{service.length > 12
									? `${service.substring(0, 12)}...`
									: service}
							</span>
						))}
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
							shop.opening_hours?.open_now ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{shop.opening_hours?.open_now ? 'Open Now' : 'Closed'}
					</span>
				</div>
			</div>
		</>
	);
}
