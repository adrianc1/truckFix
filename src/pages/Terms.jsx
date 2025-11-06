export default function TermsContent() {
	scrollTo({ top: 0, behavior: 'smooth' });
	return (
		<div className="space-y-6 pt-24 pl-4 pb-12 dark:bg-gray-700">
			<h1 className="text-4xl font-bold text-gray-900 border-b-4 border-orange-500 pb-4 dark:text-white">
				Terms of Service
			</h1>
			<p className="text-sm text-gray-500 dark:text-white">
				Last updated: November 5, 2025
			</p>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					1. Acceptance of Terms
				</h2>
				<p className="text-gray-700 dark:text-white">
					By accessing and using this website, you accept and agree to be bound
					by the terms and provision of this agreement. If you do not agree to
					abide by these terms, please do not use this service.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					2. Use License
				</h2>
				<p className="text-gray-700 dark:text-white">
					Permission is granted to temporarily access the materials on our
					website for personal, non-commercial transitory viewing only. This is
					the grant of a license, not a transfer of title.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					3. User Responsibilities
				</h2>
				<p className="text-gray-700 dark:text-white">
					You are responsible for maintaining the confidentiality of your
					account and password. You agree to accept responsibility for all
					activities that occur under your account.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					4. Limitation of Liability
				</h2>
				<p className="text-gray-700 dark:text-white">
					In no event shall we be liable for any damages arising out of the use
					or inability to use the materials on our website, even if we have been
					notified of the possibility of such damage.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					5. Changes to Terms
				</h2>
				<p className="text-gray-700 dark:text-white">
					We reserve the right to modify these terms at any time. Please review
					this page periodically for changes. Your continued use of the website
					following the posting of changes constitutes your acceptance of such
					changes.
				</p>
			</section>
		</div>
	);
}
