import { useEffect, useState } from 'react';
import { ChevronDown, Mail, Copy, Check } from 'lucide-react';
import Footer from '../components/layout/Footer.tsx';

const FAQ_ITEMS: { question: string; answer: string }[] = [
	{
		question: 'How do I find a truck repair shop near me?',
		answer:
			'Enter your city, town, or zip code in the TruckFix search bar — or tap "Use Current Location" to let the app detect where you are. Results are sorted by distance so the closest shop is always first.',
	},
	{
		question: 'Does TruckFix work for emergency roadside breakdowns?',
		answer:
			'Yes. Use the Breakdown Mode feature: describe your problem in plain English — blown tire, DEF warning light, overheating — and TruckFix surfaces the nearest shops equipped to fix your specific issue right now.',
	},
	{
		question: 'Can I find 24-hour truck repair shops?',
		answer:
			'Yes. Each listing shows live open/closed status and full business hours. Use the "Open Now" filter to instantly narrow results to shops currently serving drivers.',
	},
	{
		question: 'What types of repairs can I search for?',
		answer:
			'TruckFix covers all major commercial vehicle repair categories: diesel engine repair, DEF / emissions systems, brake inspection and replacement, tire repair and replacement, trailer repair, refrigeration unit (reefer) service, electrical diagnostics, and preventive maintenance.',
	},
	{
		question: 'Are the shops on TruckFix verified?',
		answer:
			'Every shop is verified against public business records and must maintain a minimum rating based on driver reviews. We continuously update listings so you always have accurate phone numbers, addresses, and hours.',
	},
	{
		question: 'Is TruckFix free to use?',
		answer:
			'Yes — searching for shops, reading reviews, and calling shops is 100% free for drivers. There are no accounts or subscriptions required.',
	},
	{
		question: 'How accurate are the shop hours?',
		answer:
			"Hours are sourced from verified business listings and updated regularly. The open/closed indicator is calculated in real time. If you spot an error, use the contact email below to submit a correction and we'll update it.",
	},
	{
		question: 'How do I get my shop listed on TruckFix?',
		answer:
			'Email us at info@trytruckfix.com with your shop name, address, phone number, and the services you offer. We review and add new listings on a rolling basis.',
	},
	{
		question: 'How do I report incorrect information about a shop?',
		answer:
			'Email info@trytruckfix.com with the shop name and what needs to be corrected. We take data accuracy seriously and will update the listing promptly.',
	},
];

const FaqAccordionItem = ({
	question,
	answer,
}: {
	question: string;
	answer: string;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="border border-gray-200 dark:border-vs-border dark:bg-vs-panel rounded-xl overflow-hidden">
			<button
				onClick={() => setOpen((prev) => !prev)}
				className="w-full flex justify-between items-center px-6 py-5 text-left cursor-pointer"
				aria-expanded={open}
			>
				<span className="font-semibold text-gray-900 dark:text-vs-heading pr-4">
					{question}
				</span>
				<ChevronDown
					size={20}
					className={`text-orange-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
				/>
			</button>
			{open && (
				<div className="px-6 pb-5 text-sm text-gray-500 dark:text-vs-muted leading-relaxed">
					{answer}
				</div>
			)}
		</div>
	);
};

const CopyEmailButton = () => {
	const [copied, setCopied] = useState(false);
	const email = 'info@trytruckfix.com';

	const handleCopy = () => {
		navigator.clipboard.writeText(email).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<div className="flex items-center gap-3 bg-gray-50 dark:bg-vs-card border border-gray-200 dark:border-vs-border rounded-xl px-5 py-4 w-fit mx-auto">
			<Mail size={18} className="text-orange-500 shrink-0" />
			<span className="text-gray-700 dark:text-vs-text font-medium select-all">
				{email}
			</span>
			<button
				onClick={handleCopy}
				className="ml-2 text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
				aria-label="Copy email address"
			>
				{copied ? (
					<Check size={16} className="text-green-500" />
				) : (
					<Copy size={16} />
				)}
			</button>
		</div>
	);
};

const FAQPage = () => {
	useEffect(() => {
		document.title = 'FAQ & Contact — TruckFix';

		const metaDesc = document.querySelector('meta[name="description"]');
		if (metaDesc) {
			metaDesc.setAttribute(
				'content',
				'Answers to common questions about finding truck repair shops with TruckFix — plus how to contact us, list your shop, or submit a correction.',
			);
		}

		const canonical = document.querySelector('link[rel="canonical"]');
		if (canonical) {
			canonical.setAttribute('href', 'https://trytruckfix.com/faq');
		}

		const faqSchema = {
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: FAQ_ITEMS.map((item) => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: { '@type': 'Answer', text: item.answer },
			})),
		};

		const existing = document.getElementById('faq-page-schema');
		if (existing) existing.remove();

		const script = document.createElement('script');
		script.id = 'faq-page-schema';
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(faqSchema);
		document.head.appendChild(script);

		return () => {
			const s = document.getElementById('faq-page-schema');
			if (s) s.remove();
		};
	}, []);

	return (
		<div className="pt-24 dark:bg-vs-bg min-h-screen">
			{/* Hero */}
			<section className="w-[95%] mx-auto mt-8 lg:w-4/5 text-center">
				<h1 className="text-4xl font-bold dark:text-vs-heading">
					FAQ & Contact
				</h1>
				<p className="mt-3 text-gray-500 dark:text-vs-muted max-w-xl mx-auto">
					Common questions from truck drivers, plus how to reach us directly.
				</p>
			</section>

			{/* FAQ accordion */}
			<section className="w-[95%] mx-auto mt-10 lg:w-4/5">
				<h2 className="text-2xl font-bold dark:text-vs-heading mb-6">
					Frequently Asked Questions
				</h2>
				<dl className="flex flex-col gap-3">
					{FAQ_ITEMS.map((item) => (
						<FaqAccordionItem
							key={item.question}
							question={item.question}
							answer={item.answer}
						/>
					))}
				</dl>
			</section>

			{/* Contact */}
			<section className="w-[95%] mx-auto mt-16 lg:w-4/5 mb-16">
				<div className="border border-gray-200 dark:border-vs-border dark:bg-vs-panel rounded-2xl p-8 text-center">
					<h2 className="text-2xl font-bold dark:text-vs-heading mb-2">
						Still have a question?
					</h2>
					<p className="text-gray-500 dark:text-vs-muted mb-6 max-w-md mx-auto">
						Email us directly — whether you want to list your shop, report
						incorrect info, or just have a question.
					</p>
					<CopyEmailButton />
					<div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
						<a
							href="mailto:info@trytruckfix.com?subject=List My Shop"
							className="inline-block border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
						>
							List my shop
						</a>
						<a
							href="mailto:info@trytruckfix.com?subject=Shop Correction"
							className="inline-block border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
						>
							Submit a correction
						</a>
					</div>
					<p className="mt-4 text-xs text-gray-400 dark:text-vs-muted">
						If mailto links don't work in your browser, copy the email above and
						paste it into your email app.
					</p>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default FAQPage;
