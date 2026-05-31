import { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';
import settingsIcon from '../../assets/images/settings.svg';
import { Link } from 'react-router-dom';
import Truck from '../../assets/images/TruckFix.png';
import TruckDark from '../../assets/images/TruckFix-Dark_Mode.png';

const Header = ({
	darkMode,
	setDarkMode,
}: {
	darkMode: boolean;
	setDarkMode: (darkMode: boolean) => void;
}) => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [copiedContact, setCopiedContact] = useState<string | null>(null);

	const copyEmail = (label: string) => {
		navigator.clipboard.writeText('info@trytruckfix.com');
		setCopiedContact(label);
		setTimeout(() => setCopiedContact(null), 2000);
	};

	const openSettingsModal = () => {
		setIsSettingsOpen(true);
	};

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<>
			<header className="fixed mb-24 z-200 top-0 left-0 right-0 flex justify-between items-center py-1 px-4 bg-white/80 dark:bg-vs-card/95 backdrop-blur-sm border-b border-gray-300/60 dark:border-vs-border">
				<Link to="/" className="flex items-center gap-1 lg:pl-24">
					<img src={Truck} alt="TruckFix Logo" className="w-16 h-16 m-0 p-0 dark:hidden" />
					<img src={TruckDark} alt="TruckFix Logo" className="w-16 h-16 m-0 p-0 hidden dark:block" />
				</Link>

				{/* Wordmark — hidden on desktop where nav takes center */}
				<div className="absolute left-1/2 transform -translate-x-1/2 lg:hidden">
					<h1 className="text-2xl text-center font-bold dark:text-vs-heading">
						TRUCK
						<span className="text-orange-500">FIX</span>
					</h1>
				</div>

				{/* Desktop nav */}
				<nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
					<Link
						to="/"
						className="text-sm font-semibold text-gray-700 dark:text-vs-text hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
					>
						Home
					</Link>
					<Link
						to="/features"
						className="text-sm font-semibold text-gray-700 dark:text-vs-text hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
					>
						Features
					</Link>
					<Link
						to="/faq"
						className="text-sm font-semibold text-gray-700 dark:text-vs-text hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
					>
						FAQ & Contact
					</Link>
				</nav>

				<div className="settings-icon flex justify-center pr-4">
					<img
						src={settingsIcon}
						onClick={openSettingsModal}
						className="w-6 h-6 cursor-pointer dark:invert"
						alt="Settings Icon"
					/>
				</div>
			</header>
			{isSettingsOpen && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-5000 p-4"
					onClick={() => setIsSettingsOpen(false)}
				>
					{/* Modal */}
					<div
						className="bg-white dark:bg-vs-panel rounded-lg shadow-2xl w-full max-w-md p-6 relative z-10000 dark:border dark:border-vs-border"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<h2 className="text-2xl font-bold text-gray-900 dark:text-vs-heading mb-6">
							Settings
						</h2>

						{/* Settings Options */}
						<div className="space-y-4">
							{/* Dark Mode Toggle */}{' '}
							<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-vs-card rounded-lg dark:border dark:border-vs-border">
								<span className="text-gray-900 dark:text-vs-text font-medium">
									Dark Mode
								</span>
								<button
									onClick={toggleDarkMode}
									className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
										darkMode ? 'bg-orange-500' : 'bg-gray-300'
									}`}
									aria-label="Toggle dark mode"
								>
									<span
										className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
											darkMode ? 'translate-x-7' : 'translate-x-0'
										}`}
									/>
								</button>
							</div>
						</div>

						<div className="mt-6 p-4 bg-gray-50 dark:bg-vs-card rounded-lg dark:border dark:border-vs-border flex flex-col items-center gap-2">
							<span className="text-sm text-gray-600 dark:text-gray-300">
								Add your shop or submit a correction
							</span>
							<button
								onClick={() => copyEmail('contact')}
								className="flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
							>
								{copiedContact === 'contact' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
								{copiedContact === 'contact' ? 'Copied!' : 'info@trytruckfix.com'}
							</button>
						</div>

						<button
							onClick={() => setIsSettingsOpen(false)}
							className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer"
						>
							Save Changes
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Header;
