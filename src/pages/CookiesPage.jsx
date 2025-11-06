export default function CookiesContent() {
	scrollTo({ top: 0, behavior: 'smooth' });

	return (
		<div className="space-y-6 pt-24 pl-4 pb-12 dark:bg-gray-700">
			<h1 className="text-4xl font-bold text-gray-900 border-b-4 border-orange-500 pb-4 dark:text-white">
				Cookie Policy
			</h1>
			<p className="text-sm text-gray-500 dark:text-white">
				Last updated: November 5, 2025
			</p>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					1. What Are Cookies
				</h2>
				<p className="text-gray-700 dark:text-white">
					Cookies are small text files that are placed on your device when you
					visit our website. They help us provide you with a better experience
					by remembering your preferences and understanding how you use our
					site.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					2. Types of Cookies We Use
				</h2>
				<div className="space-y-3">
					<div>
						<h3 className="text-lg font-semibold text-gray-800 dark:text-white">
							Essential Cookies
						</h3>
						<p className="text-gray-700 dark:text-white">
							These cookies are necessary for the website to function properly.
							They enable basic functions like page navigation and access to
							secure areas of the website.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-800 dark:text-white">
							Analytics Cookies
						</h3>
						<p className="text-gray-700 dark:text-white">
							These cookies help us understand how visitors interact with our
							website by collecting and reporting information anonymously.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-800 dark:text-white">
							Preference Cookies
						</h3>
						<p className="text-gray-700 dark:text-white">
							These cookies allow our website to remember choices you make and
							provide enhanced, more personal features.
						</p>
					</div>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					3. Managing Cookies
				</h2>
				<p className="text-gray-700 dark:text-white">
					You can control and manage cookies in various ways. Please note that
					removing or blocking cookies can impact your user experience and parts
					of our website may no longer be fully accessible.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					4. Third-Party Cookies
				</h2>
				<p className="text-gray-700 dark:text-white">
					In some cases, we use trusted third-party services that may also set
					cookies on your device on our behalf to deliver the services they
					provide.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					5. Updates to This Policy
				</h2>
				<p className="text-gray-700 dark:text-white">
					We may update our Cookie Policy from time to time. We will notify you
					of any changes by posting the new policy on this page with an updated
					revision date.
				</p>
			</section>
		</div>
	);
}
