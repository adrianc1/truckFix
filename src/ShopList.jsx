import star from './assets/images/star.svg';

export default function ShopList() {
	const shops = [
		{
			shopName: 'Big Rig Express Repair',
			shopAddress: '1234 Truck Hwy, Dallas, TX',
			shopDistance: '0.8 miles',
			shopTags: ['Engine', 'Brakes', '24/7'],
			shopRating: 4.1,
			isOpen: true,
		},
		{
			shopName: 'Interstate Truck Service',
			shopAddress: '5678 Freeway Rd, Dallas, TX',
			shopDistance: '1.2 miles',
			shopTags: ['Tires', 'Electrical'],
			shopRating: 4.7,
			isOpen: true,
		},
		{
			shopName: 'Diesel Doctors',
			shopAddress: '910 Industrial Blvd, Dallas, TX',
			shopDistance: '2.5 miles',
			shopTags: ['Engine', 'Diagnostics', 'Parts'],
			shopRating: 3.8,
			isOpen: false,
		},
	];

	return (
		<section className="w-full h-auto px-2 mt-8">
			<h2 className="nearby-shops mb-4 font-bold text-2xl">
				Nearby Repair Shops
			</h2>
			<ul className="">
				{shops.map((shop) => (
					<li
						key={shop.shopName}
						className="flex px-3 py-4 border-2 border-gray-200 rounded-xl h-auto mb-0.5"
					>
						<div className="shop-info w-full flex flex-4 flex-col">
							<h5 className="repair-shop-name font-bold text-lg mb-1">
								{shop.shopName}
							</h5>
							<span className="text-gray-700">{shop.shopAddress}</span>
							<span>{shop.shopDistance}</span>
							<span className="flex gap-2 mt-2">
								{shop.shopTags.map((tag, index) => (
									<span
										key={index}
										className="border border-gray-300 px-2 py-1 rounded-2xl"
									>
										{tag}
									</span>
								))}
							</span>
						</div>
						<div className="rating-status-container flex-1 w-full flex flex-col justify-center items-center">
							<span className="rating flex justify-center items-center gap-1">
								<div className="star w-1/5">
									<img src={star} alt="" />
								</div>
								{shop.shopRating}
							</span>
							<span
								className={`is-open ${
									shop.isOpen ? 'text-green-600' : 'text-red-600'
								}`}
							>
								{shop.isOpen ? 'Open Now' : 'Closed'}
							</span>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
