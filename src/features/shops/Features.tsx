import { useEffect } from 'react';
import {
	LocateFixed,
	AlarmClock,
	Sparkles,
	BadgeCheck,
	PhoneCall,
	Award,
} from 'lucide-react';

const Features = () => {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('fade-in-element');
					} else {
						entry.target.classList.remove('fade-in-element');
					}
				});
			},
			{ threshold: 0.1 }
		);

		const featureElements = document.querySelectorAll('.feature-card');
		featureElements.forEach((el) => observer.observe(el));

		return () => {
			featureElements.forEach((el) => observer.unobserve(el));
		};
	}, []);

	const featuresList = [
		{
			title: 'Nearby Shops',
			des: 'Find repair shops near your current location or along your planned route',
			icon: LocateFixed,
		},
		{
			title: 'Real-Time Availability',
			des: 'See which shops can service you immediately and which require appointments',
			icon: AlarmClock,
		},
		{
			title: 'AI Breakdown Mode',
			des: "Broken down and don't know where to start? Describe your issue and our AI instantly finds the closest shops equipped to fix it.",
			icon: Sparkles,
		},
		{
			title: 'Verified Reviews',
			des: 'Read reviews from other truckers to find the most reliable repair shops',
			icon: BadgeCheck,
		},
		{
			title: 'Direct Contact',
			des: 'Call shops directly through the app or send your location for roadside assistance.',
			icon: PhoneCall,
		},
		{
			title: 'Quality Guarantee',
			des: 'All shops in our network are vetted and must maintain high service standards',
			icon: Award,
		},
	];

	return (
		<div className="">
			<h2 className="text-3xl font-bold dark:text-vs-heading text-center my-4">
				Everything a Truck Driver Needs to Find Repair Fast
			</h2>
			<p className="text-center text-gray-500 dark:text-vs-muted">
				From diesel engine failures to tire blowouts and DEF system warnings —
				TruckFix finds the right shop, open right now, closest to you.
			</p>
			<ul className="mt-8 w-full flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center md:gap-12 ">
				{featuresList.map((f, index) => {
					const IconComponent = f.icon;
					return (
						<li
							key={index}
							className="feature-card border text-gray-500 dark:text-vs-muted border-gray-200 dark:border-vs-border dark:bg-vs-panel rounded-xl py-6 px-2
             w-full md:w-1/4 md:p-4 md:pt-6"
						>
							<div className="bg-orange-100 text-orange-500 flex w-fit p-3 rounded-xl mb-4">
								<IconComponent size={36} />
							</div>
							<h3 className="font-semibold text-2xl text-black dark:text-vs-heading">
								{f.title}
							</h3>
							<p>{f.des}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default Features;
