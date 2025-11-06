export default function PrivacyContent() {
	scrollTo({ top: 0, behavior: 'smooth' });

	return (
		<div className="space-y-6 mt-24 pl-4 pb-12">
			<h1 className="text-4xl font-bold text-gray-900 border-b-4 border-orange-500 pb-4">
				Privacy Policy
			</h1>
			<p className="text-sm text-gray-500">Last updated: November 5, 2025</p>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800">
					1. Information We Collect
				</h2>
				<p className="text-gray-700">
					We collect information that you provide directly to us, including when
					you create an account, subscribe to our service, or contact us for
					support. This may include your name, email address, and other contact
					information.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800">
					2. How We Use Your Information
				</h2>
				<p className="text-gray-700">
					We use the information we collect to provide, maintain, and improve
					our services, process transactions, send you technical notices and
					support messages, and respond to your comments and questions.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800">
					3. Information Sharing
				</h2>
				<p className="text-gray-700">
					We do not share your personal information with third parties except as
					described in this policy. We may share information with service
					providers who perform services on our behalf, or when required by law.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800">
					4. Data Security
				</h2>
				<p className="text-gray-700">
					We take reasonable measures to help protect your personal information
					from loss, theft, misuse, unauthorized access, disclosure, alteration,
					and destruction.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800">5. Your Rights</h2>
				<p className="text-gray-700">
					You have the right to access, update, or delete your personal
					information at any time. You may also opt out of receiving promotional
					communications from us by following the instructions in those
					messages.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800">6. Contact Us</h2>
				<p className="text-gray-700">
					If you have any questions about this Privacy Policy, please contact us
					through our support channels.
				</p>
			</section>
		</div>
	);
}
