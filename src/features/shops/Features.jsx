const Features = () => {
	const featuresList = [
		{
			title: 'Nearby Shops',
			des: 'Find repair shops near your current location or along your planned route',
		},
		{
			title: 'Service Specialties',
			des: 'Filter shops by the services you need, from engine repairs to tire replacements',
		},
		{
			title: 'Real-Time Availablity',
			des: 'See which shops can service you immediately and which require appointments',
		},
		{
			title: 'Verified Reviews',
			des: 'Read reviews from other truckers to find the most reliable repair shops',
		},
		{
			title: 'Direct Contact',
			des: 'Call shops directly through the app or send your location for roadside assitance.',
		},
		{
			title: 'Quality Guarantee',
			des: 'All shops in our network are vetted and must maintain high service standards ',
		},
	];

	return (
		<div className="">
			<h4 className="text-2xl font-bold text-center">
				Everything You Need On The Road
			</h4>
			<p className="text-center">
				TruckFix provides all the tools truckers need to find reliable repairs
				quickly and get back on schedule.
			</p>
			<ul className="mt-8 flex flex-col gap-4">
				{featuresList.map((f) => {
					return (
						<li className="border border-gray-200 rounded-xl py-8 px-2">
							<h6 className="font-bold text-xl">{f.title}</h6>
							<p>{f.des}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default Features;
