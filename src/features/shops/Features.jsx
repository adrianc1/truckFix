import {
	Navigation,
	Wrench,
	Clock,
	Star,
	Phone,
	ShieldCheck,
} from 'lucide-react';
const Features = () => {
	const featuresList = [
		{
			title: 'Nearby Shops',
			des: 'Find repair shops near your current location or along your planned route',
			icon: Navigation,
		},
		{
			title: 'Service Specialties',
			des: 'Filter shops by the services you need, from engine repairs to tire replacements',
			icon: Wrench,
		},
		{
			title: 'Real-Time Availablity',
			des: 'See which shops can service you immediately and which require appointments',
			icon: Clock,
		},
		{
			title: 'Verified Reviews',
			des: 'Read reviews from other truckers to find the most reliable repair shops',
			icon: Star,
		},
		{
			title: 'Direct Contact',
			des: 'Call shops directly through the app or send your location for roadside assitance.',
			icon: Phone,
		},
		{
			title: 'Quality Guarantee',
			des: 'All shops in our network are vetted and must maintain high service standards ',
			icon: ShieldCheck,
		},
	];

	return (
		<div className="">
			<h4 className="text-3xl font-bold text-center my-4">
				Everything You Need On The Road
			</h4>
			<p className="text-center text-gray-500">
				TruckFix provides all the tools truckers need to find reliable repairs
				quickly and get back on schedule.
			</p>
			<ul className="mt-8 flex flex-col gap-4">
				{featuresList.map((f, index) => {
					const IconComponent = f.icon;
					return (
						<li
							key={index}
							className="border text-gray-500 border-gray-200 rounded-xl py-8 px-2"
						>
							<div className="bg-orange-100 text-orange-500 flex w-fit p-3 rounded-xl mb-4">
								<IconComponent size={24} />
							</div>
							<h6 className="font-bold text-2xl text-black">{f.title}</h6>
							<p>{f.des}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default Features;
