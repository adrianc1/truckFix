import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Navigation,
	Clock,
	Star,
	Phone,
	ShieldCheck,
	Sparkles,
	Wrench,
	Truck,
	MapPin,
	Filter,
	ThumbsUp,
	AlertTriangle,
} from 'lucide-react';
import Footer from '../components/layout/Footer.tsx';

const FAQ_ITEMS: { question: string; answer: string }[] = [
	{
		question: 'How do I find a truck repair shop near me?',
		answer:
			'Enter your city, town, or zip code in the TruckFix search bar — or tap "Use Current Location" to let the app detect where you are. TruckFix instantly shows every verified semi truck and diesel repair shop within your chosen radius, sorted by distance.',
	},
	{
		question: 'Does TruckFix work for emergency roadside truck repair?',
		answer:
			'Yes. Use the Breakdown Mode feature: describe your symptoms (e.g., "blown tire on I-40" or "DEF system warning light") and TruckFix surfaces the nearest shops that carry the parts and staff to fix your specific issue right now.',
	},
	{
		question: 'Can I find 24-hour truck repair shops?',
		answer:
			'Absolutely. Each shop listing shows live open/closed status and full business hours. Use the "Open Now" filter to instantly narrow results to shops that are currently serving drivers.',
	},
	{
		question: 'What types of truck repairs can I search for?',
		answer:
			'TruckFix covers all major commercial vehicle repair categories: diesel engine repair, DEF / emissions systems, brake inspection and replacement, tire repair and replacement, trailer repair, refrigeration unit (reefer) service, electrical diagnostics, and preventive maintenance.',
	},
	{
		question: 'Are the repair shops on TruckFix verified?',
		answer:
			'Every shop in the TruckFix network is verified against public business records and must maintain a minimum rating based on driver reviews. We continuously update listings so you always have accurate phone numbers, addresses, and hours.',
	},
	{
		question: 'Is TruckFix free to use?',
		answer:
			'Yes — searching for shops, reading reviews, and calling shops directly through TruckFix is 100% free for drivers. Shop owners can contact us to claim or upgrade their listing.',
	},
	{
		question: 'How accurate are the shop hours on TruckFix?',
		answer:
			"Hours are sourced from verified business listings and updated regularly. The \"Open Now\" indicator is calculated in real time against the shop's posted hours. If you spot an error, use the \"Submit a correction\" link to flag it.",
	},
];

const CORE_FEATURES: {
	icon: React.ElementType;
	title: string;
	description: string;
	keywords: string;
}[] = [
	{
		icon: Navigation,
		title: 'Location-Based Shop Search',
		description:
			'Find semi truck repair shops near your current GPS position or any city and zip code across the United States. Results are ranked by distance so the closest shop is always at the top.',
		keywords: 'truck repair near me, semi truck shop locator',
	},
	{
		icon: Clock,
		title: 'Real-Time Open / Closed Status',
		description:
			'See at a glance which diesel and commercial truck repair shops are open right now. Filter by "Open Now" to skip shops that can\'t help you today.',
		keywords: '24 hour truck repair, open now truck mechanic',
	},
	{
		icon: Sparkles,
		title: 'AI Breakdown Mode',
		description:
			'Broken down on the side of the highway? Describe your problem in plain English — blown tire, DEF light, engine overheating — and our AI instantly identifies the shops near you that are equipped to fix it.',
		keywords: 'emergency truck repair, roadside assistance, breakdown help',
	},
	{
		icon: Filter,
		title: 'Service-Type Filters',
		description:
			'Filter results by the exact repair you need: diesel engine, brakes, tires, DEF/emissions, trailer, electrical, or preventive maintenance. Stop calling shops that don\'t carry your parts.',
		keywords:
			'diesel mechanic near me, brake repair truck, tire replacement semi',
	},
	{
		icon: Star,
		title: 'Verified Driver Reviews',
		description:
			'Read honest reviews left by fellow truckers — not consumers with passenger cars. Know before you pull in whether a shop is fast, fair, and familiar with Class 8 vehicles.',
		keywords: 'truck repair reviews, best truck mechanic near me',
	},
	{
		icon: Phone,
		title: 'One-Tap Direct Call',
		description:
			'Call any shop directly from the listing with one tap. No copying numbers, no Google detours — get a real person on the line while you\'re still rolling.',
		keywords: 'call truck repair shop, contact diesel mechanic',
	},
	{
		icon: ShieldCheck,
		title: 'Vetted Shop Network',
		description:
			'Every shop passes verification before appearing in TruckFix results. Listings with outdated information or poor ratings are flagged, keeping the directory trustworthy.',
		keywords: 'verified truck repair shops, reliable semi mechanic',
	},
	{
		icon: MapPin,
		title: 'Interactive Map View',
		description:
			'See all nearby shops plotted on a live map. Spot the shop closest to your breakdown, plan a route, and share your position — all without leaving TruckFix.',
		keywords: 'map truck repair shops, route to truck mechanic',
	},
];

const SERVICE_TYPES: { name: string; description: string }[] = [
	{
		name: 'Diesel Engine Repair',
		description:
			'From injector cleaning to full engine rebuilds, find certified diesel mechanics fast.',
	},
	{
		name: 'DEF & Emissions Systems',
		description:
			'SCR catalyst faults, DEF sensor failures, and DPF cleaning near you.',
	},
	{
		name: 'Brake Inspection & Replacement',
		description:
			'Air brake systems, drum and disc replacement, brake chamber repair.',
	},
	{
		name: 'Tire Repair & Replacement',
		description:
			'Commercial truck tire mounting, balancing, retreads, and roadside blowout service.',
	},
	{
		name: 'Trailer Repair',
		description:
			'Reefer unit service, landing gear, kingpin, suspension, and body work.',
	},
	{
		name: 'Electrical Diagnostics',
		description:
			'ABS fault codes, lighting systems, alternator, starter, and battery service.',
	},
	{
		name: 'Preventive Maintenance',
		description:
			'Oil changes, coolant flushes, filter replacements, and DOT inspection prep.',
	},
	{
		name: 'Roadside Assistance',
		description:
			'Mobile mechanics and mobile tire service that come to your location.',
	},
];

const STATS: { value: string; label: string }[] = [
	{ value: '500+', label: 'Verified repair shops' },
	{ value: '48', label: 'States covered' },
	{ value: '< 30 s', label: 'Average search time' },
	{ value: '100%', label: 'Free for drivers' },
];

const FeaturesPage = () => {
	useEffect(() => {
		document.title =
			'TruckFix Features — Find Semi Truck & Diesel Repair Shops Near You';

		const metaDesc = document.querySelector('meta[name="description"]');
		if (metaDesc) {
			metaDesc.setAttribute(
				'content',
				'Explore every TruckFix feature: location-based shop search, real-time open status, AI breakdown mode, service filters, driver reviews, and direct calling — all free for truck drivers.',
			);
		}

		const canonical = document.querySelector('link[rel="canonical"]');
		if (canonical) {
			canonical.setAttribute('href', 'https://trytruckfix.com/features');
		}

		const faqSchema = {
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: FAQ_ITEMS.map((item) => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: item.answer,
				},
			})),
		};

		const existingScript = document.getElementById('faq-schema');
		if (existingScript) existingScript.remove();

		const script = document.createElement('script');
		script.id = 'faq-schema';
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(faqSchema);
		document.head.appendChild(script);

		return () => {
			const s = document.getElementById('faq-schema');
			if (s) s.remove();
		};
	}, []);

	return (
		<div className="pt-24 dark:bg-vs-bg min-h-screen">
			{/* Hero */}
			<section className="w-[95%] mx-auto mt-8 lg:w-4/5 text-center">
				<span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
					<Truck size={14} />
					Built for Truck Drivers
				</span>
				<h1 className="text-4xl md:text-5xl font-bold dark:text-vs-heading leading-tight">
					Every Tool You Need to{' '}
					<span className="text-orange-500">Find Truck Repair</span> Fast
				</h1>
				<p className="mt-4 text-lg text-gray-500 dark:text-vs-muted max-w-2xl mx-auto">
					TruckFix is the fastest way for semi truck and commercial vehicle
					drivers to locate nearby diesel repair shops, check hours, read driver
					reviews, and call — all from one screen.
				</p>
				<Link
					to="/"
					className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
				>
					Find a Repair Shop Now
				</Link>
			</section>

			{/* Stats bar */}
			<section
				aria-label="TruckFix by the numbers"
				className="w-[95%] mx-auto mt-12 lg:w-4/5"
			>
				<ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{STATS.map((stat) => (
						<li
							key={stat.label}
							className="flex flex-col items-center justify-center border border-gray-200 dark:border-vs-border dark:bg-vs-panel rounded-xl py-6 px-4"
						>
							<span className="text-3xl font-bold text-orange-500">
								{stat.value}
							</span>
							<span className="text-sm text-gray-500 dark:text-vs-muted mt-1 text-center">
								{stat.label}
							</span>
						</li>
					))}
				</ul>
			</section>

			{/* Core features */}
			<section className="w-[95%] mx-auto mt-16 lg:w-4/5">
				<h2 className="text-3xl font-bold dark:text-vs-heading text-center mb-2">
					Core Features
				</h2>
				<p className="text-center text-gray-500 dark:text-vs-muted mb-10">
					Designed around the real needs of professional drivers — not passenger
					car owners.
				</p>
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{CORE_FEATURES.map((feature) => {
						const Icon = feature.icon;
						return (
							<li
								key={feature.title}
								className="border border-gray-200 dark:border-vs-border dark:bg-vs-panel rounded-xl p-6 flex flex-col gap-3"
							>
								<div className="bg-orange-100 text-orange-500 w-fit p-3 rounded-xl">
									<Icon size={28} />
								</div>
								<h3 className="text-xl font-semibold dark:text-vs-heading">
									{feature.title}
								</h3>
								<p className="text-gray-500 dark:text-vs-muted text-sm leading-relaxed">
									{feature.description}
								</p>
							</li>
						);
					})}
				</ul>
			</section>

			{/* Service types */}
			<section className="w-[95%] mx-auto mt-16 lg:w-4/5">
				<h2 className="text-3xl font-bold dark:text-vs-heading text-center mb-2">
					Repair Services We Cover
				</h2>
				<p className="text-center text-gray-500 dark:text-vs-muted mb-10">
					Search for any commercial vehicle repair type — from emergency diesel
					breakdowns to routine DOT maintenance.
				</p>
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{SERVICE_TYPES.map((service) => (
						<li
							key={service.name}
							className="border border-gray-200 dark:border-vs-border dark:bg-vs-panel rounded-xl p-5 flex flex-col gap-2"
						>
							<div className="flex items-center gap-2 text-orange-500">
								<Wrench size={18} />
								<h3 className="font-semibold dark:text-vs-heading text-sm">
									{service.name}
								</h3>
							</div>
							<p className="text-xs text-gray-500 dark:text-vs-muted leading-relaxed">
								{service.description}
							</p>
						</li>
					))}
				</ul>
			</section>

			{/* How it works */}
			<section className="w-[95%] mx-auto mt-16 lg:w-4/5">
				<h2 className="text-3xl font-bold dark:text-vs-heading text-center mb-2">
					How TruckFix Works
				</h2>
				<p className="text-center text-gray-500 dark:text-vs-muted mb-10">
					Three steps from breakdown to back on the road.
				</p>
				<ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{[
						{
							step: '1',
							title: 'Enter Your Location',
							description:
								'Type your city, zip code, or highway exit — or tap "Use Current Location" for instant GPS-based results.',
							icon: MapPin,
						},
						{
							step: '2',
							title: 'Browse Nearby Shops',
							description:
								'See every verified truck repair shop on a live map and list, sorted by distance. Filter by open status or service type.',
							icon: Filter,
						},
						{
							step: '3',
							title: 'Call & Get Fixed',
							description:
								'Tap to call the shop directly. Get directions, share your location, or request mobile roadside service — all in one tap.',
							icon: ThumbsUp,
						},
					].map((step) => {
						const Icon = step.icon;
						return (
							<li
								key={step.step}
								className="border border-gray-200 dark:border-vs-border dark:bg-vs-panel rounded-xl p-6 flex flex-col gap-3"
							>
								<div className="flex items-center gap-3">
									<span className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg shrink-0">
										{step.step}
									</span>
									<div className="text-orange-500">
										<Icon size={24} />
									</div>
								</div>
								<h3 className="text-xl font-semibold dark:text-vs-heading">
									{step.title}
								</h3>
								<p className="text-gray-500 dark:text-vs-muted text-sm leading-relaxed">
									{step.description}
								</p>
							</li>
						);
					})}
				</ol>
			</section>

			{/* Emergency callout */}
			<section className="w-[95%] mx-auto mt-16 lg:w-4/5">
				<div className="border border-orange-300 dark:border-orange-500/40 bg-orange-50 dark:bg-orange-500/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
					<div className="text-orange-500 shrink-0">
						<AlertTriangle size={48} />
					</div>
					<div>
						<h2 className="text-2xl font-bold dark:text-vs-heading mb-2">
							Broken Down Right Now?
						</h2>
						<p className="text-gray-600 dark:text-vs-muted mb-4">
							Use TruckFix Breakdown Mode — describe what's wrong and we'll
							surface the nearest shops that can help immediately. No account
							needed, completely free.
						</p>
						<Link
							to="/"
							className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
						>
							Find Emergency Repair Now
						</Link>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="w-[95%] mx-auto mt-16 lg:w-4/5">
				<h2 className="text-3xl font-bold dark:text-vs-heading text-center mb-2">
					Frequently Asked Questions
				</h2>
				<p className="text-center text-gray-500 dark:text-vs-muted mb-10">
					Everything truck drivers ask us about finding roadside repair.
				</p>
				<dl className="flex flex-col gap-4">
					{FAQ_ITEMS.map((item) => (
						<div
							key={item.question}
							className="border border-gray-200 dark:border-vs-border dark:bg-vs-panel rounded-xl p-6"
						>
							<dt className="font-semibold dark:text-vs-heading text-gray-900 mb-2">
								{item.question}
							</dt>
							<dd className="text-gray-500 dark:text-vs-muted text-sm leading-relaxed">
								{item.answer}
							</dd>
						</div>
					))}
				</dl>
			</section>

			{/* Final CTA */}
			<section className="w-[95%] mx-auto mt-16 lg:w-4/5 text-center mb-16">
				<h2 className="text-3xl font-bold dark:text-vs-heading mb-3">
					Ready to Find a Truck Repair Shop?
				</h2>
				<p className="text-gray-500 dark:text-vs-muted mb-6 max-w-xl mx-auto">
					TruckFix is free, instant, and built for professional drivers. No
					sign-up required.
				</p>
				<Link
					to="/"
					className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-xl transition-colors text-lg"
				>
					Search Shops Near Me
				</Link>
			</section>

			<Footer />
		</div>
	);
};

export default FeaturesPage;
