const HowToFindShops = () => {
	const steps = [
		{
			id: 1,
			title: 'Enter Your Location',
			des: 'Type your city, zip code, or highway exit — or tap "Use Current Location" for instant GPS-based results.',
		},
		{
			id: 2,
			title: 'Find the Right Shop',
			des: 'Browse verified diesel and commercial truck repair shops near you, sorted by distance. Filter by open status or service type.',
		},
		{
			id: 3,
			title: 'Call & Get Fixed',
			des: 'Tap to call the shop directly. Get directions or request mobile roadside service — no account needed.',
		},
	];
	return (
		<div className="">
			<h2 className="text-3xl font-bold dark:text-gray-100 text-center my-4">
				Find a Truck Repair Shop in Three Steps
			</h2>
			<p className="text-center text-gray-500 dark:text-gray-100">
				No sign-ups, no subscriptions — just the nearest verified semi truck
				and diesel repair shops, ready when you need them.
			</p>
			<ul className="mt-8 flex flex-col gap-4 md:flex-row">
				{steps.map((step) => {
					return (
						<li
							key={step.id}
							className="border flex flex-col justify-center items-center text-gray-500 dark:text-gray-100 border-gray-200 rounded-xl py-8 px-2 w-full md:w-1/3 "
						>
							<div className="bg-orange-500 text-orange-100 flex h-12 w-12 p-4 rounded-full mb-4 justify-center items-center font-bold text-xl">
								{step.id}
							</div>
							<h3 className="font-bold text-2xl text-center text-black dark:text-gray-100">
								{step.title}
							</h3>
							<p className="text-center ">{step.des}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default HowToFindShops;
