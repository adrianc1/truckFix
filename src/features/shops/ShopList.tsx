import ShopCard from './ShopCard';
import { Shop } from '../../types';

function ShopCardSkeleton() {
	return (
		<div className="flex w-full px-3 py-4 border border-gray-200 dark:border-vs-border rounded-xl h-auto mb-0.5 animate-pulse">
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
		<section className="w-full h-auto px-2 mt-4">
			<h2 className="nearby-shops mb-4 font-bold dark:text-vs-heading text-2xl">
				Nearby Repair Shops
			</h2>

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
				<div className="shop-list-container w-full space-y-3 cursor-pointer">
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
