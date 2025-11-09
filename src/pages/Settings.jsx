import React, { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';

export default function SettingsModalDemo() {
	const [darkMode, setDarkMode] = useState(false);
	const [notifications, setNotifications] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Apply dark mode class to document
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

	const exitSettings = (e) => {
		e.stopPropagation();
		setDarkMode(!darkMode);
		console.log('exi');
	};
	// const toggleNotifications = () => {
	// 	setNotifications(!notifications);
	// };

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
			{/* Modal Overlay */}
			{isModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
					onClick={() => setIsModalOpen(false)}
				>
					{/* Modal */}
					<div
						className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md p-6 relative"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							onClick={(e) => {
								setIsModalOpen(false);
								exitSettings(e);
							}}
							className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
							aria-label="Close modal"
						>
							<X className="w-6 h-6" />
						</button>

						{/* Modal Header */}
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
							Settings
						</h2>

						{/* Settings Options */}
						<div className="space-y-4">
							{/* Dark Mode Toggle */}
							<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
								<span className="text-gray-900 dark:text-white font-medium">
									Dark Mode
								</span>
								<button
									onClick={toggleDarkMode}
									className={`relative w-14 h-7 rounded-full transition-colors ${
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

							{/* Notifications Toggle */}

							{/* <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-900 dark:text-white font-medium">
                  Notifications
                </span>
                <button
                  onClick={toggleNotifications}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    notifications ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle notifications"
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                      notifications ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div> */}
						</div>

						{/* Save Button */}
						<button
							onClick={() => setIsModalOpen(false)}
							className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
						>
							Save Changes
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
