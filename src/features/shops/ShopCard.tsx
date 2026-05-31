import star from '../../assets/images/star.svg';
import { Shop } from '../../types';
import checkIfOpen from '../../utils/checkIfOpen';
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
				key={shop.placeId}
				onClick={onShopSelect}
				className="flex w-full px-5 py-4 h-auto mb-3 bg-white dark:bg-vs-panel dark:border-vs-border dark:text-vs-text hover:bg-gray-50 dark:hover:bg-vs-hover transition-colors cursor-pointer"
				style={{ border: '1px solid #E5E5E5', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
			>
				{/* SHOP GENERAL INFORMATION */}
				<div className="shop-info flex-grow min-w-0 flex flex-col">
					<h5 className="repair-shop-name font-bold text-lg mb-1 dark:text-vs-heading">
						{shop.name}
					</h5>

					{shop.formatted_address && (
						<span className="text-gray-700 dark:text-vs-muted text-sm">
							{shop.formatted_address}
						</span>
					)}
					{shop.formatted_phone_number && (
						<span className="text-gray-500 dark:text-vs-muted text-sm">
							{shop.formatted_phone_number}
						</span>
					)}

					{/* SHOP SERVICES */}
					<div className="flex flex-wrap gap-1 mt-2">
						{shop.services.map((service, index) => (
							<span
								key={index}
								className="rounded-[6px] px-[10px] py-[3px] text-xs bg-[#F0F0F0] text-[#444444] dark:bg-vs-hover dark:text-vs-muted dark:border dark:border-vs-border transition-colors"
							>
								{service.length > 12
									? `${service.substring(0, 12)}...`
									: service}
							</span>
						))}
					</div>
				</div>

				{/* Rating and is open */}
				<div className="rating-status-container flex-shrink-0 w-24 flex flex-col gap-2 justify-center items-center ml-4">
					<span className="rating flex justify-center items-center gap-1 text-sm font-medium">
						<img src={star} alt="" className="w-4 h-4" />
						{shop.rating}
					</span>

					<span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-medium">
						{shop.distance.toFixed(1)} mi
					</span>

					<span
						className={`is-open text-xs font-medium rounded-full px-[10px] py-[2px] ${
							checkIfOpen({ weekdayDescriptions: shop.current_opening_hours?.weekday_text ?? [] })
								? 'bg-[#E6F4EA] text-[#2E7D32] dark:bg-green-900/30 dark:text-green-400'
								: 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400'
						}`}
					>
						{checkIfOpen({ weekdayDescriptions: shop.current_opening_hours?.weekday_text ?? [] }) ? 'Open Now' : 'Closed'}
					</span>
				</div>
			</div>
		</>
	);
}
