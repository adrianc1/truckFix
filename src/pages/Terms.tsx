import Footer from '../components/layout/Footer.tsx';

export default function TermsContent() {
	scrollTo({ top: 0, behavior: 'smooth' });
	return (
		<div className="pt-24 dark:bg-vs-bg min-h-screen">
			<div className="w-[95%] mx-auto lg:w-4/5 py-12 space-y-8">
				<div className="border-b border-gray-200 dark:border-vs-border pb-6">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-vs-heading">
						Terms of Service
					</h1>
					<p className="text-sm text-gray-400 dark:text-vs-muted mt-2">
						Last updated: November 5, 2025
					</p>
				</div>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						1. Acceptance of Terms
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						By accessing and using this website, you accept and agree to be bound
						by the terms and provision of this agreement. If you do not agree to
						abide by these terms, please do not use this service.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						2. Use License
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						Permission is granted to temporarily access the materials on our
						website for personal, non-commercial transitory viewing only. This is
						the grant of a license, not a transfer of title.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						3. User Responsibilities
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						You are responsible for maintaining the confidentiality of your
						account and password. You agree to accept responsibility for all
						activities that occur under your account.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						4. Limitation of Liability
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						In no event shall we be liable for any damages arising out of the use
						or inability to use the materials on our website, even if we have been
						notified of the possibility of such damage.
					</p>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold text-gray-800 dark:text-vs-heading">
						5. Changes to Terms
					</h2>
					<p className="text-gray-600 dark:text-vs-text leading-relaxed">
						We reserve the right to modify these terms at any time. Please review
						this page periodically for changes. Your continued use of the website
						following the posting of changes constitutes your acceptance of such
						changes.
					</p>
				</section>
			</div>
			<Footer />
		</div>
	);
}
