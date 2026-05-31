import ShopCard from './ShopCard';
import { Shop } from '../../types';

function ShopCardSkeleton() {
	return (
		<div className="flex w-full px-5 py-4 h-auto mb-3 bg-white dark:bg-vs-panel animate-pulse" style={{ border: '1px solid #E5E5E5', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
			<div className="flex-grow flex flex-col gap-2">
				<div className="h-5 bg-gray-200 dark:bg-vs-hover rounded w-3/4" />
				<div className="h-4 bg-gray-200 dark:bg-vs-hover rounded w-full" />
				<div className="flex gap-1 mt-1">
					<div className="h-5 bg-gray-200 dark:bg-vs-hover rounded-full w-16" />
					<div className="h-5 bg-gray-200 dark:bg-vs-hover rounded-full w-16" />
					<div className="h-5 bg-gray-200 dark:bg-vs-hover rounded-full w-12" />
				</div>
			</div>
			<div className="flex-shrink-0 w-24 flex flex-col gap-2 justify-center items-center ml-4">
				<div className="h-6 bg-gray-200 dark:bg-vs-hover rounded-full w-16" />
				<div className="h-4 bg-gray-200 dark:bg-vs-hover rounded w-14" />
			</div>
		</div>
	);
}

export default function ShopList({
	shops = [],
	handleShopSelect,
	loading = false,
}: {
	shops: Shop[];
	handleShopSelect: (shop: Shop) => void;
	loading?: boolean;
}) {
	return (
		<section className="w-full h-auto px-2 mt-3">
			{loading ? (
				<div className="shop-list-container w-full space-y-3">
					{Array.from({ length: 5 }).map((_, i) => (
						<ShopCardSkeleton key={i} />
					))}
				</div>
			) : shops.length === 0 ? (
				<div className="text-center py-8 text-gray-500 dark:text-vs-muted">
					No shops found matching your criteria.
				</div>
			) : (
				<div className="shop-list-container w-full cursor-pointer">
					{shops.map((shop) => (
						<ShopCard
							key={shop.placeId}
							shop={shop}
							onShopSelect={() => handleShopSelect(shop)}
						/>
					))}
				</div>
			)}
		</section>
	);
}
