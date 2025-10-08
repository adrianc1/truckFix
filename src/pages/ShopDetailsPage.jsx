import { Clock, MapPin, Phone, Wrench } from 'lucide-react';
import star from '../assets/images/star.svg';

const ShopDetailsPage = ({ selectedShop }) => {
	return (
		<div className="px-4 pb-4">
			{/* Shop Rating and Status */}
			<div className="flex justify-between mb-4 dark:text-white">
				{/* selected shop rating */}
				<span className="rating flex justify-center items-center gap-1">
					<div className="star w-4 h-4">
						<img src={star} alt="" className="w-full h-full" />
					</div>
					{selectedShop.rating}({selectedShop.user_ratings_total} reviews)
				</span>

				{/* open or closed */}
				<span
					className={`is-open text-sm font-bold ${
						selectedShop.opening_hours?.open_now
							? 'text-green-600'
							: 'text-red-600'
					}`}
				>
					{selectedShop.opening_hours?.open_now ? 'Open Now' : 'Closed'}
				</span>
			</div>

			{/* address block */}
			<div className="address-block dark:text-gray-200 flex flex-col w-full px-3 py-4 border-2 border-gray-200 rounded-xl h-auto mb-3">
				<MapPin className="mb-2" />
				<h6 className="font-bold">Address</h6>
				<span>{selectedShop.formatted_address}</span>
				<span className="">{selectedShop.distance.toFixed(1)} mi</span>
			</div>

			{/* phone block  */}
			<div className="phone-block dark:text-gray-200 flex items-center justify-between w-full px-3 py-4 border-2 border-gray-200 rounded-xl h-auto mb-3">
				<div className="flex-col">
					<Phone className="mb-2" />
					<h6 className="font-bold">Phone</h6>
				</div>
				<div className="flex justify-end items-center pr-4">
					<button className="border px-4 py-2 rounded-xl bg-orange-500 text-white cursor-pointer">
						Call Shop Now
					</button>
				</div>
			</div>

			{/* Services */}
			<div className="services-block  h-auto flex flex-col w-full px-3 py-4 border-2 border-gray-200 rounded-xl mb-3">
				<Wrench className="mb-2 dark:text-gray-200" />
				<h6 className="font-bold dark:text-gray-200">Services</h6>

				<div className="flex flex-wrap gap-2 mt-2">
					{selectedShop.services?.map((service, index) => (
						<span
							key={index}
							className="border max-w-36 border-gray-300 rounded-full py-1 px-3 text-xs bg-gray-50 hover:bg-gray-100 transition-colors text-center flex justify-center items-center"
							style={{ minWidth: '60px' }}
						>
							{service.length > 20 ? `${service.substring(0, 20)}...` : service}
						</span>
					))}
				</div>
			</div>

			{/* hours */}
			<div className="hours-block dark:text-gray-200 flex flex-col w-full px-3 py-4 border-2 border-gray-200 rounded-xl h-auto mb-3">
				<Clock className="mb-2" />
				<h6 className="font-bold">Hours</h6>
				<ul>
					{selectedShop.current_opening_hours?.weekday_text?.map((d, index) => (
						<li key={index} className="flex flex-col py-2">
							{d}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ShopDetailsPage;
