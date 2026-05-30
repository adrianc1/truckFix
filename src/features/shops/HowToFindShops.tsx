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

const HowToFindShops = () => {
	return (
		<div className="w-full">
			<h2 className="text-3xl font-bold dark:text-gray-100 text-center my-4">
				Find a Truck Repair Shop in Three Steps
			</h2>
			<p className="text-center text-gray-500 dark:text-gray-400">
				No sign-ups, no subscriptions — just the nearest verified semi truck
				and diesel repair shops, ready when you need them.
			</p>
			<div className="relative max-w-[800px] mx-auto mt-12">
				{/* Connecting line — visible on md+ only */}
				<div
					className="hidden md:block absolute left-0 right-0 pointer-events-none"
					style={{ top: 18, height: 1, backgroundColor: '#3a3a3a' }}
				/>
				<div className="flex flex-col md:flex-row gap-12">
					{steps.map((step) => (
						<div
							key={step.id}
							className="flex-1 flex flex-col md:items-center md:text-center"
						>
							<div
								className="relative z-10 flex items-center justify-center rounded-full text-white font-semibold mb-4 shrink-0"
								style={{
									width: 36,
									height: 36,
									backgroundColor: '#E8721A',
									fontSize: 15,
								}}
							>
								{step.id}
							</div>
							<h3
								className="text-gray-900 dark:text-white mb-2"
								style={{ fontSize: 16, fontWeight: 500 }}
							>
								{step.title}
							</h3>
							<p className="text-gray-500 dark:text-[#aaa]" style={{ fontSize: 13, lineHeight: 1.6 }}>
								{step.des}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HowToFindShops;
