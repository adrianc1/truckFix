import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Footer from '../components/layout/Footer.tsx';

export default function PrivacyContent() {
	scrollTo({ top: 0, behavior: 'smooth' });
	const [copied, setCopied] = useState(false);

	const copyEmail = () => {
		navigator.clipboard.writeText('info@trytruckfix.com');
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="pt-24 dark:bg-vs-bg min-h-screen">
			<div className="w-[95%] mx-auto lg:w-4/5 py-12 space-y-8">
				<div className="border-b border-gray-200 dark:border-vs-border pb-6">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-vs-heading">
						Privacy Policy
					</h1>
					<p className="text-sm text-gray-400 dark:text-vs-muted mt-2">
						Last updated: November 5, 2025
					</p>
				</div>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						1. Information We Collect
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						We collect information that you provide directly to us, including when
						you create an account, subscribe to our service, or contact us for
						support. This may include your name, email address, and other contact
						information.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						2. How We Use Your Information
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						We use the information we collect to provide, maintain, and improve
						our services, process transactions, send you technical notices and
						support messages, and respond to your comments and questions.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						3. Information Sharing
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						We do not share your personal information with third parties except as
						described in this policy. We may share information with service
						providers who perform services on our behalf, or when required by law.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						4. Data Security
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						We take reasonable measures to help protect your personal information
						from loss, theft, misuse, unauthorized access, disclosure, alteration,
						and destruction.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						5. Your Rights
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						You have the right to access, update, or delete your personal
						information at any time. You may also opt out of receiving promotional
						communications from us by following the instructions in those
						messages.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						6. Contact Us
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						If you have any questions about this Privacy Policy, please contact us
						at{' '}
						<button
							onClick={copyEmail}
							className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
						>
							{copied ? <Check size={13} /> : <Copy size={13} />}
							{copied ? 'Copied!' : 'info@trytruckfix.com'}
						</button>
						.
					</p>
				</section>
			</div>
			<Footer />
		</div>
	);
}
