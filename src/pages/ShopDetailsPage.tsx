import { Clock, MapPin, Phone, Wrench, Star } from 'lucide-react';
import star from '../assets/images/star.svg';
import { Shop } from '../types';
import checkIfOpen from '../utils/checkIfOpen';

const ShopDetailsPage = ({ selectedShop }: { selectedShop: Shop }) => {
	return (
		<div className="px-4 pb-4">
			{/* Shop Rating and Status */}
			<div className="flex justify-between mb-4 dark:text-vs-text">
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
						checkIfOpen({ weekdayDescriptions: selectedShop.current_opening_hours?.weekday_text ?? [] })
							? 'text-green-500'
							: 'text-red-500'
					}`}
				>
					{checkIfOpen({ weekdayDescriptions: selectedShop.current_opening_hours?.weekday_text ?? [] }) ? 'Open Now' : 'Closed'}
				</span>
			</div>

			{/* address block */}
			<div className="address-block dark:text-vs-text flex flex-col w-full px-3 py-4 border-2 border-gray-200 dark:border-vs-border rounded-xl h-auto mb-3 dark:bg-vs-card">
				<MapPin className="mb-2" />
				<h6 className="font-bold dark:text-vs-heading">Address</h6>
				<span>{selectedShop.formatted_address}</span>
				<span className="">{selectedShop.distance.toFixed(1)} mi</span>
			</div>

			{/* phone block  */}
			<div className="phone-block dark:text-vs-text flex items-center justify-between w-full px-3 py-4 border-2 border-gray-200 dark:border-vs-border rounded-xl h-auto mb-3 dark:bg-vs-card">
				<div className="flex-col">
					<Phone className="mb-2" />
					<h6 className="font-bold dark:text-vs-heading">Phone</h6>
					<span className="hidden md:block text-gray-600 dark:text-vs-muted">
						{selectedShop.formatted_phone_number}
					</span>
				</div>
				<div className="flex flex-col">{/* <p>Shop Phone Number:</p> */}</div>

				<div className="flex justify-end items-center pr-4">
					<a
						className="border px-4 py-2 rounded-xl bg-orange-500 text-white cursor-pointer"
						href={`tel:${selectedShop.formatted_phone_number}`}
					>
						Call Shop Now
					</a>
				</div>
			</div>

			{/* Services */}
			<div className="services-block h-auto flex flex-col w-full px-3 py-4 border-2 border-gray-200 dark:border-vs-border rounded-xl mb-3 dark:bg-vs-card">
				<Wrench className="mb-2 dark:text-vs-text" />
				<h6 className="font-bold dark:text-vs-heading">Services</h6>

				<div className="flex flex-wrap gap-2 mt-2">
					{selectedShop.services?.map((service, index) => (
						<span
							key={index}
							className="border max-w-36 border-gray-300 dark:border-vs-border rounded-full py-1 px-3 text-xs bg-gray-50 dark:bg-vs-hover dark:text-vs-text hover:bg-gray-100 dark:hover:bg-vs-border transition-colors text-center flex justify-center items-center"
							style={{ minWidth: '60px' }}
						>
							{service.length > 20 ? `${service.substring(0, 20)}...` : service}
						</span>
					))}
				</div>
			</div>

			{/* hours */}
			<div className="hours-block dark:text-vs-text flex flex-col w-full px-3 py-4 border-2 border-gray-200 dark:border-vs-border rounded-xl h-auto mb-3 dark:bg-vs-card">
				<Clock className="mb-2" />
				<h6 className="font-bold dark:text-vs-heading">Hours</h6>
				<ul>
					{selectedShop.current_opening_hours?.weekday_text?.map((d, index) => (
						<li key={index} className="flex flex-col py-2">
							{d}
						</li>
					))}
				</ul>
			</div>

			{/* Reviews */}
			<div className="hours-block dark:text-vs-text flex flex-col w-full px-3 py-4 border-2 border-gray-200 dark:border-vs-border rounded-xl h-auto mb-3 dark:bg-vs-card">
				<Star className="mb-2" />
				<h6 className="font-bold dark:text-vs-heading">Reviews</h6>
				<ul className="space-y-4 px-4 py-2">
					{selectedShop.reviews?.map((review, index) => (
						<li
							key={index}
							className="bg-white dark:bg-vs-hover rounded-2xl shadow-sm border border-gray-100 dark:border-vs-border p-4 flex flex-col gap-3"
						>
							{/* Header with author and rating */}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-white flex items-center justify-center text-black font-semibold">
										{review.authorAttribution.displayName
											.charAt(0)
											.toUpperCase()}
									</div>
									<span className="font-semibold text-gray-900 dark:text-vs-text">
										{review.authorAttribution.displayName}
									</span>
								</div>

								{/* Star rating */}
								<div className="flex items-center gap-1 bg-amber-50 dark:bg-vs-card px-2 py-1 rounded-full">
									<svg className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
										<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
									</svg>
									<span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
										{review.rating}
									</span>
								</div>
							</div>

							{/* Review text */}
							<p className="text-gray-700 dark:text-vs-text text-sm leading-relaxed">
								{review.text}
							</p>
							{/* Review Date */}
							<span className="text-xs text-gray-500 dark:text-vs-muted">
								{review.publishTime
									? new Date(review.publishTime).toLocaleDateString()
									: review.relativePublishTimeDescription}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ShopDetailsPage;
