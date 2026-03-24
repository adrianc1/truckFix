import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.js';
import Results from './pages/Results.js';
import LandingPage from './pages/LandingPage.js';
import Terms from './pages/Terms.js';
import CookiesPage from './pages/CookiesPage.js';
import PrivacyPolicy from './pages/PrivacyPolicy.js';

const App = () => {
	const [darkMode, setDarkMode] = useState(false);

	return (
		<div className="w-full h-full">
			<Header darkMode={darkMode} setDarkMode={setDarkMode} />
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="results" element={<Results darkMode={darkMode} />} />
				<Route path="terms-of-service" element={<Terms />} />
				<Route path="cookies" element={<CookiesPage />} />
				<Route path="privacy-policy" element={<PrivacyPolicy />} />
			</Routes>
		</div>
	);
};

export default App;
