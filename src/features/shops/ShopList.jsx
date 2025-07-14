import ShopCard from './ShopCard';

export default function ShopList({ shops = [], handleShopSelect }) {
	return (
		<section className="w-full h-auto px-2 mt-4">
			<h2 className="nearby-shops mb-4 font-bold text-2xl">
				Nearby Repair Shops
			</h2>

			{shops.length === 0 ? (
				<div className="text-center py-8 text-gray-500">
					No shops found matching your criteria.
				</div>
			) : (
				<div className="shop-list-container w-full space-y-3">
					{shops.map((shop) => (
						<ShopCard
							key={shop.place_id}
							shop={shop}
							onShopSelect={() => handleShopSelect(shop)}
						/>
					))}
				</div>
			)}
		</section>
	);
}
