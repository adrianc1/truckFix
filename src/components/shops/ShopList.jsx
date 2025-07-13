import { useState } from 'react';
import useShops from '../hooks/useShops';
import ShopDetailsPage from './ShopDetailsPage';
import ShopCard from './ShopCard';

export default function ShopList() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedShop, setSelectedShop] = useState(null);
	const shops = useShops();

	const handleShowShopDetails = (shop) => {
		setSelectedShop(shop); // Only mounts the modal wrapper
	};

	const closeModal = () => {
		setIsModalOpen(false);

		setTimeout(() => {
			setSelectedShop(null);
		}, 300);
	};

	return (
		<section className="w-full h-auto px-2 mt-8">
			<h2 className="nearby-shops mb-4 font-bold text-2xl">
				Nearby Repair Shops
			</h2>
			{
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
			}

			{selectedShop && (
				<div
					className={`
		fixed bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-2xl border border-gray-300 transition-transform duration-300
		max-h-[90vh] overflow-y-auto
		${isModalOpen ? 'translate-y-0' : 'translate-y-full'}
	`}
				>
					<ShopDetailsPage
						selectedShop={selectedShop}
						closeModal={closeModal}
						setIsModalOpen={setIsModalOpen}
					/>
				</div>
			)}
		</section>
	);
}
