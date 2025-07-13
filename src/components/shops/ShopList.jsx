import dummyShops from '../../data/mocks/shopData';
import ShopCard from './ShopCard';

export default function ShopList() {
	return (
		<section className="w-full h-auto px-2 mt-8">
			<h2 className="nearby-shops mb-4 font-bold text-2xl">
				Nearby Repair Shops
			</h2>
			<div className="shop-list-container w-full">
				{dummyShops.map((shop) => (
					<ShopCard key={shop.place_id} shop={shop} />
				))}
			</div>
		</section>
	);
}
