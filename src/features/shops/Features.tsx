import { useEffect } from 'react';
import {
	LocateFixed,
	AlarmClock,
	Sparkles,
	BadgeCheck,
	PhoneCall,
} from 'lucide-react';

interface Feature {
	title: string;
	description: string;
	icon: React.ElementType;
	tag?: string;
}

const featuresList: Feature[] = [
	{
		title: 'Nearby Shops',
		description:
			'Find verified diesel and commercial truck repair shops near your current location or along your route. Sorted by distance, filtered by what\'s open right now.',
		icon: LocateFixed,
	},
	{
		title: 'Real-Time Availability',
		description:
			'See which shops can take you immediately and which require appointments. No calling around — availability is surfaced before you pull in.',
		icon: AlarmClock,
	},
	{
		title: 'AI Breakdown Mode',
		description:
			"Describe your situation in plain language — 'my brakes are grinding and I can't move the truck.' TruckFix extracts what you need and surfaces the closest shops equipped to fix it.",
		icon: Sparkles,
		tag: 'Powered by Claude',
	},
	{
		title: 'Direct Contact',
		description:
			'Tap to call or get directions without leaving the app. No account, no sign-up — just the number and the route.',
		icon: PhoneCall,
	},
	{
		title: 'Trucker-Verified Reviews',
		description:
			"Ratings from commercial drivers who've actually been there. Not general Google reviews — context that matters to someone with an 80,000lb rig.",
		icon: BadgeCheck,
	},
];

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
			{ threshold: 0.1 },
		);

		const featureElements = document.querySelectorAll('.feature-row');
		featureElements.forEach((el) => observer.observe(el));

		return () => {
			featureElements.forEach((el) => observer.unobserve(el));
		};
	}, []);

	return (
		<div className="w-full max-w-[740px] mx-auto">
			<h2 className="text-3xl font-bold dark:text-vs-heading text-center my-4">
				Everything a Truck Driver Needs to Find Repair Fast
			</h2>
			<p className="text-center text-gray-500 dark:text-gray-400">
				From diesel engine failures to tire blowouts and DEF system warnings —
				TruckFix finds the right shop, open right now, closest to you.
			</p>
			<ul className="mt-12 w-full">
				{featuresList.map((f, index) => {
					const IconComponent = f.icon;
					return (
						<li
							key={index}
							className={`feature-row flex items-start gap-4 py-6 ${
								index < featuresList.length - 1
									? 'border-b border-gray-100 dark:border-vs-border'
									: ''
							}`}
						>
							<div
								className="shrink-0 flex items-center justify-center rounded-[10px]"
								style={{ width: 44, height: 44, backgroundColor: '#E8721A' }}
							>
								<IconComponent size={20} color="white" />
							</div>
							<div className="flex flex-col gap-1">
								<h3
									className="font-semibold text-gray-900 dark:text-white"
									style={{ fontSize: 15 }}
								>
									{f.title}
								</h3>
								{f.tag && (
									<span
										className="inline-flex items-center w-fit rounded-full px-2 py-0.5"
										style={{
											background: 'rgba(232,114,26,0.15)',
											color: '#E8721A',
											fontSize: 11,
										}}
									>
										{f.tag}
									</span>
								)}
								<p className="text-gray-500 dark:text-[#aaa]" style={{ fontSize: 13, lineHeight: 1.6 }}>
									{f.description}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Features;
