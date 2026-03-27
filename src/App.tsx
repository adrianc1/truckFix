import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.tsx';
import Results from './pages/Results.tsx';
import LandingPage from './pages/LandingPage.tsx';
import Terms from './pages/Terms.tsx';
import CookiesPage from './pages/CookiesPage.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';

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
