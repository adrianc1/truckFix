import Footer from '../components/layout/Footer.tsx';

export default function CookiesContent() {
	scrollTo({ top: 0, behavior: 'smooth' });

	return (
		<div className="pt-24 dark:bg-vs-bg min-h-screen">
			<div className="w-[95%] mx-auto lg:w-4/5 py-12 space-y-8">
				<div className="border-b border-gray-200 dark:border-vs-border pb-6">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-vs-heading">
						Cookie Policy
					</h1>
					<p className="text-sm text-gray-400 dark:text-vs-muted mt-2">
						Last updated: November 5, 2025
					</p>
				</div>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						1. What Are Cookies
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						Cookies are small text files that are placed on your device when you
						visit our website. They help us provide you with a better experience
						by remembering your preferences and understanding how you use our
						site.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						2. Types of Cookies We Use
					</h2>
					<div className="space-y-4">
						<div className="border border-gray-200 dark:border-vs-border dark:bg-vs-panel rounded-xl p-5">
							<h3 className="text-lg font-semibold text-gray-800 dark:text-vs-heading mb-1">
								Essential Cookies
							</h3>
							<p className="text-gray-600 dark:text-vs-text text-sm leading-relaxed">
								These cookies are necessary for the website to function properly.
								They enable basic functions like page navigation and access to
								secure areas of the website.
							</p>
						</div>
						<div className="border border-gray-200 dark:border-vs-border dark:bg-vs-panel rounded-xl p-5">
							<h3 className="text-lg font-semibold text-gray-800 dark:text-vs-heading mb-1">
								Analytics Cookies
							</h3>
							<p className="text-gray-600 dark:text-vs-text text-sm leading-relaxed">
								These cookies help us understand how visitors interact with our
								website by collecting and reporting information anonymously.
							</p>
						</div>
						<div className="border border-gray-200 dark:border-vs-border dark:bg-vs-panel rounded-xl p-5">
							<h3 className="text-lg font-semibold text-gray-800 dark:text-vs-heading mb-1">
								Preference Cookies
							</h3>
							<p className="text-gray-600 dark:text-vs-text text-sm leading-relaxed">
								These cookies allow our website to remember choices you make and
								provide enhanced, more personal features.
							</p>
						</div>
					</div>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						3. Managing Cookies
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						You can control and manage cookies in various ways. Please note that
						removing or blocking cookies can impact your user experience and parts
						of our website may no longer be fully accessible.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						4. Third-Party Cookies
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						In some cases, we use trusted third-party services that may also set
						cookies on your device on our behalf to deliver the services they
						provide.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						5. Updates to This Policy
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						We may update our Cookie Policy from time to time. We will notify you
						of any changes by posting the new policy on this page with an updated
						revision date.
					</p>
				</section>
			</div>
			<Footer />
		</div>
	);
}
