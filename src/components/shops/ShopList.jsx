import { useState } from 'react';
import useShops from '../hooks/useShops';
import ShopDetailsPage from './ShopDetailsPage';
import ShopCard from './ShopCard';

export default function ShopList() {
	const [showDetails, setShowDetails] = useState(false);
	const [selectedShop, setSelectedShop] = useState(null);
	const shops = useShops();

	function handleShowShopDetails(s) {
		setSelectedShop(s);
		setShowDetails(true);
		console.log('i got slick');
	}

	function closeModal() {
		setSelectedShop(null);
		setShowDetails(false);
	}

	return (
		<section className="w-full h-auto px-2 mt-8">
			<h2 className="nearby-shops mb-4 font-bold text-2xl">
				Nearby Repair Shops
			</h2>
			{!showDetails && (
				<div className="shop-list-container w-full">
					{shops.map((shop) => (
						<ShopCard
							key={shop.place_id}
							shop={shop}
							selectedShop={selectedShop}
							handleShowShopDetails={(e) => {
								e.preventDefault();
								handleShowShopDetails(shop);
							}}
						/>
					))}
				</div>
			)}

			{showDetails && (
				<ShopDetailsPage selectedShop={selectedShop} closeModal={closeModal} />
			)}
		</section>
	);
}
