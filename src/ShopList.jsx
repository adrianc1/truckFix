export default function ShopList() {
	const shops = [
		{
			shopName: 'Big Rig Express Repair',
			shopAddress: '1234 Truck Hwy, Dallas, TX',
			shopDistance: '0.8 miles',
			shopTags: ['Engine', 'Brakes', '24/7'],
		},
		{
			shopName: 'Interstate Truck Service',
			shopAddress: '5678 Freeway Rd, Dallas, TX',
			shopDistance: '1.2 miles',
			shopTags: ['Tires', 'Electrical'],
		},
		{
			shopName: 'Diesel Doctors',
			shopAddress: '910 Industrial Blvd, Dallas, TX',
			shopDistance: '2.5 miles',
			shopTags: ['Engine', 'Diagnostics', 'Parts'],
		},
	];

	return (
		<section className="w-full h-auto px-2">
			<h2 className="nearby-shops font-bold text-2xl">Nearby Repair Shops</h2>
			<ul className="">
				{shops.map((shop) => (
					<li
						key={shop.shopName}
						className="px-3 py-4  border-2 border-gray-200 rounded h-auto mb-0.5"
					>
						<div className="shop-info flex flex-col">
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
					</li>
				))}
			</ul>
		</section>
	);
}
