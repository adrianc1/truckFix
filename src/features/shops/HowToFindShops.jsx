const HowToFindShops = () => {
	const steps = [
		{
			id: 1,
			title: 'Share Your Location',
			des: 'Enter your current location or allow the app to detect it automatically.',
		},
		{
			id: 2,
			title: 'Browse Nearby Shops',
			des: 'View all available shops, their services, ratings, and current wait times.',
		},
		{
			id: 3,
			title: 'Book & Get Service',
			des: 'Contact the shop directly or book an appointment through the app.',
		},
	];
	return (
		<div className="">
			<h4 className="text-3xl font-bold text-center">
				Back On The Road In Three Simple Steps
			</h4>
			<p className="text-center text-gray-500">
				TruckFix provides all the tools truckers need to find reliable repairs
				quickly and get back on schedule.
			</p>
			<ul className="mt-8 flex flex-col gap-4">
				{steps.map((step) => {
					return (
						<li
							key={step.id}
							className="border flex flex-col justify-center items-center text-gray-500 border-gray-200 rounded-xl py-8 px-2"
						>
							<div className="bg-orange-500 text-orange-100 flex h-12 w-12 p-4  rounded-full mb-4 justify-center items-center font-bold text-xl">
								{step.id}
							</div>
							<h6 className="font-bold text-2xl text-center text-black">
								{step.title}
							</h6>
							<p className="text-center ">{step.des}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default HowToFindShops;
